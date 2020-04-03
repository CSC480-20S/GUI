//------------------------- IDENTIFY ID of FORM ---------------------------
var id_input = "";
function setInputId(x){
    window.id_input = x;
}
function getInputId(){
    return window.id_input;
}
//------------------------- INSTRUCTION FORM ---------------------------
function openInstruction() {
    document.getElementById("instruction").style.display = "block";
}
function off_instruction() {
    document.getElementById("instruction").style.display = "none";
}

//------------------------- COMMENT FORM ---------------------------
function changeCheck(x,y) {
    //console.log("changeCheck:"+y);
    x.classList.toggle("fa-times-circle-o");
    x.classList.toggle("orange_close");
    if (document.getElementById(y).innerHTML){
        openCancelForm(y);
    }
    else{   
        openCommentForm(y);
    }
}
function openCommentForm(y) {
    setInputId(y);
    document.getElementById("comment").style.display = "block";
}

function off_comment() {
    if (!document.getElementById("input-comment").value){
      document.getElementById("message-comment").innerHTML="Comment is required";
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
function openCancelForm(y) {
    setInputId(y);
    document.getElementById("cancel").style.display = "block";
}

function off_cancel() {
    var x = getInputId();
    setInputId("");
    document.getElementById(x).innerHTML = "";
    document.getElementById("cancel").style.display = "none";
}

//------------------------- PREVIEW ---------------------------
function updatePreview(){
    var fields_id = ["title_feedback","reference_feedback","purpose_feedback","categories_feedback","keywords_feedback","abstract_feedback","stimuli_feedback","duration_feedback","response_feedback","trials_feedback","randomized_feedback","image_videos_feedback","jsons_feedback"];
    var fields_name = ["Title","Reference","Purpose","Categories","Keywords","Abstract","Stimuli","Duration","Response","Trials","Randomized","Images/Videos","JSON"];
    var preview = "";
    var accept = true;
    for (i = 0; i < fields_id.length; i++) {
        var feedback = document.getElementById(fields_id[i]).innerHTML;
        if (feedback){
            preview += '<h5 class="fs-subtitle">'+fields_name[i]+': '+feedback+'</h5>';
            accept = false;       
        }
    }
    if (accept){
        document.getElementById("preview").innerHTML = '<h5 class="fs-subtitle">No any comment</h5>';
    }
    else{
        document.getElementById("preview").innerHTML = preview;
    }
}

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