  
// Variable to hold the index of current question.
var questionIndex = 0;

//Variable to hold the answer right or wrong
var count = 0;

//Images array
var images = ["assets/images/q1.gif", "assets/images/q2.gif", "assets/images/q3.gif","assets/images/q4.gif" ];

//Variable to hold the total correct
var correctq = 0;

//Variable to hold the total incorrect
var incorrect = 0;

//Variable to hold the total correct for all rounds
var totalCorrect = 0;

//Variable to hold the total incorrect for all rounds
var totalIncorrect = 0;

//Variable to hold how many rounds played
var rounds = 0;

//Questions Array- D is always the correct answer, but "D" is hidded from user
var questions = [
  { q: "Who said, that's no moon-it's a space station?", a: "Luke Skywalker", b: "C-3P0", c: "Han Solo", d: "Obi-Wan Kenobi" },
  { q: "Where did Luke Skywalker bull's-eye womp rats?", a: "Ben's Mesa", b: "Mushroom Flats", c: "Hutt Flats", d: "Beggar's Canyon" },
  {q: "What is the name of Darth Vader's Star Destroyer?", a: "The Avenger", b: "The Stalker", c: "The Imperial", d: "The Executor" },
  {q: "What creature did Luke Skywalker kill in Jabba the Hutt's palace?", a: "Gorax", b: "Worrt", c: "Sarlacc", d: "Rancor" }
];

//Function thats runs everything
function doItAll() {

  //Variable that holds the start time of 30 Seconds
  var number = 30;
  
  //Variable that will hold our setInterval that runs the questtion timer
  var intervalId;

  //Button to start the game
  $("#start").click(function(){

    $(".score").hide();
    
    //Shows the timer
    $("#show-number").show();
    
    //Hides the start button after clicked
    $('#start').hide();

    //Sets the variable used for the timer to 30 Seconds
    number = 30;

    //Display a new 30 seconds for the next question
    $("#show-number").html("<h2>" + "Time Remaining: " + number + " Seconds" + "</h2>");
    
    //Unhide the divs that display the question and answers
    $(".answercard").show();
    $(".questioncard").show();
  
    //Runs the function
    run();

    //Hide the divs that only show during the answer reveal
    $(".guesscard1").hide();
    $(".guesscard2").hide();
    $(".guesscard").hide();
    $(".answerimg").hide();

    //Function to run the game
    function run() {
    
      //Prevents speeding up with each round
      clearInterval(intervalId);
      
      //Sets intervalId to the decrement function a second at a time
      intervalId = setInterval(decrement, 1000);

      //Randomize the order of the answer divs
      var cards = $(".answercard");
      for(var i = 0; i < cards.length; i++){
        var target = Math.floor(Math.random() * cards.length -1) + 1;
        var target2 = Math.floor(Math.random() * cards.length -1) +1;
        cards.eq(target).before(cards.eq(target2));
      }
    
      //If there ire still unanswered questions in the array then render the next question
      if (questionIndex <= (questions.length - 1)) {
        $("#question").html("<h2>" + questions[questionIndex].q + "</h2>");
        $("#answer1").html("<h1>" + questions[questionIndex].a + "</h1>");
        $("#answer2").html("<h1>" + questions[questionIndex].b + "</h1>");
        $("#answer3").html("<h1>" + questions[questionIndex].c + "</h1>");
        $("#answer4").html("<h1>" + questions[questionIndex].d + "</h1>");
      }
      
      // If there aren't, render the end game screen.
      else {
        rounds++;
        $(".answercard").hide();
        $(".guesscard").hide();
        $(".guesscard1").hide();
        $("#show-number").hide();
        $(".score").show();
        $("#question").html("<h1>" + "Game Over!" + "</h1>");
        $("#correct").html("<h1>" + "Total correct this round: " + correctq + "</h1>");
        $("#incorrect").html("<h1>" + "Total incorrec: this round: " + incorrect + "</h1>");
        $("#totalCorrect").html("<h1>" + "Total correct for all rounds: " + totalCorrect + "</h1>");
        $("#totalIncorrect").html("<h1>" + "Total incorrect for all rounds: " + totalIncorrect + "</h1>");
        $("#rounds").html("<h1>" + "Rounds played so far " + rounds + "</h1>");
        stop();
        //shows the start button to restart the game
        questionIndex = 0;
        count = 0;
        $("#question").html("<h2>" + "Click start to restart the game!" + "</h2>");
        $("#start").show();
        correctq = 0;
        incorrect = 0;
      }
    }
  
    //Function to decrement the timer
    function decrement() {

      //Decrements the timer value
      number--;
    
      //Displays the time remaining
      $("#show-number").html("<h2>" + "Time Remaining: " + number + " Seconds" + "</h2>");

      //Ends the count down at 0
      if (number === 0) {
        timeup();
        stop();
      }
    }

    //Function to stop the counter
    function stop() {
      //Clears the intervalId  
      clearInterval(intervalId);
      $(".answercard").hide();
    }
    
    //Click function for the correct answer no matter which order it is in
    $(".answercard").click(function(){
      stop();
    });

  });

  //Function that gets called if the answer chosen was correct
  function correct(){
    $(".guesscard").show();
    $(".answercard").hide();
    $(".questioncard").hide();
    $("#guess").html("<h1>" + "Correct!" + "</h1>");
    $(".answerimg").show();
    $(".answerimg").show();
    $("#answerimage").html("<img src=" + images[count] + " width='400px'>");

    correctq ++;
    totalCorrect ++;

    //Timer for after answering
    setTimeout(fiveSeconds,3000);
  }

  //Function that gets called if the answer chosen is wrong
  function wrong(){
    $(".guesscard1").show();
    $(".guesscard2").show();
    $(".answercard").hide();
    $(".questioncard").hide();
    $("#guess1").html("<h1>" + "Incorrect!" + "</h1>");
    $("#guess2").html("<h1>" + "The Correct answer was: " + questions[questionIndex].d + "</h1>");
    $(".answerimg").show();
    $(".answerimg").show();
    $("#answerimage").html("<img src=" + images[count] + " width='400px'>");

    incorrect ++;
    totalIncorrect ++;
    
    //Timer for after answering
    setTimeout(fiveSeconds,3000);
  }

    //Function that gets called if the answer chosen is wrong
    function timeup(){
      $(".guesscard1").show();
      $(".guesscard2").show();
      $(".answercard").hide();
      $(".questioncard").hide();
      $("#guess1").html("<h1>" + "Time is up!" + "</h1>");
      $("#guess2").html("<h1>" + "The Correct answer was: " + questions[questionIndex].d + "</h1>");
      $(".answerimg").show();
      $(".answerimg").show();
      $("#answerimage").html("<img src=" + images[count] + " width='400px'>");
      
      //Timer for after answering
      setTimeout(fiveSeconds,3000);
    }
  
  //Click function for the correct answer no matter which order it is in
  $("#answer4").click(function(){
    correct();
    stop();
  });
  
  //Click function for the correct answer no matter which order it is in
  $("#answer1").click(function(){
    wrong();
    stop();
  });
  
  //Click function for the correct answer no matter which order it is in
  $("#answer2").click(function(){
    wrong();
    stop();
  });
  
  //Click function for the correct answer no matter which order it is in
  $("#answer3").click(function(){
    wrong();
    stop();
  });
}

//Function to start the next round and act as if start was clicked
function fiveSeconds() {
  count++;
  questionIndex++;
  $("#start").trigger('click');
}
