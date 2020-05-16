'use strict';


// the array holding the questions and answers as objects
let quizQs = [
    {
		id:1,
		question: 'Who is responsible for Fry going into the future?',
		answer:['Nibbler','Mr. Panucci','Fry himself','Al Gore'], 
		correctAnswer: 'Nibbler'   
		},
		{
      id: 2,
		question: 'Who is the disliked coworker at Planet Express?',
		answer:[ 'Zoidberg','Leela','Amy','The Professor'],
		correctAnswer: 'Zoidberg' 
		 },
		 {
       id: 3,
		question: 'How many seasons are there?',
		answer:[ 6,3,10,7],
		correctAnswer: 10  
		 },
		 {
       id: 4,
		question: "What was Fry's job in 1999 (first episode)?",
		answer: ['Delivery Boy','Dentist','Dishwasher','Narwhale Caretaker'],
		correctAnswer: 'Delivery Boy'   
		 },
		 {
       id: 5,
		question: 'How did Fry meet Bender in the first episode?',
		answer:[ 'Suicide Booth','Bar','Bathroom','Sewer'],
		correctAnswer: 'Suicide Booth'   
		 },
		{
			id: 6,
		question:'How did Kif get pregnant?',
		answer: ['Fell in love and touched Fry.',
		'Fell in love and touched Amy.',
		'Fell in love and touched Leela.',
		'Fell in love and touched the toilet seat.'],
		correctAnswer: 'Fell in love and touched Leela.'
		},
		 {
       id: 7,
		question:'What is Leela?',
		answer:[ 'Mutant','Human','Alien','A robot'],
		correctAnswer: 'Mutant', 
		},
		{
      id: 8,
		question:`How long has Amy been a “intern” at Planet Express?`,
		answer:[ '12 years','4 years','6 months','9 years'],
		correctAnswer: '12 years' 
		}
];

// questions counter counts which question you're on
let current = 0;


function startQuiz() {
  // begin quiz, hide start page, show question page
  $('#start_page').on('click', '.button', event => {
    $('#start_page').addClass('hidden');
    $('#question_pg').removeClass('hidden');
    $('#submit-answer').removeClass('hidden');
  });
}

function questions() {
  // pgenerate questions and answers and put on the html
  const answer1 = `${quizQs[current].answer[0]}`;
  const answer2 = `${quizQs[current].answer[1]}`;
  const answer3 = `${quizQs[current].answer[2]}`;
  const answer4 = `${quizQs[current].answer[3]}`;
  const questionTxt = `<legend>${current+1}/8: ${quizQs[current].question}<legend>`;
  const answersTxt = 
  `<input type='radio' name='option' class='radio-buttons' id='answer1' value='${answer1}'><label for='answer1'>${answer1}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer2' value='${answer2}'><label for='answer2'>${answer2}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer3' value='${answer3}'><label for='answer3'>${answer3}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer4' value='${answer4}'><label for='answer4'>${answer4}</label><br>`;
  $('.question').html(questionTxt);
  $('.answers').html(answersTxt);
	submitButton();
// couldn't get this code to generate once on the question page 
//  $('#question').append(`<div><legend>${questions[0].id}/8: ${questions[0].question}<legend></div>`);
//  questions[0].answer.forEach((ans, id) => {
//  $('#answers').append(`<input type='radio' name='option' id='${id}' value='${ans}' class='radio-buttons'><label for='answer1'>${ans}</label><br>`);
//  });
//  enableSubmitButton();
// }
}	

function submitButton() {
  // removes the disabled attribute once user's answer has been picked 
  $('input[name=option]').on('click', function(event) {
    $('#submit-answer').removeClass('disabled').removeAttr('disabled');
  });
}
    
function submitQuizAnswer() {
  // submit answers, disables radio buttons
  $('#submit-answer').click(function(event) {
    event.preventDefault();
    evaluateAnswers();
    $('#submit-answer').addClass('hidden');
    $('#next-question').removeClass('hidden');
    $('input[type=radio]').attr('disabled', true);
  });
}

let userScore = {
  correct: 0,
  incorrect: 0,
};

function evaluateAnswers() {
  //check for correct answers and display results,
  let radioValue = $('input[name=option]:checked').val();
  if (radioValue == quizQs[current].correctAnswer) {
    userScore.correct++;
    $('#feedbackcorrect').removeClass('hidden');
  } else {
    userScore.incorrect++;
    getCorrectAnswer();
		$('#feedbackincorrect').removeClass('hidden');
	}
	// display updated score
  $('.results-counter').html(`<p>Correct: ${userScore.correct} | Incorrect: ${userScore.incorrect}</p>`);
}  
  
function getCorrectAnswer() {
  //incorrect answer text
	let popupAnswerText = `<h3>Wrong! Bite My Shiny Metal Ass! The correct answer is: ${quizQs[current].correctAnswer} </h3><br>
	<img id="crewyelling" src="https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/futurama-bender-leela-fry-terrified-700x394.jpg" alt="futurama crew yelling">`;
	$('#feedbackincorrect').html(popupAnswerText);
} 
      
function nextQ() {
  // go to the next question or show final answer
  $('#next-question').on('click', function(event) {
    if (current < quizQs.length-1) {
      current++;
      questions();
      resetQuestion();
    } else {
      showFinalScore();
    } 
  });
}

function resetQuestion() {
  // reset question and answers, remove results and hide submit and next buttons
  $('input[type=radio]').attr('disabled', false);
  $('#next-question').addClass('hidden');
  $('#submit-answer').removeClass('hidden');
  $('#feedbackcorrect').addClass('hidden');
  $('#feedbackincorrect').addClass('hidden');
  $('#submit-answer').addClass('disabled');
  $('#submit-answer').attr('disabled', 'disabled');
}

function showFinalScore() {
  // hide submit button and show final page with final score
      $('#submit-answer').addClass('hidden');
      $('#final-page').removeClass('hidden');
      $('#question_pg').addClass('hidden');
      let finalScoreText = `<h3>GOOD NEWS EVERYONE! THE QUIZ IS OVER! YOU SCORED: ${userScore.correct} out of 8 questions correctly!</h3>`;
      $('#finalnums').append(finalScoreText);
  }

function restartQ() {
  // when button clicked it takes the user to the start page 
  $('#restart').click(function() {
    location.reload();
  });
}

function launchQuiz() {
  startQuiz();
 	questions();
  submitQuizAnswer();
  nextQ();
  restartQ();
  submitButton();
}

$(launchQuiz);