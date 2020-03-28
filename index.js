require("dotenv").config();
const Discord = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");
const querystring = require("querystring");

const client = new Discord.Client();
const prefix = "!";

const TOKEN = process.env.TOKEN;

const trim = (str, max) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "covid" && !args.length) {
    axios
      .get("https://www.worldometers.info/coronavirus/")
      .then(function(response) {
        const $ = cheerio.load(response.data);

        const currentCases = $("div.maincounter-number")
          .find('span[style="color:#aaa"]')
          .text();

        const currentDeaths = $("div.maincounter-number")
          .find("span")
          .slice(1)
          .eq(0)
          .text();

        const currentRecovered = $("div.maincounter-number")
          .find("span")
          .slice(2)
          .eq(0)
          .text();

        // console.log("Cases: " + currentCases);
        // console.log("Deaths: " + currentDeaths);
        // console.log("Recovered: " + currentRecovered);

        const embed = new Discord.RichEmbed()
          .setTitle("COVID-19 Status: World")
          .setColor(0x00ae86)
          .setURL("https://www.worldometers.info/coronavirus/")
          .setThumbnail("https://i.imgur.com/SqgRSIA.png")
          .setTimestamp()
          .addField("**Current Cases**", currentCases)
          .addField("**Deaths**", currentDeaths)
          .addField("**Recovered**", currentRecovered);

        message.channel.send(embed);
      })
      .catch(function(error) {
        console.log("error");
        message.channel.send("Something went wrong :/");
      });
  } else if (args[0] === "us" || args[0] === "usa") {
    axios
      .get("https://www.worldometers.info/coronavirus/country/us/")
      .then(function(response) {
        const $ = cheerio.load(response.data);

        const currentCases = $("div.maincounter-number")
          .find('span[style="color:#aaa"]')
          .text();

        const currentDeaths = $("div.maincounter-number")
          .find("span")
          .slice(1)
          .eq(0)
          .text();

        const currentRecovered = $("div.maincounter-number")
          .find("span")
          .slice(2)
          .eq(0)
          .text();

        // console.log("Cases: " + currentCases);
        // console.log("Deaths: " + currentDeaths);
        // console.log("Recovered: " + currentRecovered);

        const embed = new Discord.RichEmbed()
          .setTitle("COVID-19 Status: US")
          .setColor(0x00ae86)
          .setURL("https://www.worldometers.info/coronavirus/country/us/")
          .setThumbnail("https://i.imgur.com/SqgRSIA.png")
          .setTimestamp()
          .addField("**Current Cases**", currentCases)
          .addField("**Deaths**", currentDeaths)
          .addField("**Recovered**", currentRecovered);

        message.channel.send(embed);
      })
      .catch(function(error) {
        console.log("error");
        message.channel.send("Something went wrong :/");
      });
  } else {
    console.log("bork");
    message.channel.send("Fuck you, Cody.");
  }
});

client.login(TOKEN);
