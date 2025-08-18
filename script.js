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

    result = (length * 916.73 / degrees) * zoom;
    result = Math.round((result + Number.EPSILON) * 100 / 100);
    document.getElementById("dsl.result").innerHTML = result + " meters.";
}

function getFloat(id) {
    return parseFloat(document.getElementById(id).value);
}

function getInt(id) {
    return parseInt(document.getElementById(id).value);
}
