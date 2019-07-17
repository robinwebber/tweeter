/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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
  const $article = $('<article>');
  const $header = $('<header>');
  const $divhandle = $('<div class="tweeter-handle">').text(obj.user.handle).appendTo($header);
  const $img = $('<img class="profile-pic">')


};


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

// $('document').ready(function() {
//   const $tweet = createTweetElement(tweetData);
//   $('#tweetcontainer').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

// });

const $tweet = createTweetElement(tweetData);


// Test / driver code (temporary)
console.log($tweet); // to see what it looks like