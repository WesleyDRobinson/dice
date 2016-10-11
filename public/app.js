$(document).ready(function () {

    // logic
    function roll(sides) {
        return Number.isInteger(sides) ? (Math.floor(Math.random() * sides)) + 1 : new TypeError('sides must be an integer');
    }

    // app event handlers
    function handleDice(e) {
        var validDice = ['d3', 'd4', 'd6', 'd10', 'd100'];
        var id = e.target ? e.target.id : null;
        if (!validDice.includes(id)) return e;
        e.preventDefault();

        var $diceResult = document.querySelector('#dice-result');
        var sides = parseInt(id.match(/\d+/)[0]);
        var rollResult = roll(sides);

        if (sides === 100) {
            var rollResult2 = roll(sides);
            console.log(rollResult, rollResult2);
            var bonus = $('#bonus').hasClass('is-active') ? Math.min(rollResult, rollResult2) : false;
            var penalty = $('#penalty').hasClass('is-active') ? Math.max(rollResult, rollResult2) : false;
        }

        var double = $('#double').hasClass('is-active');
        var triple = $('#triple').hasClass('is-active');
        if (double) rollResult *= 2;
        if (triple) rollResult *= 3;

        var addMode = $('#add-mode').hasClass('is-active');
        var sumNums = document.querySelector('#sum-nums');
        sumNums.value = 0;
        sumNums.value = addMode ? sumNums.value += rollResult : null;
        sumNums.innerHTML = sumNums.value;

        if (penalty) {$diceResult.innerHTML = penalty}
        else if (bonus) {$diceResult.innerHTML = bonus}
        else $diceResult.innerHTML = rollResult;

        return e;
    }

    function toggleActive(e) {
        var $t = $(e.target);
        $t.toggleClass('is-active');
        $t.attr('class').split(' ').forEach(grabColor);
        function grabColor(el){
            if (el.slice(0, 6) === 'hover-') {
                $t.toggleClass('bg-' + el.slice(6));
            }
        }
    }
    var diceModifier = $('.dice-modifier');
    diceModifier.click(toggleActive);

    var diceBox = $('#dice-box');
    diceBox.click(handleDice);

    // helpers
});