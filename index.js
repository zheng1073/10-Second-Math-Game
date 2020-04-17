$(document).ready(function(){
  var totalTime = 10;
  var secondsLeft = totalTime;
  var timeLeft = 10;
  var timer;
  var currentQuestion;
  var NUMBER_LIMIT = 10;
  var score = 0;

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var rand = getRandomInt;

  var chooseFormula = function() {
    var formulaArray = [];

    $('.option-box').each(function(){
      if ($(this).prop('checked')){
        var elementId = $(this).attr('id');
        formulaArray.push(elementId);
      }
    });

    var index = rand(0, formulaArray.length - 1);
    return formulaArray[index];
  }

  var generateQuestion = function(){

    var formula;
    function generateQuestionText(a, b, operator){
      return rand(a, b) + operator + rand(a, b)
    };
    function generateQuestionEval(a, b, operator){
      return rand(a, b) + operator + rand(a, b)
    };

    switch(chooseFormula()){
      case 'addition':
        formula = function additionQuestion(a, b) {
          var question = generateQuestionText(a, b, ' + ');
          return {'information': question,
                  'eval': question};
        };
        break;
      case 'subtraction':
        formula = function subtractionQuestion(a, b) {
          var dividend = 1 + rand(Math.sqrt(a), Math.sqrt(b));
          var denominator = 1 + rand(Math.sqrt(a), Math.sqrt(b));

          var multiple = dividend * denominator;
          return {'information': multiple + ' - ' + denominator,
                  'eval': multiple + '-' + denominator};
        };
        break;
      case 'multiplication':
        formula = function multiplicationQuestion(a, b) {
          var question = generateQuestionText(a, b, ' x ');
          return {'information': question,
                  'eval': question.replace('x','*')};
        };
        break;
        case 'division':
        formula = function divisionQuestion(a, b) {
          var dividend = 1 + rand(Math.sqrt(a), Math.sqrt(b));
          var denominator = 1 + rand(Math.sqrt(a), Math.sqrt(b));

          var multiple = dividend * denominator;
          return {'information': multiple + ' / ' + denominator,
                  'eval': multiple + '/' + denominator};
        };
        break;
    }
    return formula(1,NUMBER_LIMIT)
  };

  var makeNewQuestion = function(){
    var question = generateQuestion();
    $('#question').text(question.information);
    return question;
  };

  currentQuestion = makeNewQuestion();

  var resetTimer = function(){
    timer = setInterval(function(){
      secondsLeft = Number(secondsLeft) - 1;
      $('#clock').text(secondsLeft);
      // Check if game is over
      if (secondsLeft == 0){
        clearInterval(timer);
        secondsLeft = 10;
        updateScore(-score);

      }
    }, 1000)
  };



  var getNewTime = function(){
    var oldTime = secondsLeft;
    var newTime = oldTime + 1;
    secondsLeft = newTime;
  };


  $('#answer').keyup(function(){
    if ($('#answer').val() == eval(currentQuestion.eval)){
      window.clearInterval(timer);
      getNewTime();
      $('#clock').text(secondsLeft);
      currentQuestion = makeNewQuestion();
      $('#answer').val('');
      updateScore(+1);
      resetTimer();
    }
  })

});
