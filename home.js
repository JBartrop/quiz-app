// document.addEventListener("keydown", function(event) {
//     console.log(`Key pressed: ${event.key}`);
//     // event.key is a string representing which key has been pressed
//   });


//things to note
//array for the question
//start quiz
//then display 
//selecting answer
//then set next questions
//show scroe
//then restart it
//by setting constants to 0;



const questions = [
  {
    question: "where did FRIENDS take place",
    answers:[
      {answer: 'Michigan', correct: false },
      {answer: 'new york', correct: false},
      {answer: 'central park', correct: true},
      {answer: 'philadelphia', correct: false}
    ]
  },
  {
    question: 'who is the hydro dragon genshin',
    answers :[
      {answer: 'zhongli', correct: false},
      {answer: 'neuvillette', correct: true},
      {answer: 'Raiden shogun', correct: false},
      {answer: 'storm terror dragon', correct: false}
    ]
  },{
    question: 'who got Robin in the end in HIMYM',
    answers: [
      {answer: 'Ted',correct: true},
      {answer: 'Barney', correct: false},
      {answer: 'Marshall', correct: false},
      {answer: 'Lilly', correct: false}
    ]
  },
  {
      question: 'who is at war',
      answers: [
        {answer: 'Hamas',correct: true},
        {answer: 'Israel', correct: false},
        {answer: 'Russia', correct: false},
        {answer: 'Ukraine', correct: false}
      ]
  }
]

var answerbtn = document.querySelector('.answers');
var questionbtn = document.querySelector('.questions')
var nextbtn = document.querySelector('.nextbutton')

let currentquestionindex = 0;
let score = 0;


//start quiz
function start(){
  currentquestionindex = 0;
  score = 0;
  nextbtn.innerHTML = 'next';
  showquestions();
}

//taking away the first hard coded one
function resetstate(){
  nextbtn.classList.remove('.active');
  while(answerbtn.firstChild){
    answerbtn.removeChild(answerbtn.firstChild)
  }
};


//displaying the questions
function showquestions(){
  resetstate();
  let currentquestion = questions[currentquestionindex];
  let currentquestionno = currentquestionindex +1;
  questionbtn.innerHTML = currentquestionno + '. ' + currentquestion.question; 

  currentquestion.answers.forEach((ans) => {
    var button = document.createElement('button');
    button.innerHTML = ans.answer;
    button.classList.add('btn');
    answerbtn.appendChild(button);
    if(ans.correct){
      button.dataset.correct = ans.correct
    }
    button.addEventListener('click', selectanswer)
  })
}

//selecting the answer
function selectanswer(event){
  nextbtn.classList.add('active')
  const selectedbtn = event.target;
  const iscorrect = selectedbtn.dataset.correct;
  if(iscorrect === "true"){
    selectedbtn.classList.add('correct')
    score ++;
  }else{
    selectedbtn.classList.add('incorrect')
  }
  //showing righ answer after slecting wrong answer and no clicking again
  Array.from(answerbtn.children).forEach((button) => {
    if(button.dataset.correct === "true"){
      button.classList.add('correct');
    }
    button.disabled = "true"
  })
  console.log(selectedbtn)
}

//implementing the next
nextbtn.addEventListener('click', () => {
  if(currentquestionindex < questions.length){
    handlenext()
  }else{
    start()
  }
})

//to display the next question or score
function handlenext(){
  currentquestionindex ++;
  if(currentquestionindex < questions.length){
    showquestions()
  }else{
    showscore()
  }
};

//showing score at the end of hte questions length
function showscore(){
  resetstate()
  nextbtn.innerHTML = "play again"
  nextbtn.classList.add('active')
  questionbtn.innerHTML = `your score was ${score} out of ${questions.length} questions!`
}

start();