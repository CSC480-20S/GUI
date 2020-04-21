var currentTab = 0;
showTab(currentTab);
//when button is pushed tab is updated.
/*
function fileFunction() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "file");
  document.body.appendChild(x);
}
*/

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    //Remove old keywords being displayed from preview page if user decides to go back and edit them
    $("#keywordlist").empty();

  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (n == (x.length - 4)) {

    //Split keywords by ',' and display keywords on preview page
    var keywordsPrev = document.getElementById("keywords").value;
    var array = keywordsPrev.split(",");


    for (var i = 0; i < array.length; i++) {
      var node = document.createElement("button");
      var textnode = document.createTextNode(array[i]);
      node.id = "outputKeywords";
      node.className = "pill";
      node.append(textnode);
      document.getElementById("keywordlist").append(node);
    }

  }
  
  if (n == (x.length - 1)) {
    //If on the last page on upload (preview), change the next button to Submit.
    document.getElementById("nextBtn").innerHTML = "Submit";
    var pb = document.getElementById("nextBtn");
    pb.id = "publishBtn";
    document.getElementById("publishBtn").setAttribute("onClick", "upload()");
    document.getElementById("publishBtn").setAttribute("method", "post");

    document.getElementById("prevBtn").setAttribute("onClick", "buttonChange()");

    // Sets preview page information
    var titlePrev = document.getElementById("title").value;
    var purposePrev = document.getElementById("purpose").value;
    var categoryPrev = document.getElementById("categories").value;
    var stimPrev = document.getElementById("num_stimuli").value;
    var durPrev = document.getElementById("duration").value;
    var respPrev = document.getElementById("num_responses").value;
    var trialPrev = document.getElementById("num_trials").value;
    var randomPrev = document.getElementById("randomize").value;
    var abstractPrev = document.getElementById("abstractText").value;
    document.getElementById("outputTitle").innerText = titlePrev;
    document.getElementById("outputPurpose").innerText = purposePrev;
    document.getElementById("outputCategory").innerText = categoryPrev;
    document.getElementById("outputNumStim").innerText = stimPrev;
    document.getElementById("outputDuration").innerText = durPrev;
    document.getElementById("outputNumResp").innerText = respPrev;
    document.getElementById("outputTrial").innerText = trialPrev;
    document.getElementById("outputRand").innerText = randomPrev;
    document.getElementById("outputAbstract").innerText = abstractPrev;
    // End of preview page information

  }


  //update progress bar
  indicator(n)
}

//If user goes back to change information, revert "Submit" button back to "Next"
function buttonChange() {
  nextPrev(-1);
  document.getElementById("publishBtn").innerHTML = "Next";
  var pbToNext = document.getElementById("publishBtn");
  pbToNext.id = "nextBtn";
  document.getElementById("nextBtn").setAttribute("onClick", "nextPrev(1)");
  document.getElementById("prevBtn").setAttribute("onClick", "nextPrev(-1)");
}

// Updates the value n based on which section of the upload they're on. 
function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("msform").submit();
    return false;
  }
  showTab(currentTab);
}
//Check if section is empty
//can later be redeveloped to check if this is an authenticated user?
function validateForm() {
  var x, y, i, z, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("textarea");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = true;
    }
  }
  for (i = 0; i < z.length; i++) {
    if (z[i].value == "") {
      z[i].className += " invalid";
      valid = true;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}
//This is for the progressbar. Based on the value n, either highlight or remove the highlight of the progress bar.
function indicator(n) {
  var x = document.getElementsByClassName("step");
  for (i = x.length - 1; i >= n; i--) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}
