// Distance by mast height
function dmhCalculate() {
    let result = 0;
    let zoom = getInt("dmh.zoom");
    let height = getFloat("dmh.height");
    let markings = getFloat("dmh.markings");

    result = (height * 916.73 / markings) * zoom;
    result = fixed(result);
    document.getElementById("dmh.result").innerHTML = "Range: " + result + " meters.";
}

// Distance by length
function dslCalculate() {
    let result = 0;
    let zoom = getInt("dsl.zoom");
    let length = getFloat("dsl.length");
    let degrees = getFloat("dsl.degrees");
    let  aob = getFloat("dsl.aob");

    result = ((length * 57.30 / degrees) * zoom) / Math.sin(degToRad(aob));
    result = fixed(result);
    document.getElementById("dsl.result").innerHTML = "Range: " + result + " meters.";
}

// Speed by length
function sblCalculate() {
    let result = 0;
    // Zoom does not matter for speed by lnegth
    let length = getFloat("sbl.length");
    let seconds = getInt("sbl.seconds");

    result = (length * 1.94 / seconds);
    result = fixed(result);
    document.getElementById("sbl.result").innerHTML = "Speed: " + result + " knots.";
}

// Single Leg Ekelund Range
function sleCalculate() {
    let result = 0;
    let crso = getInt("sle.crso");
    let spdo = getInt("sle.spdo");
    let brg = getInt("sle.brg");
    let crst = getInt("sle.crst");
    let spdt = getInt("sle.spdt");
    let brgrt = getFloat("sle.brgrt");
    let lag = document.getElementById("sle.lag").checked

    let aob = substractBearing(reciprocal(brg), crst);
    let lla = substractBearing(brg, crso);
    let spdoa = Math.abs(Math.sin(degToRad(lla)) * spdo);
    let spdta = Math.abs(Math.sin(degToRad(aob)) * spdt);
    let spdoi = Math.abs(Math.cos(degToRad(lla)) * spdo);
    let spdti = Math.abs(Math.cos(degToRad(aob)) * spdt);
    let spdra = spdta - spdoa;

    // If Lag LOS, we have to add SPDTA and SPDOA
    if(lag) {
        spdra = spdta + spdoa;
    }
    result = Math.abs(spdra / brgrt);
    document.getElementById("aob.result").innerHTML = "AOB: " + aob;
    document.getElementById("lla.result").innerHTML = "LLA: " + lla;
    document.getElementById("spdoa.result").innerHTML = "SPDOA: " + fixed(spdoa) + " knots.";
    document.getElementById("spdta.result").innerHTML = "SPDTA: " + fixed(spdta) + " knots.";
    document.getElementById("spdoi.result").innerHTML = "SPDOI: " + fixed(spdoi) + " knots.";
    document.getElementById("spdti.result").innerHTML = "SPDTI: " + fixed(spdti) + " knots.";
    document.getElementById("spdra.result").innerHTML = "SPDRA: " + fixed(Math.abs(spdra)) + " knots.";
    document.getElementById("sle.result").innerHTML = "Ekelund Range: " + fixed(result) + " nm.";
}

// Double Leg Ekelund Range
function dleCalculate() {
    let result = 0;
    let brg1 = getInt("dle.brg1");
    let brg2 = getInt("dle.brg2");
    let crso1 = getInt("dle.crso1");
    let crso2 = getInt("dle.crso2");
    let brgrt1 = getInt("dle.brgrt1")
    let brgrt2 = getInt("dle.brgrt2")
    let lla1 = substractBearing(brg1, crso1);
    let lla2 = substractBearing(brg2, crso2);
    let spdoa1 = Math.abs(Math.sin(degToRad(lla1)) * spdo);
    let spdoa2 = Math.abs(Math.sin(degToRad(lla2)) * spdo);
    result = (spdoa2 - spdoa1) / (brgrt1 - brgrt2);
    document.getElementById("dle.spdoa1").innerHTML = "SPDOA 1: " + fixed(spdoa) + " knots.";
    document.getElementById("dle.spdoa2").innerHTML = "SPDOA 2: " + fixed(spdoa) + " knots.";
    document.getElementById("dle.result").innerHTML = "Ekelund Range: " + fixed(result) + " nm.";
}

// convertUnits translates units from nautical miles to meters.
function convertUnits() {
    let result = 0;
    let nm = getFloat("cu.nm");
    let meters = getInt("cu.m");
    result = nm * 1852;
    document.getElementById("cu.meters").innerHTML = "Meters: " + result + " m.";
    document.getElementById("cu.hectom").innerHTML = "Hectometers: " + (result / 100) + " hm.";
    document.getElementById("cu.miles").innerHTML = "Nautical Miles: " + fixed((meters / 1850)) + " nm.";
}

// Auswanderungsverfahren
function auswCalculate() {
    let result = 0;
    let spdo = getFloat("ausw.spdo");
    let rnghm = getFloat("ausw.rnghm");
    let brg1 = getInt("ausw.brg1");
    let brg2 = getInt("ausw.brg2");
    let overlead = document.getElementById("ausw.overlead").checked
    let uncorrectedSpeed = spdo * Math.sin(degToRad(brg2));
    // 3.24 comes from the formula for hectometers to knots: 100*60/1852.
    let correction = rnghm * 3.24 * Math.sin(degToRad(bearingChange(brg2, brg1)));
    result = uncorrectedSpeed - correction;
    if(overlead) {
        // Enemy has overlead, bearing moves moves into your boat's 0 bearing.
        result = uncorrectedSpeed + correction;
    }
    document.getElementById("ausw.result").innerHTML = "Target Speed: " + fixed(result) + " kn." ;
}

function ausdCalculate() {
    let spdt = 0;
    let spdo = getFloat("ausd.spdo");
    let brg = getInt("ausd.brg");
    spdt = spdo * fixed(Math.sin(degToRad(relativeBearing(brg))));
    console.log(spdt);
    document.getElementById("ausd.spdt").innerHTML = "Target Speed: " + spdt + "kn.";
}

function sbmCalculate() {
    let height = getFloat("sbm.height");
    let markings = getFloat("sbm.markings");
    let minutes = getFloat("sbm.minutes")
    let spdo = getFloat("sbm.spdo");
    let zoom = getInt("sbm.zoom");
    let spdt = 0;
    let range = 0;
    range = ((height * zoom )/ (markings/16 * Math.PI / 180)) * 100;
    spdt = (range / minutes) * 0.0324 - spdo;
    document.getElementById("sbm.range").innerHTML = "Range: " + fixed(range) + " m.";
    document.getElementById("sbm.spdt").innerHTML = "Speed: " + fixed(spdt) + " kn.";
}

// attackDiskCalc is being used to calculate the enemy's AOB and target course.
function attackDiskCalc() {
    let crso = getInt("attackdisk.crso");
    let brg = getInt("attackdisk.brg");
    let aob = getInt("attackdisk.aob");
    let crst = getInt("attackdisk.crst");
    let lla = substractBearing(brg, crso);
    let aob_new = substractBearing(reciprocal(brg), crst);
    let crst_new = substractBearing(reciprocal(brg), aob);
    document.getElementById("attackdisk.lla").innerHTML = "LLA: " + lla;
    document.getElementById("attackdisk.aobn").innerHTML = "AOB: " + aob_new;
    document.getElementById("attackdisk.crstn").innerHTML = "CRST: " + crst_new;
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

// relativeBearing returns the shortest relative bearing.
// For example bearing difference from 0 to 320 is 40.
function relativeBearing(brg) {
    if (brg <= 180) {
        return brg;
    }
    return 360 - brg;
}

// substractBearing substracts one bearing from another.
// For example x = 50, y = 60. The result is 350.
function substractBearing(x, y) {
    let d = x - y;
    return (d % 360 + 360) % 360;
}

// bearingChange returns the absolute bearing difference between
// bearing x and bearing y.
function bearingChange(x,  y) {
    let d = x - y;
    d = (d + 180) % 360 - 180;
    return Math.abs( d < -180 ? d + 360 : d);
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
  }

function radToDeg(rad) {
    return rad / (Math.PI / 180);
}

function fixed(x) {
    return x.toFixed(2);
}