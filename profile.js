localStorage['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODY3ODg5MzIsImV4cCI6MTU5MTExMjUzMiwic3ViIjoiMTIzNDUifQ.IxWbmRPCHiyvM8-yS2EEiE5GzHnDolB-blkhB9a9upU';
var token = localStorage['token'];
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function bookMark(x) {
  /*x.classList.toggle("fa-bookmark");*/
  x.classList.toggle("orange_icon");
}


function getToken(user_id){
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/token/generate?user_id='+user_id,
    dataType: 'json',
    success: function (json) {
      console.log("Token: ", json.token);     
      getListPendingStudies(token = json.token);
    }
  });
}

function getListPendingStudies(){
  var limit='2';
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/getPending?token='+token+'&limit='+limit,
    dataType: 'json',
    success: function (json) {
      console.log("%j", json);
      var content = "";
      for (var i = 0; i < json.length; i++) {
        content +=
          '<a class="study_link" href="review_study.html?study=' + json[i].studyID + '">' +
          '<div class="admin_wrapper">' +
          '<div>' + json[i].title + '</div>' +
          '<div>' + json[i].author + '</div>' +
          '<div>' + json[i].upload_date + '</div>' +
          '<div>Waiting for review</div>' +
          '</div>' +
          '</a>';
      }
      document.getElementById("listPending").innerHTML = content;
    }
  });
}