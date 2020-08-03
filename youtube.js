require('dotenv').config();
const YouTube = require('youtube-node');

const youTube = new YouTube();

youTube.setKey(process.env.YOUTUBE_API_KEY);

youTube.search('World War z Trailer', 2, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(JSON.stringify(result, null, 2));
    }
});