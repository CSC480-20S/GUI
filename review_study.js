function openCommentForm() {
    document.getElementById("overlay").style.display = "block";
}

function openInstruction() {
    document.getElementById("instruction").style.display = "block";
}

document.getElementById("form_wrapper").innerHTML = window.openInstruction();