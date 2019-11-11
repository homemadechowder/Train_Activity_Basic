 // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions

var firebaseConfig = {
        apiKey: "AIzaSyD_GnbDlRayXW3EIdKECBhVBrQSNEh_rhg",
        authDomain: "hello-world-2-e6b58.firebaseapp.com",
        databaseURL: "https://hello-world-2-e6b58.firebaseio.com",
        projectId: "hello-world-2-e6b58",
        storageBucket: "hello-world-2-e6b58.appspot.com",
        messagingSenderId: "799724841835",
        appId: "1:799724841835:web:6b18fa2b649b8f4c6c3a2e",
        measurementId: "G-PYZLS1Z8GT"
      };
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database
    var database = firebase.database();

    var trainName;
    var dest;
    var timeTrain;
    var frequency = 0;
    var currentTime;
    var tMinutesTillTrain;
    
    $(".table").append('<td><strong>Train Name<td><strong>Destination<td><strong>Frequency(mins)<td><strong>Next Arrival<td><strong>Minutes Away');

database.ref().on("value", function(snapshot) {

 
  if (snapshot.child("trainName").exists() && snapshot.child("dest").exists()&& snapshot.child("timeTrain").exists() &&snapshot.child("frequency").exists()) {

    trainName = snapshot.val().trainName;
    dest = snapshot.val().dest;
    timeTrain = snapshot.val().timeTrain;
    frequency = snapshot.val().frequency;


    
    $(".table").append('<tr><td>'+trainName +'<td>'+ dest +'<td>'+ frequency +'<td>'+ timeTrain +'<td>'+tMinutesTillTrain);
  }

 

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
 
  
$("#search").on("click", function(){
    
    event.preventDefault();

   
 

    

    // Time is 3:30 AM
    var firstTime = $("#timeTrain").val();
    console.log(firstTime);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    

    // Current Time
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    trainName = $("#trainName").val();
    dest = $("#dest").val();
    timeTrain = moment(nextTrain).format("hh:mm");  
    frequency = parseInt($("#frequency").val().trim());

    
    database.ref().set({
       
        trainName: trainName,
        dest: dest,
        timeTrain: timeTrain,
        frequency: frequency,
        tMinutesTillTrain: tMinutesTillTrain

    });



 });