function on() {
  document.getElementById("overlay").style.display = "block";
  sendData();
}

function off() {
  
  document.getElementById("overlay").style.display = "none";
  window.location.href="home.html";  
}

var feedback_data = {token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODYwMjc4MTUsImV4cCI6MTU5MDM1MTQxNSwic3ViIjoiMTIzNDUifQ.63mgTcstXa20HSMJ117CI2S_MHxEyKDK5ZUqpfvbhF0'};
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