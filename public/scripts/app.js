/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// The below function (createTweetElement) creates Tweets from information supplied by the server
const createTweetElement = function(obj) {
  // Creating elements
  let $tweetBox = $('<article>');
  let $header = $('<header>');
  let $tweeterHandle = $('<div>');
  let $profilePic = $('<img>');
  let $username = $('<div>');
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
  $profilePic.attr('src', obj['user'].avatars);
  $username.text(obj.user.name);
  $tweetContent.text(obj.content.text);
  $timeStamp.text(new Date(obj.created_at));
  $fakeIcons.attr('src', 'images/fakeicons.png');

  // Build the element
  $header.append($tweeterHandle).append($profilePic).append($username);
  $tweetBox.append($header).append($clear).append($tweetContent);
  $footer.append($timeStamp).append($fakeIcons);
  $tweetBox.append($footer);

  // Return the build
  return $tweetBox;
};

// Renders tweets to then post on the website
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('.tweetcontainer').prepend(createTweetElement(tweet));
  }
};

// Makes a get request to /tweets and then renders the tweets
const loadTweets = function() {
  $.get('/tweets', function(data) {
    //console.log(data);
    renderTweets(data);
  });
};

// Makes a get request to /tweets, but only renders the most recent tweet
const refreshTweets = function() {
  $.get('/tweets').done(function(data) {
    let tweetToRender = [];
    tweetToRender.push(data[data.length - 1]);
    renderTweets(tweetToRender);
  });
};


$('document').ready(function() {
  // as soon as page is ready loads tweets
  loadTweets();

  
  const $tweetform = $('.new-tweet-form');
  // Prevent default submit behaviour of .new-tweet-form
  $tweetform.on('submit', function(event) {
    event.preventDefault();

    // prepares the input to be sent to the server
    let formText = $(event.target).serialize();
    // allows for the length of the tweet to be validated
    let formLength = $(event.target).find('textarea').val().length;
    
    // validation that tweet has characters and error generation
    if (formLength <= 0) {
      $('#errortext').text("Your tweet is empty...");
      $("#error-box").addClass('error-box').slideDown("slow", function() {
      });

    // validation that tweet does not exceed cap of 140 characters and error generation
    } else if (formLength > 140) {
      $('#errortext').text("It's a TWEET not a novel!! lol");
      $("#error-box").addClass('error-box').slideDown("slow", function() {
      });

    // validation passed tweet sent to database
    } else {
      $.post("/tweets", formText).then(() => {
    
        // after tweet sent to database clears any possible errors
        $('#error-box').removeClass('error-box').slideUp('fast', function() {});
        $('#errortext').text('');
        // clears textbox for new tweets
        $('textarea').val('');
        // resets character counter
        $('#character-counter').text('140');
        // adds latest tweet to feed
        refreshTweets();
      });
    }
  });
  
  $(".new-tweet").hide();
  // toggle function for new-tweet
  $("#clickhere").click(function() {
    $(".new-tweet").slideToggle("slow", function() {
    });
  });

});


