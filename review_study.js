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
document.getElementById("form_wrapper").innerHTML = window.openInstruction();

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
    var x = getInputId();
    setInputId("");
    if (!document.getElementById("input-comment").value){
      document.getElementById("message-comment").innerHTML="Comment is required";
      return;
    }
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