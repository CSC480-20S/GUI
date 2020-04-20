var token = localStorage['token'];
//Retireve user-entered information from the form and convert it to a JSON.
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

//Converts image uploaded to Base64 String
function encodeImageFileAsURL() {

  var filesSelected = document.getElementById("images").files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64

      var newImage = document.createElement('img');
      newImage.src = srcData;

      document.getElementById("outputImg").innerHTML = srcData;
      console.log("Converted Base64 version is " + srcData);
      document.getElementById("imagePreview").src = srcData;

    }
    var base64result = fileReader.readAsDataURL(fileToLoad);
  }
}

function upload() {
  if (!document.getElementById("subcategory").value ||
    !document.getElementById("title").value ||
    !document.getElementById("references").value ||
    !document.getElementById("purpose").value ||
    !document.getElementById("keywords").value ||
    !document.getElementById("abstractText").value ||
    !document.getElementById("num_stimuli").value ||
    !document.getElementById("duration").value ||
    !document.getElementById("num_responses").value ||
    !document.getElementById("num_trials").value ||
    !document.getElementById("randomize").value ||
    !document.getElementById("outputImg").innerHTML ||
    !document.getElementById("user_json_document").value) {
    document.getElementById("overlay_error").style.display = "block";
    return;
  }
  //Toggle the overlay ("Congratulations, study uploaded.")
  document.getElementById("overlay").style.display = "block";

  //Fill in missing Javascript Object fields in order to send it to the server without error.
  var jsonFromForm = JSON.stringify($('form').serializeObject());
  const jsonToUpload = JSON.parse(jsonFromForm);
  var keywordString = document.getElementById("keywords").value;
  var keywordArray = keywordString.split(",");
  jsonToUpload.keywords = keywordArray;
  jsonToUpload.author = "null";
  jsonToUpload.author_id = "null";
  jsonToUpload.images = document.getElementById("outputImg").innerHTML;
  jsonToUpload.template = document.getElementById("user_json_document").value;
  jsonToUpload.institution = "null";
  jsonToUpload.costInCredits = 20;
  jsonToUpload.num_stimuli = Number(jsonToUpload.num_stimuli);
  jsonToUpload.num_trials = Number(jsonToUpload.num_trials);
  jsonToUpload.num_responses = Number(jsonToUpload.num_responses);
  jsonToUpload.randomize = Boolean(jsonToUpload.randomize);
  jsonToUpload.duration = Number(jsonToUpload.duration);
  console.log(jsonToUpload);

  //Send the JSON to the database
  $('form').submit(function() {
    $.ajax({
      url: 'http://pi.cs.oswego.edu:12100/upload?token=' + token,
      type: 'POST',
      data: JSON.stringify(jsonToUpload),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {},
    });
  });
}

function off() {
  //Removes the overlay so that it isn't displayed
  document.getElementById("overlay").style.display = "none";
  //Redirect to home page
  window.location.href = "home.html";
}

function off_error() {
  //Removes the overlay so that it isn't displayed
  document.getElementById("overlay_error").style.display = "none";
}
