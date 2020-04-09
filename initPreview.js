$(document).ready(function() {
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/studyPreview',
    dataType: 'json',
    success: function(json) {
      var params = new URLSearchParams(window.location.search.slice());
      console.log(params.get('id'));
      var id = params.get('id');
      var index = 0;
      for (var i = 0; i < json.length; i++){
        if (json[i].studyID == id){
          index = i;
          break;
        }
      }
      document.getElementById('costInCredits').innerHTML = "Credits: $" + json[index].costInCredits;
      document.getElementById('author').innerHTML = "Author: " + json[index].author;
      document.getElementById('abst').innerHTML = json[index].abstract;
      document.getElementById('duration').innerHTML = "Duration of the study: " + json[index].duration + " minutes.";
      document.getElementById('institution').innerHTML = "College: " + json[index].institution;
      document.getElementById('title').innerHTML = json[index].title;
      document.getElementById('purpose').innerHTML = json[index].purpose;
      document.getElementById('responses').innerHTML = "No. of responses: " + json[index].num_responses;
      document.getElementById('stimuli').innerHTML = "No. of stimuli: " + json[index].num_stimuli;
      var categories = "Categories: ";
      for (i = 0; i < json[index].categories.length; i++) {
        categories += "<button class='pill'>" + json[index].categories[i] + "</button>";
      }
      document.getElementById('categories').innerHTML = categories;
      var keywords = "Keywords: ";
      for (i = 0; i < json[index].keywords.length; i++) {
        keywords += "<button class='pill'>" + json[index].keywords[i] + "</button>";
      }
      document.getElementById('keywords').innerHTML = keywords;
      var stars = "Rating: "
      for (i = 0; i < json[index].rating; i++) {
        stars += "<i class='fa fa-star' aria-hidden='true'></i>";
      }
      document.getElementById('stars').innerHTML = stars;
      if (json[index].randomize) {
        document.getElementById('random').innerHTML = "Randomized the study?: Yes";
      } else {
        document.getElementById('random').innerHTML = "Randomized the study?: No";
      }
    }
  });
});
