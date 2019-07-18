$(document).ready(function() {

  $(".new-tweet-form textarea").keyup(function() {
    let maxCharacters = 140;
    const tweetLength = $(this).val().length;
    const remainingCharacters = maxCharacters - tweetLength;
    $('#character-counter').text(remainingCharacters);

    if (remainingCharacters < 0) {
      $(this).siblings('span').addClass("has-error");
    } else {
      if ($(this).siblings('span').hasClass("has-error")) {
        $(this).siblings('span').removeClass("has-error");
      }
    }
  });
});