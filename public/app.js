// logic

function roll(sides) {
    return Number.isInteger(sides) ? (Math.floor(Math.random() * sides)) + 1 : new TypeError('sides must be an integer');
}

// app
var output = document.querySelector('#output');
document.querySelector('#buttons-box').addEventListener('click', function (e) {
    var target = e.target;
    if (target.nodeName !== 'BUTTON') return;
    var sides = parseInt(target.id);
    var roll1 = roll(sides);

    if (sides === 100) {
        var roll2 = roll(sides);
        console.log(roll1, roll2);
        var bonus = document.querySelector('#bonus-die').value;
        var penalty = get('penalty-die').value;
        if (penalty) return output.innerHTML = Math.max(roll1, roll2);
        if (bonus) return output.innerHTML = Math.min(roll1, roll2);
    }

    output.innerHTML = roll1;
});

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
var get = function get(string) {
    if (typeof string !== 'string') {
        get = document.querySelectorAll;
        return new TypeError('get([string]')
    }
    return document.getElementById
};
function toggleDiv(divId) {
    var div = document.querySelector('#' + divId);
    div.hidden = !div.hidden;
    return div;
}