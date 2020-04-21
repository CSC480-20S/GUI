var comment = "";
var infolist = [];
var rate = 0;
var url_string = window.location.href;
var url = new URL(url_string);
var study_id = 1;
var occupy = "Researcher";
var token = localStorage['token'];
var username = localStorage['username'];

//Prints each study purchased by a user in the Purchased Studies tab on profile.html so they can review them.
$(document).ready(function () {
    $.ajax({
      url: 'http://pi.cs.oswego.edu:12100/getOwned?&token='+token,
      dataType: 'json',
      success: function (json) {
        var content = "";
    for(var i = 0; i<json.length;i++){
      content += '<div class="card"><div class="card_info">'+
        '<p class="study_title">'+json[i].title+'</p>'+
        '<p class="study_description">'+json[i].purpose+'</p>'+
      '<div class="author">'+
          '<img class="author_icon" src="assets/school.svg" alt="author icon">'+
          '<p class="author_name">'+json[i].author+'</p>'+
       '</div>'+
        '<div class="university">'+
          '<img class="university_icon" src="assets/university.svg" alt="university icon">'+
          '<p class="university_name">'+json[i].institution+'</p></div></div><button class="review" id="credits" onclick="on(); reviewOption('+json[i].studyID+');">Review</button></div>';
    }
      document.getElementById("myPurchases").innerHTML = content;
    }
  });
});

//Turns on the overlay for the admin study review and sends the data to the server.
function on() {
  document.getElementById("overlay").style.display = "block";
  sendData();
}

//Stores the id of the study into a variable that is going to be admin reviewed. This is so the study_id can be referrenced in sendData().
function reviewOption(id) {
  study_id = id;
}


var feedback_data = {token:token};
//------------------------- DATA SEND TO SERVER -----------------

//Sends data from the admin study review to the server to either approve/disapprove a study.
function sendData(){
  var feedback = ["title_feedback","reference_feedback","purpose_feedback","categories_feedback","keywords_feedback","abstract_feedback","stimuli_feedback","duration_feedback","response_feedback","trials_feedback","randomized_feedback","image_videos_feedback","jsons_feedback"];
  var field = ["title","references","purpose","categories","keywords","abstract","num_stimuli","duration","num_responses","num_trials","randomize","images","template"];
  var accept = true;
  for (i = 0; i < feedback.length; i++) {
    var value = document.getElementById(feedback[i]).innerHTML;
//If any field isn't approved by the admin, set accept=false so that the JSON sent does not approve the study.
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
    url: 'http://pi.cs.oswego.edu:12100/reviewPending?&token=' + token,
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



document.addEventListener('DOMContentLoaded', function(){
	let stars = document.querySelectorAll('.star');
	stars.forEach(function(star){
		star.addEventListener('click', setRating);
    });
});
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

function next() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("overlay2").style.display = "block";
}

function nextfinal() {
  document.getElementById("overlay2").style.display = "none";
  document.getElementById("overlay3").style.display = "block";
  comment = document.getElementById("Comments").value;
}

function off() {
  document.getElementById("overlay3").style.display = "none";
  infolist.push(study_id);
  infolist.push(occupy);
  infolist.push(rate);
  infolist.push(comment);
  console.log(infolist);
  sendRating(infolist);
}

function sendRating(infolist){
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/rateStudy?study_id='+infolist[0]+'&name='+username+'&occupation='+infolist[1]+'&rating='+infolist[2]+'&comment='+infolist[3]+'&token='+token,
    type: 'post',
  });
}
