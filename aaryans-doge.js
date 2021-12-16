const axios = require("axios");
const ActionCable = require("actioncable-nodejs/src/actioncable.js");
const dotenv = require("dotenv").config();

const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;

const uri = `wss://recurse.rctogether.com/cable?app_id=${APP_ID}&app_secret=${APP_SECRET}`;
// console.log(uri);
let cable = new ActionCable(uri, {
  origin: "https://recurse.rctogether.com",
});

let subscription = cable.subscribe("ApiChannel", {
  connected() {
    console.log("connected");
  },

  disconnected() {
    console.log("disconnected");
  },

  rejected() {
    console.log("rejected");
  },

  received(data) {
    // Move doge near Aaryan
    if (data?.payload?.person_name === "Aaryan Porwal") {
      const aaryan = data.payload;
      const x = aaryan.pos.x + 1;
      const y = aaryan.pos.y + 1;
      moveAaryanDoge(x, y);
    }

    // Move doge near bone
    if (data?.payload?.note_text?.includes("🦴")) {
      const { x: boneX, y: boneY } = data?.payload?.pos;
      moveAaryanDoge(boneX + 1, boneY);
    }
  },
});

function moveAaryanDoge(x, y) {
  console.log(`moving to ${x}, ${y}`);
  const dogeBotID = "76882";
  const options = {
    method: "PATCH",
    url: `https://recurse.rctogether.com/api/bots/${dogeBotID}?app_id=${APP_ID}&app_secret=${APP_SECRET}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { bot: { name: "aaryans doge", x, y, emoji: "🐶" } },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log("moveAaryanDoge::response");
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log("moveAaryanDoge::error");
      // console.log(error.message);
    });
}
