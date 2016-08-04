var keyCodes = {
        w : 87,
        s : 83,
        a : 65,
        d : 68,
        e : 69,
        q : 81,
        n0 : 48,
        n1 : 49,
        n2 : 50,
        n3 : 51,
        n4 : 52,
        n5 : 53,
        n6 : 54,
        n7 : 55,
        n8 : 56,
        n9 : 57,
        esc : 27,
        enter : 13,
        space : 32,
        ArrowDown : 40,
        ArrowRight : 39,
        ArrowUp : 38,
        ArrowLeft : 37
    },
    pressedKeys = {};


document.addEventListener("keydown", function (e) {
    pressedKeys[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
    pressedKeys[e.keyCode] = false;
});