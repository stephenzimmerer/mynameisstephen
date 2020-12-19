var shareddatabase = firebase.database();

var database_refname = "simplechat-dev-dt"

$(document).ready(function() {

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
  	name: $("#nameInput").val(),
  	text: $( "#history option:selected" ).text()
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

    $(".chatcontainer").append(`<div>${ data[d]['name'] } : ${ data[d]['text'] } </div>`);

	}


  });


});
