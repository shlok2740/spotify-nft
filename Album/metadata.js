let fs = require("fs");
let axios = require("axios");

let songs = ["Dreaming", "Freedom"];
let durations = ["03:12", "03:55"];
let ipfsArray = [];

for (let i = 0; i < songs.length; i++) {
    ipfsArray.push({
        path: `metadata/${i}.json`,
        content: {
            image: `ipfs://QmTEbpmtSatq6H4VFzLYQiroNASHsdyYNSFLCFbsJr1ugS/media/2`, //xxx = hash
            name: songs[i],
            animation_url: `ipfs://QmTEbpmtSatq6H4VFzLYQiroNASHsdyYNSFLCFbsJr1ugS/media/${i}`, //xxx = hash
            duration: durations[i],
            artist: "Middle And End",
            year: "2020",
        },
    });
}

axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
        headers: {
            "X-API-KEY":
                "DZug9TotfXJrq5VvUQ13FoJHnbgG5QwEoM7ota7psrq6Q3NOekRIxvxSC42U83S4",
            "Content-Type": "application/json",
            accept: "application/json",
        },
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error);
    });
