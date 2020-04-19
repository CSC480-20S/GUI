var token = localStorage['token'];
$(document).ready(function() {
  $.ajax({
    url: 'http://pi.cs.oswego.edu:12100/search?token=' + token,
    dataType: 'json',
    success: function(json) {
      var params = new URLSearchParams(window.location.search.slice());
      console.log(params.get('id'));
      var id = params.get('id');
      var index = 0;
      for (var i = 0; i < json.length; i++) {
        if (json[i].studyID == id) {
          index = i;
          break;
        }
      }
      checkWishlistStatus(id);
      document.getElementById('costInCredits').innerHTML = "Credits: " + json[index].costInCredits;
      document.getElementById('author').innerHTML = "Author: " + json[index].author;
      document.getElementById('abst').innerHTML = json[index].abstract;
      document.getElementById('duration').innerHTML = "Duration of the study: " + json[index].duration + " minutes.";
      document.getElementById('institution').innerHTML = "College: " + json[index].institution;
      document.getElementById('title').innerHTML = json[index].title;
      document.getElementById('purpose').innerHTML = json[index].purpose;
      document.getElementById('responses').innerHTML = "No. of responses: " + json[index].num_responses;
      document.getElementById('stimuli').innerHTML = "No. of stimuli: " + json[index].num_stimuli;
      document.getElementById('studyidPlaceholder').value = id;
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
      var stars = "Rating: ";
      for (i = 0; i < json[index].rating; i++) {
        stars += "<i class='fa fa-star' aria-hidden='true'></i>";
      }
      document.getElementById('stars').innerHTML = stars;
      if (json[index].randomize) {
        document.getElementById('random').innerHTML = "Randomized the study?: Yes";
      } else {
        document.getElementById('random').innerHTML = "Randomized the study?: No";
      }
      if (json[index].reviews.length > 1) {
        var reviews = '<div class="carousel-item active">' +
          '<div class="card">' +
          '<div class="contain">' +
          '<h4><b>' + json[index].reviews[0].name + '</b></h4>';
        reviews += '<div class="review"><div class="toCenter">'
        for (var i = 0; i < json[index].reviews[0].rating; i++) {
          reviews += "<i class='fa fa-star' aria-hidden='true'></i>";
        }
        reviews += '</div></div>';
        reviews += "<p>" + json[index].reviews[0].comment + "</p>"
        reviews += '</div></div></div>';
        for (var i = 1; i < json[index].reviews.length; i++) {
          reviews += '<div class="carousel-item">' +
            '<div class="card">' +
            '<div class="contain">' +
            '<h4><b>' + json[index].reviews[i].name + '</b></h4>';
          reviews += '<div class="review"><div class="toCenter">'
          for (var j = 0; j < json[index].reviews[i].rating; j++) {
            reviews += "<i class='fa fa-star' aria-hidden='true'></i>";
          }
          reviews += '</div></div>';
          reviews += "<p>" + json[index].reviews[i].comment + "</p>"
          reviews += '</div></div></div>';
        }
        reviews += '<div class="carousel-item">' +
          '<div class="card">' +
          '<div class="contain">' +
          '<h4><b>' + json[index].reviews[0].name + '</b></h4>';
        reviews += '<div class="review"><div class="toCenter">'
        for (var j = 0; j < json[index].reviews[0].rating; j++) {
          reviews += "<i class='fa fa-star' aria-hidden='true'></i>";
        }
        reviews += '</div></div>';
        reviews += "<p>" + json[index].reviews[0].comment + "</p>"
        reviews += '</div></div></div>';
        document.getElementById('reviews').innerHTML = reviews;
      }
    }
  });
});



function checkWishlistStatus(id) {
  var feedback_data = '{}';
  const dataToSend = JSON.parse(feedback_data);
  dataToSend.study_id = id;
  var urlSend = 'http://pi.cs.oswego.edu:12100/isWishlisted?token=' + token;
  $.ajax({
    url: urlSend,
    type: 'GET',
    data: dataToSend,

    success: function(data) {
      if (data == true) {
        document.getElementById("wishlistIcon").classList.add("orange_icon");
      } else {
        console.log("This isn't wishlisted.");
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }
  });

  console.log("%j", urlSend);
}

/* function that toggles the wishlist icon color */
function bookmarkWishList() {
  if (document.getElementById("wishlistIcon").classList.contains("orange_icon")) {
    console.log("Turn it off");
    document.getElementById("wishlistIcon").classList.remove("orange_icon");
    removeFromWishlist();
  } else {
    console.log("It's off, turning it on now.");
    document.getElementById("wishlistIcon").classList.add("orange_icon");
    sendData();
  }
}



//------------------------- DATA SEND TO SERVER -----------------
function sendData() {
  var feedback_data = '{}';
  const dataToSend = JSON.parse(feedback_data);
  dataToSend.study_id = document.getElementById("studyidPlaceholder").value;
  var urlSend = 'http://pi.cs.oswego.edu:12100/addWishlist?token=' + token;
  $.ajax({
    url: urlSend,
    type: 'GET',
    data: dataToSend,

    success: function(data) {
      console.log("Added to wishlist.")
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }

  });

  console.log("%j", urlSend);
}

function removeFromWishlist() {
  var feedback_data = '{}';
  const dataToSend = JSON.parse(feedback_data);
  dataToSend.study_id = document.getElementById("studyidPlaceholder").value;
  var urlSend = 'http://pi.cs.oswego.edu:12100/removeWishlist?token=' + token;
  $.ajax({
    url: urlSend,
    type: 'GET',
    data: dataToSend,


    success: function(data) {
      console.log("Removed from wishlist.")
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }

  });
}

//Turns on the overlay when a user purchases a study
function buyOverlay() {
  document.getElementById("overlay_buy").style.display = "block";
  var params = new URLSearchParams(window.location.search.slice());
  console.log(params.get('id'));
  var id = params.get('id');
  var urlSend = 'http://pi.cs.oswego.edu:12100/purchase?study_id='+id+'&credits_available=1000&token=' + token;
  $.ajax({
    url: urlSend,
    type: 'GET',
    success: function(data) {
      console.log("Study purchased.")
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }

  });
}

function off() {
  //Removes the overlay so that it isn't displayed
  document.getElementById("overlay_buy").style.display = "none";
  //Redirect to home page
  window.location.href = "home.html";
}
