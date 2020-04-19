var token = localStorage['token'];

//Constructs the cards by parsing the search endpoint with only the token as a query string. Then places the cards on the home page.
$(document).ready(function() {
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/search?token=' + token,
    dataType: 'json',
    success: function(json) {
      console.log("%j", json);
      var mainContainer = document.getElementById("myData");
      for (var i = 0; i < json.length; i++) {
        var div = document.createElement("div");
        div.innerHTML =
          '<div class="card" onclick="myFunction(' + json[i].studyID + ')";"><div class="card_info"><p class="study_title">' + json[i].title + '</p>' +
          '<p class="study_description">' + json[i].purpose + '</p>' +
          '<div class="author"><img class="author_icon" src="assets/school.svg" alt="author icon">' +
          '<p class="author_name">' + json[i].author + '</p>' +
          '</div>' +
          '<div class="university"><img class="university_icon" src="assets/university.svg" alt="university icon">' +
          '<p class="university_name">' + json[i].institution + '</p>' +
          '</div>' + '</div>' + '<p class="credits">' + json[i].costInCredits + ' Credits' + '</p>' +
          '</div>';
        mainContainer.appendChild(div);
      }
    }
  });
});

//Takes a study id as the paramater and then redirects to a preview page for that specific study.
function myFunction(id) {
  window.location.href = "preview.html?id=" + id;
}
