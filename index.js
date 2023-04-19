const PORT = process.env.PORT || 8000;
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const url = "https://www.theguardian.com/uk-news";
const urlLabe =
  "https://hydro.chmi.cz/hppsoldv/popup_hpps_prfdyn.php?seq=307338";



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', function(req, res)  {
  res.send('Hello World');
});

app.get('/results', function(req, res)  {
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