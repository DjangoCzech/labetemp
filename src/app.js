const teplotaLabe = document.querySelector("#teplota-labe");

const urlLabe = "https://teplota-labe.onrender.com/results";

fetch(urlLabe)
  .then((response) => response.json())
  .then((data) => {
    var t = document.getElementById("teplota-labe");
    var tchange = data[0]["teplota"];
    var tfloat = parseFloat(tchange.replace(",", ".").replace(" ", ""));
    var d = document.getElementById("actual-date");
    var s = document.getElementById("stav-labe");
    var p = document.getElementById("prutok-labe");
    t.innerHTML = `Teplota ${tfloat} °C`;
    d.innerHTML = `Měřeno: ${data[0]["datum"]}`;
    s.innerHTML = `Stav: ${data[0]["stav"]} cm`;
    p.innerHTML = `Průtok: ${data[0]["prutok"]} m<sup>3</sup>s<sup>-1</sup>`;

    let tempsOnly = data.map((item) => item.teplota).reverse();
    let datesOnly = data.map((item) => item.datum).reverse();
    let stavOnly = data.map((item) => item.stav).reverse();
    let prutokOnly = data.map((item) => item.prutok).reverse();

    showChart(tempsOnly, datesOnly, stavOnly, prutokOnly);

    console.log(tempsOnly);

    //console.log(data[0]["teplota"])
  });

function showChart(temps, dates, stav, prutok) {
  const ctx = document.getElementById("myChart");
  //const xlabels = dates;
  new Chart(ctx, {
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

// const ctx = document.getElementById("myChart");
// const xlabels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
// new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: xlabels,
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });
