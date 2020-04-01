$(document).ready(function () {
    $.ajax({
      url: 'http://pi.cs.oswego.edu:12100/studyPreview',
      dataType: 'json',
      success: function (json) {
        console.log("%j", json);
        var mainContainer = document.getElementById("myData");
        for (var i = 0; i < json.length; i++) {
          var div = document.createElement("div");
          /*var tester = json[i].studyID;*/
          
            div.innerHTML =
            '<div class="card"><div class="card_info"><p class="study_title">' + json[i].title + '</p>' +
            '<p class="study_description">' + json[i].purpose + '</p>' +
            '<div class="author"><img class="author_icon" src="assets/school.svg" alt="author icon">' +
              '<p class="author_name">'+ json[i].author + '</p>' +
            '</div>' + 
            '<div class="university"><img class="university_icon" src="assets/university.svg" alt="university icon">' +
            '<p class="university_name">'+ json[i].institution + '</p>' +
          '</div>' + '</div>' +
            /*'<b>Name: </b>' + json[i].author +
            '<br><b> Category: </b>' + json[i].categories +
            
            '<b> <br> Duration: </b >' + json[i].duration +
            '<b> <br> Institution: </b >' + json[i].institution +
*/
            '<p class="credits">' + json[i].costInCredits + ' Credits' + '</p>' +
            '</div>';
            mainContainer.appendChild(div);
            
           /*
           str += '<div class="item-details">' + 
						'Title is = ' + json[i].title + '<br />' +
						'Author: ' + json[i].author + '<br />' +
						'Categories = ' + json[i].categories + '<br />' +
                        '</div>';
                        */

          
          
        }
      }
    });
  });