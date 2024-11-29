
let questions = [
  {
    question: "Who scored the highest individual score in an ODI match?",
    answers: [
      { text: "Sachin Tendulkar", correct: false },
      { text: "Rohit Sharma", correct: true },
      { text: "Virender Sehwag", correct: false },
      { text: "Chris Gayle", correct: false }
    ]
  },
  {
    question: "Which country has won the most ICC Cricket World Cups (Men)?",
    answers: [
      { text: "India", correct: false },
      { text: "Australia", correct: true },
      { text: "West Indies", correct: false },
      { text: "England", correct: false }
    ]
  },
  {
    question: "Who was the first player to score 10,000 runs in Test cricket?",
    answers: [
      { text: "Allan Border", correct: true },
      { text: "Sunil Gavaskar", correct: false },
      { text: "Sachin Tendulkar", correct: false },
      { text: "Rahul Dravid", correct: false }
    ]
  },
  {
    question: "Which bowler has the most wickets in Test cricket?",
    answers: [
      { text: "Shane Warne", correct: false },
      { text: "James Anderson", correct: false },
      { text: "Muttiah Muralitharan", correct: true },
      { text: "Glenn McGrath", correct: false }
    ]
  },
  {
    question: "Which Indian cricketer is known as the 'God of Cricket'?",
    answers: [
      { text: "Virat Kohli", correct: false },
      { text: "MS Dhoni", correct: false },
      { text: "Sachin Tendulkar", correct: true },
      { text: "Kapil Dev", correct: false }
    ]
  },
  {
    question: "Which stadium is known as the 'Home of Cricket'?",
    answers: [
      { text: "Eden Gardens", correct: false },
      { text: "Lord's", correct: true },
      { text: "MCG", correct: false },
      { text: "Wankhede", correct: false }
    ]
  },
  {
    question: "Who won the inaugural ICC T20 World Cup in 2007?",
    answers: [
      { text: "Australia", correct: false },
      { text: "India", correct: true },
      { text: "Pakistan", correct: false },
      { text: "South Africa", correct: false }
    ]
  },
  {
    question: "Who is the youngest cricketer to score a century in international cricket?",
    answers: [
      { text: "Shahid Afridi", correct: true },
      { text: "Virat Kohli", correct: false },
      { text: "Sachin Tendulkar", correct: false },
      { text: "Prithvi Shaw", correct: false }
    ]
  },
  {
    question: "Which country hosts the Big Bash League (BBL)?",
    answers: [
      { text: "England", correct: false },
      { text: "India", correct: false },
      { text: "Australia", correct: true },
      { text: "New Zealand", correct: false }
    ]
  },
  {
    question: "Which cricketer is nicknamed 'Mr. 360'? ",
    answers: [
      { text: "AB de Villiers", correct: true },
      { text: "Virat Kohli", correct: false },
      { text: "Steve Smith", correct: false },
      { text: "David Warner", correct: false }
    ]
  }
];



let questionNo=document.getElementById("questionId");
let ansBtns=document.getElementById("ansBtns");
let nxtBtn=document.getElementById("nextbtn");
let scoreContain=document.getElementById("scoreContain");
let qn=document.getElementById("quesDiv");



let currQnIndex=0;
let score=0;
let timerInterval; 
let remainingTime; 



window.onload=function(){
  document.getElementById("startDiv").style.display = "block";
  document.getElementById("quesDiv").style.display = "none"; 
  document.getElementById("scoreContain").style.display="none";
}

function QuizLogin() {
  const nameInput = document.getElementById("nameInput").value;
  const emailInput = document.getElementById("emailInput").value;

  const emailRegex =/^[A-Za-z0-9]+@gmail\.com$/

  

  if (!nameInput || !emailInput) {
      alert("Please fill in both your name and email to start the quiz.");
      return;
  }

  if (!emailRegex.test(emailInput)) {
    alert("Please enter a valid email address.");
    return;
  }

 
  document.getElementById("scoreContain").style.display="none";
  document.getElementById("startDiv").style.display = "none";
  document.getElementById("quesDiv").style.display = "block";

  
  StartQuiz();
}




function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



function StartQuiz(){
  shuffleQuestions(questions);
   currQnIndex=0;
   score=0;
   scoreContain.style.display="none";
   qn.style.display="block";
   nxtBtn.innerHTML="NEXT";
   ShowQn()
}


function ShowQn(){
  if (timerInterval) clearInterval(timerInterval); 
  let timeId=document.getElementById("time");
  let duration=15000;
  let remainingTime=(duration/1000)+1;
  let currQn=questions[currQnIndex];
  let QnNo=currQnIndex + 1;
  questionNo.innerHTML=QnNo + "." + currQn.question;
   timerInterval = setInterval(()=>{
    remainingTime--;
    timeId.innerHTML=`<h1>REMAINING TIME : ${remainingTime}</h1>`
    if(remainingTime<=0){
      Next()
    }
  },1000)
  let TotalAns="";
 currQn.answers.forEach((data)=>{
  console.log(data.text)
  TotalAns += `<button class="w-[95%] border border-black p-1 transition duration-300 text-start pl-4  rounded-md " onclick="CheckAns(this)" data-correct="${data.correct}">${data.text}</button>`
  })
 ansBtns.innerHTML=TotalAns;
 nxtBtn.disabled = true;
}





function CheckAns(button){
  let Iscorrect=button.getAttribute("data-correct") === "true";

  let buttons = document.querySelectorAll("#ansBtns button");
  buttons.forEach((btn) => (btn.disabled = true));
  if(Iscorrect){
    score++;
    button.classList.add("bg-green-500", "text-white");

  }
  else{
    button.classList.add("bg-red-500", "text-white");
  }
  clearInterval(timerInterval);
  nxtBtn.disabled = false;
}

function viewCorrectAnswers() {
  let correctAnswers = questions.map((question, index) => {
      let correctAnswer = question.answers.find(answer => answer.correct === true );
      return `Q${question.question}: ${correctAnswer.text}`;
  });

 document.getElementById("crtAns").innerHTML=correctAnswers.join('<br>');
}


function Next(){
  let qn=document.getElementById("quesDiv");
  let scores=document.getElementById("score");
  let scoreContain=document.getElementById("scoreContain");
  const nameInput = document.getElementById("nameInput").value;
  
  currQnIndex++;
  if(currQnIndex < questions.length){
    ShowQn()
  }
  else{
    qn.style.display="none";
    scoreContain.style.display="flex";
    scores.innerHTML=`<p>${nameInput},Your Score: ${score}</p>`
  
  }
  
}


function Restart(){
  // let btn=document.getElementById("Rebtn");
  StartQuiz()

}







