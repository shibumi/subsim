// Calculator for distance by mast height
function dmhCalculate() {
    let result = 0;
    let zoom = getInt("dmh.zoom");
    let height = getFloat("dmh.height");
    let milliradians = getFloat("dmh.milliradians");

    result = (height * 916.73 / milliradians) * zoom;
    result = Math.round((result + Number.EPSILON) * 100 / 100);
    document.getElementById("dmh.result").innerHTML = result + " meters.";
}

// Calculator for distance by ship length
function dslCalculate() {
    let result = 0;
    let zoom = getInt("dsl.zoom");
    let length = getFloat("dsl.length");
    let degrees = getFloat("dsl.degrees");

    result = (length * 57.30 / degrees) * zoom;
    result = Math.round((result + Number.EPSILON) * 100 / 100);
    document.getElementById("dsl.result").innerHTML = result + " meters.";
}

function sblCalculate() {
    let result = 0;
    // Zoom does not matter for speed by lnegth
    let length = getFloat("sbl.length");
    let seconds = getInt("sbl.seconds");

    result = (length * 1.94 / seconds);
    result = Math.round( ( result + Number.EPSILON) * 100 / 100);
    document.getElementById("sbl.result").innerHTML = result + " knots.";
}

function getFloat(id) {
    return parseFloat(document.getElementById(id).value);
}

function getInt(id) {
    return parseInt(document.getElementById(id).value);
}
