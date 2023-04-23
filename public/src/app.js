var fs = require("fs");
const teplotaLabe = document.querySelector("#teplota-labe");
const urlLabeResults = "http://localhost:3000";
// const urlLabeResults = "https://teplotalabenode.azurewebsites.net";
var obj;

fs.readFile('temps-labe.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj);
    var items = [];
    var t = document.getElementById("teplota-labe");
});


const fetchDataFromUrl = fetch(urlLabe)
  .then((response) => response.json())
  .then((data) => {
    var items = [];
    var t = document.getElementById("teplota-labe");
    var tchange = data[0]["teplota"].replace(".", ",");
    var d = document.getElementById("actual-date");
    var s = document.getElementById("stav-labe");
    var p = document.getElementById("prutok-labe");
    items.push(t);
    items.push(d);
    t.innerHTML = `Teplota vody ${tchange} °C`;
    d.innerHTML = `Měřeno: ${data[0]["datum"]}`;
    s.innerHTML = `Stav: ${data[0]["stav"]} cm`;
    p.innerHTML = `Průtok: ${data[0]["prutok"]} m<sup>3</sup>s<sup>-1</sup>`;

    let tempsOnly = data.map((item) => item.teplota).reverse();
    let datesOnly = data.map((item) => item.datum).reverse();
    let stavOnly = data.map((item) => item.stav).reverse();
    let prutokOnly = data.map((item) => item.prutok).reverse();

    showChart(tempsOnly, datesOnly, stavOnly, prutokOnly);
  });

function showChart(temps, dates, stav, prutok) {
  const ctxLabe = document.getElementById("myChartLabe");
  let myChart = new Chart(ctxLabe, {
    data: {
      datasets: [
        {
          type: "line",
          label: "Teplota",
          data: temps,
        },
        {
          type: "line",
          label: "Stav vody",
          data: stav,
        },
        {
          type: "line",
          label: "Průtok vody",
          data: prutok,
        },
      ],
      labels: dates,
    },
    options: {
      scales: {
        y: {
          min: 0, //Math.min(...temps),
        },
      },
    },
  });
}

function destroyChart() {
  myChart.destroy();
}
