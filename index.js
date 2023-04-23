const PORT = process.env.PORT || 3000;
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
const { log } = require("console");
app.use(cors());

const urlLabe =
  "https://hydro.chmi.cz/hppsoldv/popup_hpps_prfdyn.php?seq=307338";
const urlLoucna =
  "https://hydro.chmi.cz/hppsoldv/popup_hpps_prfdyn.php?seq=307363";
const urlTeplotaDasice =
  "https://www.in-pocasi.cz/predpoved-pocasi/cz/pardubicky/dasice-4075/";
const urlTeplotaPardubice =
  "https://www.in-pocasi.cz/predpoved-pocasi/cz/pardubicky/pardubice-300/";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

app.use(express.static(__dirname + '/public'));

app.get("/teplotaDasice", function (req, res) {
  axios(urlTeplotaDasice).then((response) => {
    const htmlTeplotaDasice = response.data;
    const $ = cheerio.load(htmlTeplotaDasice);
    const teplotaDasice = [];
    var tempDasice = $(".alfa").text().trim();
    teplotaDasice.push({ teplota: tempDasice });
    res.json(teplotaDasice);
  });
});

app.get("/teplotaPardubice", function (req, res) {
  axios(urlTeplotaPardubice).then((response) => {
    const htmlTeplotaDasice = response.data;
    const $ = cheerio.load(htmlTeplotaDasice);
    const teplotaDasice = [];
    var tempDasice = $(".alfa").text().trim();
    teplotaDasice.push({ teplota: tempDasice });
    res.json(teplotaDasice);
  });
});

app.get("/results", function (req, res) {
  axios(urlLabe).then((response) => {
    const htmlLabe = response.data;
    const $ = cheerio.load(htmlLabe);
    const teplotyLabe = [];
    $(".center_text tr", htmlLabe).each(function () {
      const datum = $(this).find("td").eq(0).text();
      const stav = $(this).find("td").eq(1).text();
      const prutok = $(this).find("td").eq(2).text();
      var teplota = $(this).find("td").eq(3).text();
      if (teplota) {
        teplotyLabe.push({
          datum,
          stav,
          prutok,
          teplota,
        });
      }
    });
    res.json(teplotyLabe);
    const datumLabe = teplotyLabe[0]["datum"];
    const stavLabe = teplotyLabe[0]["stav"];
    const prutokLabe = teplotyLabe[0]["prutok"];
    const teplotaLabe = teplotyLabe[0]["teplota"];
  });
});

app.get("/resultsStatic", function (req, res) {
  fs.readFile("public/src/temps-labe.json", "utf8", function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    res.json(obj[0].waterTemps[0]); 
    });
});

app.get("/addtemplabe", function (req, res) {
  axios(urlLabe).then((response) => {
    const htmlLabe = response.data;
    const $ = cheerio.load(htmlLabe);
    const teplotyLabe = [];
    $(".center_text tr", htmlLabe).each(function () {
      const datum = $(this).find("td").eq(0).text();
      const stav = $(this).find("td").eq(1).text();
      const prutok = $(this).find("td").eq(2).text();
      var teplota = $(this).find("td").eq(3).text();
      if (teplota) {
        teplotyLabe.push({
          datum,
          stav,
          prutok,
          teplota,
        });
      }
    });



    fs.readFile("public/src/temps-labe.json", "utf8", function (err, data) {
      if (err) throw err;
      var testObj = "{\"datum\": \"23.04.2023 57:00\",\"stav\": \"pocem\",\"prutok\": \"68\",\"teplota\": \"11.1\"}";
      var testParse = JSON.parse(testObj);
      var obj = JSON.parse(data);
      // obj[0].waterTemps[0]['labeTemps'].unshift(teplotyLabe[0]);
      obj[0].waterTemps[0]['labeTemps'].unshift(testParse);      
      data = JSON.stringify(obj, null, 2);
      fs.writeFileSync("public/src/temps-labe.json", data);       
      });


    fs.readFile("public/src/temps-labe.json", "utf8", function (err, data) {
      if (err) throw err;
      var obj = JSON.parse(data);
      res.json(obj);
    });
    //res.json(teplotyLabe[0]);    
  });
});


app.get("/resultsloucna", function (req, res) {
  axios(urlLoucna).then((response) => {
    const htmlGet = response.data;
    const $ = cheerio.load(htmlGet);
    const tempsGet = [];
    $(".center_text tr", htmlGet).each(function () {
      const datum = $(this).find("td").eq(0).text();
      const stav = $(this).find("td").eq(1).text();
      const prutok = $(this).find("td").eq(2).text();
      var teplota = $(this).find("td").eq(3).text();
      if (teplota) {
        tempsGet.push({
          datum,
          stav,
          prutok,
          teplota,
        });
      }
    });
    res.json(tempsGet);
    const datumLabe = tempsGet[0]["datum"];
    const stavLabe = tempsGet[0]["stav"];
    const prutokLabe = tempsGet[0]["prutok"];
    const teplotaLabe = tempsGet[0]["teplota"];
  });
});
