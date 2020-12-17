const URL = "http://localhost:5000/tweets";
let nextPageURL = null;



const onEnter = (e) =>{
  if(e.key == "Enter"){
    getTwitterData()
  }
}


const onNextPage = () =>{
  if(nextPageURL){
    getTwitterData(true);
  }
}
/**
 * Retrive Twitter Data from API
 */
const getTwitterData = (nextPage = false) => {

    const searchTweet = document.getElementById('tweetsSearch').value;
    if(!searchTweet) return;
    const encodedSearchTweet = encodeURIComponent(searchTweet)
    let fullUrl = `${URL}?q=${encodedSearchTweet}&count=10`;
    if(nextPageURL && nextPage){
      fullUrl = nextPageURL;
    }
    fetch(fullUrl)
    .then((response)=>{
       return response.json();
    })
    .then((data)=>{
      buildTweets(data.statuses, nextPage);
      saveNextPage(data.search_metadata);
      nextPageButtonVisibility(data.search_metadata);
    })
}



/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
  if(metadata.next_results){
    nextPageURL = `${URL}${metadata.next_results}`
  } else{
    nextPageURL = null;
  }
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
  const text = e.innerText;
  console.log(text);
  document.getElementById("tweetsSearch").value = text;
  getTwitterData()
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
  if(metadata.next_results){
    document.getElementById('next__Page').style.visibility = "visible";
  } else{
    document.getElementById('next__Page').style.visibility = "hidden";
  }
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    let twitterContent = "";
    tweets.map((tweet)=>{
      const createdDate = moment(tweet.created_at).fromNow()
      twitterContent += `
      <div class="tweets__container">
      <div class="user__info">
          <div class="user__profile" style="background-image: url(${tweet.user.profile_image_url_https})">

          </div>
          <div class="user__nameContainer">
              <div class="user__fullName">
                 ${tweet.user.name}
              </div>
              <div class="username">
                  ${tweet.user.screen_name}
              </div>
          </div>
      </div>
      `
      if(tweet.extended_entities &&
        tweet.extended_entities.media.length > 0){
       twitterContent+= buildImages(tweet.extended_entities.media);
       twitterContent += buildVideo(tweet.extended_entities.media)
      }
      twitterContent += `
      <div class="tweets__text">
          ${tweet.full_text}
      </div>
      <div class="tweets__date">
          ${createdDate}
      </div>
    </div> `
    })
    if(nextPage){
      document.querySelector('.tweets__lists').insertAdjacentHTML('beforeend', twitterContent);
    } else{
      document.querySelector('.tweets__lists').innerHTML = twitterContent;
    }
 
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
  let videoContent = `<div class="tweets__videoContainer">`;
  let videoExist = false;
  mediaList.map((media)=>{
    if(media.type == "video"){
      videoExist = true;
      const videoVariant = media.video_info.variants.find((variant) => variant.content_type == 'video/mp4')
      videoContent += `  
          <video controls>
            <source src="${videoVariant.url}" type="video/mp4">
          </video> `
    }
    else if(media.type == "animated_gif"){
      videoExist = true;
      const videoVariant = media.video_info.variants.find((variant) => variant.content_type == 'video/mp4')
      videoContent += `  
          <video loop autoplay>
            <source src="${videoVariant.url}" type="video/mp4">
          </video> `
    }
  })
  videoContent +=`</div>`
  return videoExist? videoContent : '';
}

//dark mode
const checkbox = document.getElementById('input__checkbox');
const container = document.querySelector(".container");
const tweets__sidebar = document.querySelector(".tweets__sidebar");
const tweets__trending = document.querySelector(".tweets__trending");
const tweets__text = document.querySelector(".tweets__text");


checkbox.addEventListener('change', ()=>{
  container.classList.toggle('light');
  tweets__sidebar.classList.toggle('light');
  tweets__trending.classList.toggle('light');
  tweets__text.classList.toggle('light');
})

