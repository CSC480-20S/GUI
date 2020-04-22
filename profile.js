var token = localStorage['token'];
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myDropdown() {
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

//Function to get the list pending studies from server
function getListPendingStudies() {
  var limit = '2';
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/getPending?token=' + token + '&limit=' + limit,
    dataType: 'json',
    success: function(json) {
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

//Gets all of the notifications for a user and displays them on the page via the notifications panel.
function getNotifications() {
  var limit = '2';
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/getNotifications?token=' + token,
    dataType: 'json',
    success: function(json) {
      console.log("%j", json);
      var content = "";
      for (var i = 0; i < json.length; i++) {
        content +=
          '<a class="study_link">' +
          '<div class="study_wrapper">' +
          '<div>' + json[i].title + '</div>' +
          '<div>' + json[i].timestamp + '</div>';
        if (json[i].type == "Approval") {
          content += '<div>Approved</div>';
        } else if(json[i].type == "Denial"){
          content += '<div>Denied</div>';
        }else{
          content += '<div>'+  json[i].type +'</div>';
        }
        content += '<div>' + json[i].body + '</div>';
        content += '</div>' +
          '</a>';
      }
      document.getElementById("notificationsList").innerHTML = content;
    }
  });
}
