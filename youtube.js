const YouTube = require('youtube-node');

const youTube = new YouTube();

youTube.setKey(process.env.YOUTUBE_API_KEY);

function searchVideoURl(message,queryText){
  return new Promise((resolve,reject)=>{
    youTube.search( `Exercicio em casa para ${queryText}` , 2, function(error, result) {
        if (error) {
          reject(error);
        }
        else {
          const videoIds = result.items.map((item)=>item.id.videoId).filter(item=>item);
          const youtubeLinks = videoIds.map(videoId => `http://www.youtube.com/watch?v=${videoId}`)
          resolve(`${message} ${youtubeLinks.join(', ')}`);
        }
    });
  });
};

module.exports ={
  searchVideoURl
}