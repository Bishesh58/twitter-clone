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
      console.log(data); 
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

}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {

}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {

}