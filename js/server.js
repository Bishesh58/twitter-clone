const URL = "http://localhost:5000/tweets";


const onEnter = (e) =>{
  if(e.key == "Enter"){
    getTwitterData()
  }
}

/**
 * Retrive Twitter Data from API
 */
const getTwitterData = () => {

    const searchTweet = document.getElementById('tweetsSearch').value;
    if(!searchTweet) return;
    const encodedSearchTweet = encodeURIComponent(searchTweet)
    const fullUrl = `${URL}?q=${encodedSearchTweet}&count=10`
    fetch(fullUrl)
    .then((response)=>{
       return response.json();
    })
    .then((data)=>{
      buildTweets(data.statuses)
    })
}



/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    let twitterContent = "";
    tweets.map((tweet)=>{
      twitterContent += `
      <div class="tweets__container">
      <div class="user__info">
          <div class="user__profile">

          </div>
          <div class="user__nameContainer">
              <div class="user__fullName">
                  Bishesh Sunam
              </div>
              <div class="username">
                  @Bishesh
              </div>
          </div>
      </div>
      `
      if(tweet.extended_entities &&
        tweet.extended_entities.media.length > 0){
       twitterContent+= buildImages(tweet.extended_entities.media);
      }
      twitterContent += `
      <div class="tweets__text">
          ${tweet.full_text}
      </div>
      <div class="tweets__date">
          20 hours ago
      </div>
    </div> `
    })
document.querySelector('.tweets__lists').innerHTML = twitterContent;

}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {
  let imagesContent = `<div class="tweets__imagesContainer">`;
  let imageExist = false;
  mediaList.map((media)=>{
    if(media.type == "photo"){
      imageExist = true;
      imagesContent += ` <div class="tweets__images" style="background-image: url(${media.media_url_https})"></div>`
    }
  })
  imagesContent +=`</div>`
  return imageExist? imagesContent : '';
}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {

}