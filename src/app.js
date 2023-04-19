const teplotaLabe = document.querySelector('#teplota-labe')

const urlLabe = "http://localhost:8000/results"

fetch(urlLabe)
    .then(response => response.json())
    .then(data => {
        var t = document.getElementById("teplota-labe");
        var d = document.getElementById("actual-date");
        var s = document.getElementById("stav-labe");
        var p = document.getElementById("prutok-labe");
        t.innerHTML = `Teplota ${data[0]["teplota"]} °C`;
        d.innerHTML = `Měřeno: ${data[0]["datum"]}`;
        s.innerHTML = `Stav: ${data[0]["stav"]} cm`;
        p.innerHTML = `Průtok: ${data[0]["prutok"]} m<sup>3</sup>s<sup>-1</sup>`;


        //console.log(data[0]["teplota"])
    })