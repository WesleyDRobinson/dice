function roll(sides) {
    return Math.floor(Math.random() * sides) + 1
}

// app event handlers
function handleDice(e) {
    e.preventDefault()

    let sides = parseInt(e.target.innerText)
    let rollResult = roll(sides)
    if (isNaN(rollResult)) return e;

    // modifiers
    let bonus = document.querySelector('#bonus').classList.contains('is-active')
    let penalty = document.querySelector('#penalty').classList.contains('is-active')
    let double = document.querySelector('#double').classList.contains('is-active')
    let triple = document.querySelector('#triple').classList.contains('is-active')
    let modified = false

    if (sides === 100) {
        // replace the 10s die with either lower or higher of a second roll
        let rollResult2 = (roll(10) * 10 + (rollResult % 10))
        console.log(rollResult, rollResult2)
        if (bonus) modified = Math.min(rollResult, rollResult2)
        if (penalty) modified = Math.max(rollResult, rollResult2)
    }
    if (double) modified = rollResult *= 2
    if (triple) modified = rollResult *= 3

    // todo - bring back Add Mode
    // let addMode = document.querySelector('#add-mode').classList.contains('is-active')
    // let sumNums = document.querySelector('#sum-nums')
    // if (addMode) sumNums.value = sumNums.value += rollResult
    // sumNums.innerHTML = sumNums.value

    let diceRollResult = document.querySelector('#dice-result')
    diceRollResult.innerHTML = `${modified || rollResult}`

    return e
}

function toggleActive(e) {
    let targetEl = (e.target)
    targetEl.classList.toggle('is-active')

    targetEl.classList.forEach(bgColorSwap)

    function bgColorSwap(el) {
        if (el.slice(0, 6) === 'hover-') {
            targetEl.classList.toggle('bg-' + el.slice(6))
        }
    }
}

let diceModifier = document.querySelector('.dice-modifier')
diceModifier.addEventListener('click', toggleActive)

let diceBox = document.querySelector('#dice-box')
diceBox.addEventListener('click', handleDice)
