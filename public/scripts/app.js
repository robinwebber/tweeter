/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
/* <article class="tweet-box">
        
        <header>

          <div class="tweeter-handle">@SirIsaac</div>

          <img class="profile-pic" src="images/isaac.png">

          <div class="username">Newton</div>

        </header>
        <div class="clear"></div>
        <p class="tweet-content">If I have seen further it is by standing on the shoulders of giants.</p>


        <footer>
          <p class="timestamp">timestamp</p>
        </footer>

      </article> */

const createTweetElement = function(obj) {
  // Creating elements
  let $tweetBox = $('<article>');
  let $header = $('<header>');
  let $tweeterHandle = $('<div>');
  let $profilePic = $(`<img>`);
  let $username = $('<div>')
  let $clear = $('<div>');
  let $tweetContent = $('<p>');
  let $footer = $('<footer>');
  let $timeStamp = $('<p>');

  // Assigning classes to elements
  $tweetBox.addClass('tweet-box');
  $tweeterHandle.addClass('tweeter-handle');
  $profilePic.addClass('profile-pic');
  $username.addClass('username');
  $clear.addClass('clear');
  $tweetContent.addClass('tweet-content');
  $timeStamp.addClass('timestamp');

  // Adding content to the elements
  $tweeterHandle.text(obj.user.handle);
  $profilePic.attr(`src`, obj['user'].avatars)
  $username.text(obj.user.name);
  $tweetContent.text(obj.content.text);
  $footer.text(obj.created_at);

  // Build the element
  $header.append($tweeterHandle).append($profilePic).append($username);
  
  $tweetBox.append($header).append($clear).append($tweetContent);

  $footer.append($timeStamp);

  $tweetBox.append($footer);

  // Return the build
  return $tweetBox;

};

const renderTweets = function(tweets) {

    for (tweet of tweets) {
      $('.tweetcontainer').append(createTweetElement(tweet));
    }
};



$('document').ready(function() {
  
  
  renderTweets(data);
  
});

