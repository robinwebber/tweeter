/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]
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
          <img class="fakeicon" src="images/fakeicons.png"
        </footer>

      </article> */

const createTweetElement = function(obj) {
  // Creating elements
  let $tweetBox = $('<article>');
  let $header = $('<header>');
  let $tweeterHandle = $('<div>');
  let $profilePic = $('<img>');
  let $username = $('<div>')
  let $clear = $('<div>');
  let $tweetContent = $('<p>');
  let $footer = $('<footer>');
  let $timeStamp = $('<p>');
  let $fakeIcons = $('<img>');

  // Assigning classes to elements
  $tweetBox.addClass('tweet-box');
  $tweeterHandle.addClass('tweeter-handle');
  $profilePic.addClass('profile-pic');
  $username.addClass('username');
  $clear.addClass('clear');
  $tweetContent.addClass('tweet-content');
  $timeStamp.addClass('timestamp');
  $fakeIcons.addClass('fakeicon');

  // Adding content to the elements
  $tweeterHandle.text(obj.user.handle);
  $profilePic.attr('src', obj['user'].avatars)
  $username.text(obj.user.name);
  $tweetContent.text(obj.content.text);
  $timeStamp.text(new Date(obj.created_at));
  $fakeIcons.attr('src', 'images/fakeicons.png')

  // Build the element
  $header.append($tweeterHandle).append($profilePic).append($username);
  $tweetBox.append($header).append($clear).append($tweetContent);
  $footer.append($timeStamp).append($fakeIcons);
  $tweetBox.append($footer);

  // Return the build
  return $tweetBox;
};

const renderTweets = function(tweets) {
    for (tweet of tweets) {
      $('.tweetcontainer').prepend(createTweetElement(tweet));
    }
};


const loadTweets = function () {
  $.get('/tweets', function(data) {
    //console.log(data);
    renderTweets(data);
  })
}
// const loadTweets = function() {
//   $.get("/tweets").done(function(tweets) {
//     renderTweets(tweets);
//   });
// };
const refreshTweets = function () {
  $.get('/tweets').done(function(data) {
    let tweetToRender = [];
    tweetToRender.push(data[data.length-1])
    //console.log('data', data)
    //console.log('tweetToRender', tweetToRender);
    renderTweets(tweetToRender);
  })
}

$('document').ready(function() {

  loadTweets();

  const $tweetform = $('.new-tweet-form');
  $tweetform.on('submit', function (event) {

    event.preventDefault();
    let formText = $(event.target).serialize();
    let formLength = $(event.target).find('textarea').val().length
    
    if (formLength <= 0) {
      $('#errortext').text("Your tweet is empty...");
      $( "#error-box" ).addClass('error-box').slideDown( "slow", function() {
      });
    } else if (formLength > 140) {
      
      $('#errortext').text("That tweet too big");
        $( "#error-box" ).addClass('error-box').slideDown( "slow", function() {
        });
    } else {
      
      $.post("/tweets", formText).then(() => {
        
        $('#error-box').removeClass('error-box').slideUp('fast', function() {})
        $('#errortext').text('');
        $('textarea').val('');
        $('#character-counter').text('140');
        refreshTweets();
      })
    }
  })
  
  $(".new-tweet").hide();

  $( "#clickhere" ).click(function() {
    $( ".new-tweet" ).slideToggle( "slow", function() {
    });
  });

});


