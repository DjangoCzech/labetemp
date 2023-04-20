const teplotaLoucna = document.querySelector("#teplota-loucna");

const urlLoucna = "https://teplota-labe.onrender.com/resultsloucna";

const urlTempDasice = "https://teplota-labe.onrender.com/teplotaDasice";
const urlTempPardubice = "https://teplota-labe.onrender.com/teplotaPardubice";

fetch(urlLoucna)
  .then((response) => response.json())
  .then((data) => {
    var t = document.getElementById("teplota-loucna");
    var tchange = data[0]["teplota"].replace(".", ",");
    var d = document.getElementById("actual-date-loucna");
    var s = document.getElementById("stav-loucna");
    var p = document.getElementById("prutok-loucna");
    t.innerHTML = `Teplota vody ${tchange} °C`;
    d.innerHTML = `Měřeno: ${data[0]["datum"]}`;
    s.innerHTML = `Stav: ${data[0]["stav"]} cm`;
    p.innerHTML = `Průtok: ${data[0]["prutok"]} m<sup>3</sup>s<sup>-1</sup>`;

    let tempsOnly = data.map((item) => item.teplota).reverse();
    let datesOnly = data.map((item) => item.datum).reverse();
    let stavOnly = data.map((item) => item.stav).reverse();
    let prutokOnly = data.map((item) => item.prutok).reverse();
    //showChart(tempsOnly, datesOnly, stavOnly, prutokOnly);
  });

fetch(urlTempDasice)
  .then((response) => response.json())
  .then((data) => {
    var t = document.getElementById("teplota-dasice");
    t.innerHTML = `Teplota vzduchu ${data[0]["teplota"]}`;
  });

fetch(urlTempPardubice)
  .then((response) => response.json())
  .then((data) => {
    var t = document.getElementById("teplota-pardubice");
    t.innerHTML = `Teplota vzduchu ${data[0]["teplota"]}`;
  });

// function showChart(temps, dates, stav, prutok) {
//   const ctxLoucna = document.getElementById("myChartLoucna");
//   var myChart = new Chart(ctxLoucna, {
//     data: {
//       datasets: [
//         {
//           type: "line",
//           label: "Teplota",
//           data: temps,
//         },
//         {
//           type: "line",
//           label: "Stav vody",
//           data: stav,
//         },
//         {
//           type: "line",
//           label: "Průtok vody",
//           data: prutok,
//         },
//       ],
//       labels: dates,
//     },
//     options: {
//       scales: {
//         y: {
//           min: 0, //Math.min(...temps),
//         },
//       },
//     },
//   });
// }
