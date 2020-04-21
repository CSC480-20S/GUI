var token = localStorage['token'];
//Parses the getWishlist endpoint and creates cards for each study in the endpoint for a specific token.
$(document).ready(function() {
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/getWishlist?token=' + token,
    dataType: 'json',
    success: function(json) {
      var mainContainer = document.getElementById("myWish");
      for (var i = 0; i < json.length; i++) {
        var div = document.createElement("div");
        /*var tester = json[i].studyID;*/

        div.innerHTML =
          '<div class="card" onclick="myFunction(' + json[i].studyID + ')";"><div class="card_info"><p class="study_title">' + json[i].title + '</p>' +
          '<p class="study_description">' + json[i].purpose + '</p>' +
          '<div class="author"><img class="author_icon" src="assets/school.svg" alt="author icon">' +
          '<p class="author_name">' + json[i].author + '</p>' +
          '</div>' +
          '<div class="university"><img class="university_icon" src="assets/university.svg" alt="university icon">' +
          '<p class="university_name">' + json[i].institution + '</p>' +
          '</div>' + '</div>' +
          '<p class="credits">' + json[i].costInCredits + ' Credits' + '</p>' +
          '</div>';
        mainContainer.appendChild(div);

      }
    }
  });
});

//Redirects to the preview page corresponding a specific study id.
function myFunction(id) {
  window.location.href = "preview.html?id=" + id;
}
