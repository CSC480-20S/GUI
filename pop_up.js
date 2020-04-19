var comment = "";
var infolist = [];
var rate = 0;
var url_string = window.location.href;
var url = new URL(url_string);
var study_id = "";
var occupy = "";
var token = localStorage['token'];

//Creates cards for all of a users owned studies.
$(document).ready(function () {
    $.ajax({
      url: 'http://pi.cs.oswego.edu:12100/getOwned?&token='+token,
      dataType: 'json',
      success: function (json) {
        var content = "";
    for(var i = 0; i<json.length;i++){
      content += '<div class="card"><div class="card_info">'+
        '<p id="study_title">'+json[i].title+'</p>'+
        '<p id="study_description">'+json[i].purpose+'</p>'+
      '<div class="author">'+
          '<img class="author_icon" src="assets/school.svg" alt="author icon">'+
          '<p id="author_name">'+json[i].author+'</p>'+
       '</div>'+
        '<div class="university">'+
          '<img class="university_icon" src="assets/university.svg" alt="university icon">'+
          '<p id="university_name">'+json[i].institution+'</p></div></div><button class="review" id="reviewbtn" onclick="on()">Review</button></div>';
    }
      document.getElementById("four-panel").innerHTML = content;
    }
  });
});

//Toggles the overlay element to display.
function on() {
  document.getElementById("overlay").style.display = "block";
  sendData();
}

//Toggles the overlay element to stop displaying and redirect to the home page.
function off() {
  document.getElementById("overlay").style.display = "none";
  window.location.replace("home.html");
}

var feedback_data = {token:token};
//------------------------- DATA SEND TO SERVER -----------------
function sendData(){
  var feedback = ["title_feedback","reference_feedback","purpose_feedback","categories_feedback","keywords_feedback","abstract_feedback","stimuli_feedback","duration_feedback","response_feedback","trials_feedback","randomized_feedback","image_videos_feedback","jsons_feedback"];
  var field = ["title","references","purpose","categories","keywords","abstract","num_stimuli","duration","num_responses","num_trials","randomize","images","template"];
  var accept = true;
  for (i = 0; i < feedback.length; i++) {
    var value = document.getElementById(feedback[i]).innerHTML;
    if (value){
      feedback_data[field[i]]=value;
      accept = false;
    }
  }
  var url_string = window.location.href;
  var url = new URL(url_string);
  var study_id = url.searchParams.get("study");
  feedback_data["study_id"]=study_id;
  if (accept){
    feedback_data["approved"]="True";
  }

  //send to server
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/reviewPending&token=' + token,
    type: 'GET',
    data: feedback_data,
    success: function (data) {
      //alert(data);
    },
    error: function (error) {
      //alert(error);
    }
  });

  console.log("%j", feedback_data);
}


//Event listener for when a star is clicked to set a rating.
document.addEventListener('DOMContentLoaded', function(){
	let stars = document.querySelectorAll('.star');
	stars.forEach(function(star){
		star.addEventListener('click', setRating);
    });
});

//Highlights the amount of stars selected.
function setRating(ev){
	let span = ev.currentTarget;
	let stars = document.querySelectorAll('.star');
	let match = false;
	let num = 0;
    stars.forEach(function(star, index){
        if(match){
            star.classList.remove('rated');
            }else{
                star.classList.add('rated');
            }
            if(star === span){
                match = true;
                num = index + 1;
            }
    });
    document.querySelector('.stars').setAttribute('user-rating', num);
	rate = num;
}

//Transition from the rating to the comment overlay.
function next() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("overlay2").style.display = "block";
}

//Transition from comments to the "Thank You" overlay
function nextfinal() {
  document.getElementById("overlay2").style.display = "none";
  document.getElementById("overlay3").style.display = "block";
  comment = document.getElementById("Comments").value;
}

//Ends the rating and redirects to home.
function off() {
  document.getElementById("overlay3").style.display = "none";
  infolist.push(study_id);
  infolist.push(user_id);
  infolist.push(occupy);
  infolist.push(rate);
  infolist.push(comment);
  window.location.href="home.html";
}

//Sends rating to the server through a GET request.
function sendRating(){
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/rateStudy?study_id='+infolist[0]+'&user_id='+infolist[1]+'&occupation='+infolist[2]+'&rating='+infolist[3]+'&comments='+infolist[4]+'&token='+token,
    type: 'GET',
    data: infolist,
    success: function (data) {
		alert(data);
    },
    error: function (error) {
		alert(error);
    }
  });
}
