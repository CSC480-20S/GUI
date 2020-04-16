function on() {
  document.getElementById("overlay").style.display = "block";
  sendData();
}

function off() {

  document.getElementById("overlay").style.display = "none";
  window.location.href="home.html";
}

var feedback_data = {token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODY5MDI4NjcsImV4cCI6MTU5MTIyNjQ2Nywic3ViIjoiMTIzNCJ9.PL-MpXC3kogsCozfWzzDTR1ix18ECcVf_sO2oxSmBuM'};
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
    url: 'http://pi.cs.oswego.edu:12100/reviewPending',
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
