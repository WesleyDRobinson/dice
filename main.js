'use strict'

import random from 'lodash.random'

const enableDiceRolling = {
    init: function () {
        let diceBox = document.querySelectorAll('.die')
        diceBox.forEach(die => {
            die.addEventListener('click', this)
            die.addEventListener('ontouchstart', this)
        })
    },
    handleEvent: e => {
        const roll = sides => random(1, sides)

        let sides = parseInt(e.target.innerText)
        let rollResult = roll(sides)

        // gather modifiers
        let bonus = document.querySelector('#bonus').getAttribute('data-active')
        let penalty = document.querySelector('#penalty').getAttribute('data-active')
        let double = document.querySelector('#double').getAttribute('data-active')
        let triple = document.querySelector('#triple').getAttribute('data-active')
        let addMode = document.querySelector('#add-mode').getAttribute('data-active')

        let modified = false

        if (sides === 100) {
            // Call of Cthulu bonus/ penalty rolls
            // replace the "10" position die with lower/ higher of a second d10 roll
            let rollResult2 = ((roll(10) - 1) * 10 + (rollResult % 10))

            if (bonus) modified = Math.min(rollResult, rollResult2)
            if (penalty) modified = Math.max(rollResult, rollResult2)
        }

        if (double) modified = rollResult * 2
        if (triple) modified = rollResult * 3

        let diceRollResult = document.querySelector('#dice-result')

        let current = parseInt(diceRollResult.firstChild.innerText)
        if (addMode && current) modified = (modified || rollResult) + current

        hyperHTML.bind(diceRollResult.firstElementChild)`<div class="f1 near-black">${modified || rollResult}</div> ${modified ? hyperHTML.wire()`<div class="f5 f4-ns black-40">original roll: ${rollResult}</div>` : ''}`
        return e
    }
}

const enableModifiers = {
    init: function () {
        let modifiers = document.getElementById('dice-modifiers')
        modifiers.addEventListener('click', this)
        modifiers.addEventListener('ontouchstart', this)
    },
    handleEvent: e => {
        let targetEl = e.target
        let active = targetEl.getAttribute('data-active')

        targetEl.setAttribute('data-active', active ? '' : true)
        targetEl.classList.forEach(toggleColors)

        function toggleColors(cssClass) {
            if (cssClass.slice(0, 6) === 'hover-') {
                targetEl.classList.toggle('bg-' + cssClass.slice(6))
            }
        }
    }
}

enableDiceRolling.init()
enableModifiers.init()

// for more info on EventListener Interface and handleEvent method:
// WHATWG Spec: https://dom.spec.whatwg.org/#interface-eventtarget
// blog1: https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
// blog2: https://www.thecssninja.com/javascript/handleevent