const PORT = process.env.PORT || 3000;
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const urlLabe =
  "https://hydro.chmi.cz/hppsoldv/popup_hpps_prfdyn.php?seq=307338";
const urlLoucna =
  "https://hydro.chmi.cz/hppsoldv/popup_hpps_prfdyn.php?seq=307363";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/", function (req, res) {
  res.send("Hello World");
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
