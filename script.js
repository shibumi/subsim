// Calculator for distance by mast height
function dmhCalculate() {
    let result = 0;
    let zoom = getInt("dmh.zoom");
    let height = getFloat("dmh.height");
    let markings = getFloat("dmh.markings");

    result = (height * 916.73 / markings) * zoom;
    result = round(result);
    document.getElementById("dmh.result").innerHTML = result + " meters.";
}

// Calculator for distance by ship length
function dslCalculate() {
    let result = 0;
    let zoom = getInt("dsl.zoom");
    let length = getFloat("dsl.length");
    let degrees = getFloat("dsl.degrees");

    result = (length * 57.30 / degrees) * zoom;
    result = round(result);
    document.getElementById("dsl.result").innerHTML = result + " meters.";
}

function sblCalculate() {
    let result = 0;
    // Zoom does not matter for speed by lnegth
    let length = getFloat("sbl.length");
    let seconds = getInt("sbl.seconds");

    result = (length * 1.94 / seconds);
    result = round(result);
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

    let aob = diffAngle(reciprocal(brg), crst);
    let lla = diffAngle(brg, crso);
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
    document.getElementById("spdoa.result").innerHTML = "SPDOA: " + round(spdoa) + " knots.";
    document.getElementById("spdta.result").innerHTML = "SPDTA: " + round(spdta) + " knots.";
    document.getElementById("spdoi.result").innerHTML = "SPDOI: " + round(spdoi) + " knots.";
    document.getElementById("spdti.result").innerHTML = "SPDTI: " + round(spdti) + " knots.";
    document.getElementById("spdra.result").innerHTML = "SPDRA: " + round(Math.abs(spdra)) + " knots.";
    document.getElementById("sle.result").innerHTML = "Ekelund Range: " + round(result) + " nm.";
}

function dleCalculate() {
    let result = 0;
    let brg1 = getInt("dle.brg1");
    let brg2 = getInt("dle.brg2");
    let crso1 = getInt("dle.crso1");
    let crso2 = getInt("dle.crso2");
    let brgrt1 = getInt("dle.brgrt1")
    let brgrt2 = getInt("dle.brgrt2")
    let lla1 = diffAngle(brg1, crso1);
    let lla2 = diffAngle(brg2, crso2);
    let spdoa1 = Math.abs(Math.sin(degToRad(lla1)) * spdo);
    let spdoa2 = Math.abs(Math.sin(degToRad(lla2)) * spdo);
    result = (spdoa2 - spdoa1) / (brgrt1 - brgrt2);
    document.getElementById("dle.spdoa1").innerHTML = "SPDOA 1: " + round(spdoa) + " knots.";
    document.getElementById("dle.spdoa2").innerHTML = "SPDOA 2: " + round(spdoa) + " knots.";
    document.getElementById("dle.result").innerHTML = "Ekelund Range: " + round(result) + " nm.";

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

// diffAngle calculates the difference between two angles.
// For example x = 50, y = 60. The result is 350 and not -10.
function diffAngle(x, y) {
    let d = x - y;
    return (d % 360 + 360) % 360;
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

function radToDeg(rad) {
    return rad / (Math.PI / 180);
}

function round(x) {
    return x.toFixed(2);
    // Alternative version with corrected float:
    // return Math.round( ( x + Number.EPSILON) * 100 / 100);
}