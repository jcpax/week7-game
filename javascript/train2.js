		  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyChYzDJMLUhVlFDimWVhtcSFIRY1F-tVrA",
    authDomain: "timesheet-80f1d.firebaseapp.com",
    databaseURL: "https://timesheet-80f1d.firebaseio.com",
    storageBucket: "timesheet-80f1d.appspot.com",
  };
  firebase.initializeApp(config);

$(document).ready(function() {

var database = firebase.database();

var currentTime = moment().format('hh:mm');

$('#newTrain').on('click', function(){

	name = $('#trainNameInput').val().trim();
	destination = $('#destinationInput').val().trim();
	firstTime = $('#startInput').val().trim();
	frequency = $('#frequencyInput').val().trim();

	database.ref().push({
		name: name,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency
	});

	return false;
})

database.ref().on('child_added', function(snapshot){

var firstTrain = moment(snapshot.val().firstTime, 'hh:mm').subtract(1, 'years');
var timeDiff = moment().diff(moment(firstTrain), 'minutes');
var remaining = timeDiff % snapshot.val().frequency;
var trainArrives = snapshot.val().frequency - remaining;
var nextTrain = moment().add(trainArrives, 'minutes');
var minutesAway = moment(trainArrives).format('hh:mm');
 var trainNext = moment(nextTrain).format('hh:mm');

$("#trainTable > tbody").append(
"<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination  + "</td><td>" + snapshot.val().frequency  + "</td><td>" + minutesAway + "</td><td>" +  trainNext + "</td></tr>");

}, function(errorObj){
	alert('Error. Please Try Again.');
})

});




