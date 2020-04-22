//Get token from local storage
var token = localStorage['token'];

//------------------------- IDENTIFY ID of FORM ---------------------------
//ID of current study
var id_input = "";
//Function to set value for variable id_input
function setInputId(x) {
  window.id_input = x;
}
//Function to get value for variable id_input
function getInputId() {
  return window.id_input;
}
//------------------------- INSTRUCTION FORM ---------------------------
//Function to open the instruction form to guide admins how to Approve or Disapprove User-Submitted Studies
function openInstruction() {
  document.getElementById("instruction").style.display = "block";
}
//Function to close the instruction form to guide admins how to Approve or Disapprove User-Submitted Studies
function off_instruction() {
  document.getElementById("instruction").style.display = "none";
}

//Function to toggle the comment of each field
//If there is no comment set, the system will display comment form allowing admins to add their comment to announce users that why this field is not suitable
//If the comment is set before, the system will display the form announcing that comment is deleted
function changeCheck(x, y) {
  x.classList.toggle("fa-times-circle-o");
  x.classList.toggle("orange_close");
  if (document.getElementById(y).innerHTML) {
    openCancelForm(y);
  } else {
    openCommentForm(y);
  }
}
//------------------------- COMMENT FORM ---------------------------
//Function to open Comment form allowing admins to add their comment
function openCommentForm(y) {
  setInputId(y);
  document.getElementById("comment").style.display = "block";
}
//Function to close Comment form
function off_comment() {
  if (!document.getElementById("input-comment").value) {
    document.getElementById("message-comment").innerHTML = "Comment is required";
    return;
  }
  var x = getInputId();
  setInputId("");
  document.getElementById("comment").style.display = "none";
  var comment = document.getElementById("input-comment").value;
  document.getElementById(x).innerHTML = comment;
  document.getElementById("input-comment").value = "";
}

//------------------------- CANCEL FORM ---------------------------
//Function to open Cancel form announcing that the comment is removed
function openCancelForm(y) {
  setInputId(y);
  document.getElementById("cancel").style.display = "block";
}
//Function to close Cancel form
function off_cancel() {
  var x = getInputId();
  setInputId("");
  document.getElementById(x).innerHTML = "";
  document.getElementById("cancel").style.display = "none";
}

//------------------------- PREVIEW ---------------------------
//Function to update the preview the review information in last stage before submitting
function updatePreview() {
  var fields_id = ["title_feedback", "reference_feedback", "purpose_feedback", "categories_feedback", "keywords_feedback", "abstract_feedback", "stimuli_feedback", "duration_feedback", "response_feedback", "trials_feedback", "randomized_feedback", "image_videos_feedback", "jsons_feedback"];
  var fields_name = ["Title", "Reference", "Purpose", "Categories", "Keywords", "Abstract", "Stimuli", "Duration", "Response", "Trials", "Randomized", "Images/Videos", "JSON"];
  var preview = "";
  var accept = true;
  for (i = 0; i < fields_id.length; i++) {
    var feedback = document.getElementById(fields_id[i]).innerHTML;
    if (feedback) {
      preview += '<h5 class="fs-subtitle">' + fields_name[i] + ': ' + feedback + '</h5>';
      accept = false;
    }
  }
  if (accept) {
    document.getElementById("preview").innerHTML = '<h5 class="fs-subtitle">No any comment</h5>';
  } else {
    document.getElementById("preview").innerHTML = preview;
  }
}

//Function to move to the next Review page (we have 5 stages)
function nextPrevReview(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("msform").submit();
    return false;
  }
  showTab(currentTab);
  console.log("Update Preview");
  updatePreview();
}

//Function to get the detail information of individual pending study from the server
function getDetailPending(study_id) {
  console.log("Token: ", token);
  $(document).ready(function() {
    $.ajax({
      url: 'http://pi.cs.oswego.edu:12100/getAdminDetails?study_id=' + study_id + '&token=' + window.token,
      dataType: 'json',
      success: function(json) {
        console.log("%j", json);
        document.getElementById("title_value").value = json.title;
        document.getElementById("reference_value").value = json.references;
        document.getElementById("purpose_value").value = json.purpose;
        document.getElementById("categories_value").value = json.categories;
        document.getElementById("subcategories_value").value = json.subcategories;

        var keywords = "";
        for (var i = 0; i < json.keywords.length; i++) {
          if (i != 0) {
            keywords += "; ";
          }
          keywords += json.keywords[i];
        }
        document.getElementById("keywords_value").value = keywords;
        document.getElementById("abstract_value").innerHTML = json.abstract;
        document.getElementById("stimuli_value").value = json.num_stimuli;
        document.getElementById("duration_value").value = json.duration;
        document.getElementById("responses_value").value = json.num_responses;
        document.getElementById("trials_value").value = json.num_trials;
        if (json.randomize) {
          document.getElementById("randomized_yes_value").checked = true;
        } else {
          document.getElementById("randomized_no_value").checked = true;
        }

        //View list of images and videos
        var img = json.images;
        var content = ""
        for (i = 0; i < img.length; i++) {
          content += '<div class="preview_img" style="background-image: url(\'' + img[i] + '\')"></div>'
        }
        document.getElementById("images_videos").innerHTML = content;

        //View list of json files
        document.getElementById("json_files").innerHTML = json.template;;
      }
    });
  });
}
