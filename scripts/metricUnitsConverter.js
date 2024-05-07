const converterDiv = document.getElementById("converter");

const units = {
    quetta: 30,
    ronna: 27,
    yotta: 24,
    zetta: 21,
    exa: 18,
    peta: 15,
    tera: 12,
    giga: 9,
    mega: 6,
    kilo: 3,
    hecto: 2,
    deca: 1,
    base: 0,
    deci: -1,
    centi: -2,
    milli: -3,
    micro: -6,
    nano: -9,
    pico: -12,
    femto: -15,
    atto: -18,
    zepto: -21,
    yocto: -24,
    ronto: -27,
    quecto: -30
};

const arrayOfUnits = Object.keys(units);

const firstCharToUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1);

arrayOfUnits.forEach(key => converterDiv.innerHTML += `
    <label for="${key}">
    ${firstCharToUpperCase(key)}
    <math>
        <msup>
            <mi>10</mi>
            <mn>${units[key]}</mn>
        </msup>
    </math>
    </label>
    <input title="${firstCharToUpperCase(key)}" id="${key}" type="number" />
`);

const displayResults = event => {
    const baseValue = bigDecimal.multiply(event.target.value, Math.pow(10, units[event.target.id]).toString());

    arrayOfUnits.forEach(key => {
        const precision = baseValue.slice(baseValue.lastIndexOf(".")).length - 1 + units[key] >= 0 ? baseValue.slice(baseValue.lastIndexOf(".")).length - 1 + units[key] : 0;
        if (key !== event.target.id) document.getElementById(key).value = bigDecimal.divide(baseValue, Math.pow(10, units[key]).toString(), precision);
    });
};

arrayOfUnits.forEach(key => document.getElementById(key).addEventListener("click", displayResults));