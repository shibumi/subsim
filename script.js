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

function sleCalculate() {
    let result = 0;
    let crso = getInt("sle.crso");
    let spdo = getInt("sle.spdo");
    let brg = getInt("sle.brg");
    let crst = getInt("sle.crst");
    let spdt = getInt("sle.spdt");
    let brgrt = getFloat("sle.brgrt");
    let lag = document.getElementById("sle.lag").checked

    let aob = reciprocal(brg) - crst;
    let lla = brg - crso;
    let spdoa = Math.abs(Math.sin(degToRad(lla)) * spdo);
    let spdta = Math.abs(Math.sin(degToRad(aob)) * spdt);
    let spdoi = Math.abs(Math.cos(degToRad(lla)) * spdo);
    let spdti = Math.abs(Math.cos(degToRad(aob)) * spdt);
    let spdra = spdta - spdoa;

    // If Lag LOS, we have to add SPDTA and SPDOA
    console.log(lag)
    if(lag) {
        spdra = spdta + spdoa;
    }
    result = Math.abs(spdra / brgrt);
    document.getElementById("aob.result").innerHTML = "AOB: " + aob;
    document.getElementById("lla.result").innerHTML = "LLA: " + lla;
    document.getElementById("spdoa.result").innerHTML = "SPDOA: " + spdoa + " knots.";
    document.getElementById("spdta.result").innerHTML = "SPDTA: " + spdta + " knots.";
    document.getElementById("spdoi.result").innerHTML = "SPDOI: " + spdoi + " knots.";
    document.getElementById("spdti.result").innerHTML = "SPDTI: " + spdti + " knots.";
    document.getElementById("spdra.result").innerHTML = "SPDRA: " + Math.abs(spdra) + " knots.";
    document.getElementById("sle.result").innerHTML = "Ekelund Range: " + result + " nm.";
}

function getFloat(id) {
    return parseFloat(document.getElementById(id).value);
}

function getInt(id) {
    return parseInt(document.getElementById(id).value);
}

function reciprocal(bearing) {
    // Ensure the bearing is a number
    bearing = Number(bearing);

    // Check for valid bearing range
    if (isNaN(bearing) || bearing < 0 || bearing > 360) {
      throw new Error("Invalid bearing. Please enter a value between 0 and 360.");
    }

    // Calculate reciprocal bearing
    if (bearing < 180) {
      return bearing + 180;
    } else {
      return bearing - 180;
    }
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

function radToDeg(rad) {
    return rad / (Math.PI / 180);
}