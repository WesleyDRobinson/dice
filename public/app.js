// logic

function roll(sides) {
    return Number.isInteger(sides) ? (Math.floor(Math.random() * sides)) + 1 : new TypeError('sides must be an integer');
}

// app
var output = document.querySelector('#output');
document.querySelectorAll('.button-die').forEach(function (el) {
    el.addEventListener('click', function (e) {
        var value = e.target.id;
        output.innerHTML = roll(parseInt(value));
    });
});

// API
var die = parseInt(document.URL.split('#')[1]);
if (Number.isInteger(die)) {
    JSON.stringify({
        status: 200,
        value: roll(die)
    });
}
