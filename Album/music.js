let fs = require("fs");
let axios = require("axios");

let media = ["Dreaming.mp3", "Freedom.mp3", "NonFungible.png"];
let ipfsArray = [];
let promises = [];

for (let i = 0; i < media.length; i++) {
    promises.push(
        new Promise((res, rej) => {
            fs.readFile(`${__dirname}/export/${media[i]}`, (err, data) => {
                if (err) rej();
                ipfsArray.push({
                    path: `media/${i}`,
                    content: data.toString("base64"),
                });
                res();
            });
        })
    );
}
Promise.all(promises).then(() => {
    axios
        .post(
            "https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
            ipfsArray,
            {
                headers: {
                    "X-API-KEY":
                        "DZug9TotfXJrq5VvUQ13FoJHnbgG5QwEoM7ota7psrq6Q3NOekRIxvxSC42U83S4",
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
            }
        )
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
});
