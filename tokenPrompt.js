$(document).ready(function() {
  document.getElementById("token_overlay").style.display = "block";
});

//For index.html. The user enters to token and basically "logs in". Whichever token is used here is saved in localstorage
//to use across the website.
function applyToken(token) {

  var urlSend = 'http://pi.cs.oswego.edu:12100/checkToken?token=' + token;
  $.ajax({
    url: urlSend,
    type: 'GET',
    success: function(json) {
      localStorage['token'] = token;
      localStorage['username'] = json;
      document.getElementById("token_overlay").style.display = "none";
      window.location.href = "home.html";
    }
  });


}
