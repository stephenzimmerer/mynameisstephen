var shareddatabase = firebase.database();

var database_refname = "simplechat-dev-dt"





// Initialize variables - begin here login page
$(function() {

  /*
var $loginPage = $(".login.page"); // The login page
var $chatPage = $(".chat.page"); // The chatroom page

// Prompt for setting a username
var username;
var connected = false;
var typing = false;
var lastTypingTime;
var $currentInput = $usernameInput.focus();

var socket = io();
*/

// Sets the client's username
function setUsername() {
  username = cleanInput($usernameInput.val().trim());

  // If the username is valid
  if (username) {
    $loginPage.fadeOut();
    $chatPage.show();
    $loginPage.off("click");
    $currentInput = $inputMessage.focus();

    // Tell the server your username
    socket.emit("add user", username);
  }
}
// End here new edits

})



$("#usernameInput").on("keyup", function(event) {
  if (event.keyCode === 13) {
//    setUsername();
    $("#login").fadeOut(1000);
    $("#chatpage").fadeIn(1000);
  }
});

$("#pressplay").click(function() {
    $("#video").fadeIn(1000);
  })


$(document).ready(function() {





  // grab the vimeo embed code and the vimeo player and know how to reference it as 'player'
  var iframe = document.querySelector('iframe');
  var player = new Vimeo.Player(iframe);



  player.on('play', function() {
    //when player is played... run this
      console.log('played the video!');
  });



  $("#pressplay").click(function() {
    console.log("clicked anywhere")
    player.play();
    player.setVolume(1);
  });



  // get contents of file, and then....
  fetch('searchhistory.txt')
  // get the response ("did it work?") and then..
  .then(response => response.text())
  // get the actual text, and then...
  .then(function (text) {
    // do something with the text here.

    var data = text.split("\n");

    for (d in data) {
      console.log(data[d]);
      $("#history").append(`<option>${ data[d] } </option>`);
  //    <option>winter shoes</option>

    }

  })



  // when we click on it, change the database
  $("#submitText").click(submitText);

  function submitText() {
	var data = {
  	name: $("#usernameInput").val(),
  	text: $( "#history option:selected" ).text() + $( "#punctuation option:selected" ).text()
	};

	shareddatabase.ref(database_refname).push(data); // cchat
	// shareddatazbase.ref(database_refname).set(data); // set a single value
  }

  var chatlimit = 1000;

  // when the database changes, change the website
  shareddatabase.ref(database_refname).on("value", function(snapshot) {
	var data = snapshot.val();

	for (d in data) {

  	console.log(d);

    $(".chatcontainer").append(`<div>${ data[d]['name'] }: ${ data[d]['text'] } </div>`);

	}


  });


});
