// logic

// app
function roll(sides) {
    return Number.isInteger(sides) ? (Math.floor(Math.random() * sides)) + 1 : new TypeError('sides must be an integer');
}
function handleDice(e) {
    var validDice = ['d3', 'd4', 'd6', 'd10', 'd100'];
    var id = e.target.id;
    if (!validDice.includes(id)) return;

    e.preventDefault();
    var diceResult = document.querySelector('#dice-result');
    var sides = parseInt(id.match(/\d+/)[0]);
    var rollResult = roll(sides);

    if (sides === 100) {
        var rollResult2 = roll(sides);
        console.log(rollResult, rollResult2);
        var bonus = document.querySelector('#bonus-die').checked ? Math.min(rollResult, rollResult2) : false;
        var penalty = document.querySelector('#penalty-die').checked ? Math.max(rollResult, rollResult2) : false;
    }

    var double = document.querySelector('#double').checked;
    var triple = document.querySelector('#triple').checked;
    if (double) rollResult *= 2;
    if (triple) rollResult *= 3;

    var addMode = document.querySelector('#add-mode').checked;
    var sumNums = document.querySelector('#sum-nums');
    sumNums.value = addMode ? sumNums.value += rollResult : null;
    sumNums.innerHTML = sumNums.value || null;

    if (penalty) { diceResult.innerHTML = penalty }
    else if (bonus) { diceResult.innerHTML = bonus }
    else diceResult.innerHTML = rollResult;

    return e;
}
document.querySelector('#dice-box').addEventListener('click', handleDice, false);

// API
var die = parseInt(document.URL.split('#')[1]);
if (Number.isInteger(die)) {
    JSON.stringify({
        status: 200,
        value: roll(die)
    });
}

//404.js

// helpers
function toggleDiv(divId) {
    var div = document.querySelector('#' + divId);
    div.hidden = !div.hidden;
    return div;
}