var audioElement = document.createElement('audio');

// Set attributes for the audio element
audioElement.id = 'myAudio';
audioElement.src = './happy.mp3';
audioElement.autoplay=true ;
document.body.appendChild(audioElement);
console.log(audioElement);
audioElement.play()
setTimeout(()=>{
audioElement.play()
} , 1500 )
console.log("test");

let currentSlide = 0;
const slides = document.querySelectorAll('.slider-img');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
let games = [] ; 
function changeSlide(direction) {
    let checkbox = document.getElementById("checkbox")
    if(checkbox.checked){
        let active = document.getElementsByClassName("active")[0];
        flag = true ;
        for(let i =0 ; i < games.length ; i ++){
          console.log(active);
            if(active.alt == games[i]){
                flag = false;
                break;
            }
        }
        if(flag == true){
            games.push(active.alt);
        }
    }
    console.log(games);
    showSlide(currentSlide + direction);
}

function send() {
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(games)
  })
    .then(response => response.json())
    .then(responseData => {
      //console.log(responseData);
      window.history.pushState({}, '', '/login');
    })
    .catch(error => {
      console.error('Error:', error);
    });
    alert("تم التعديل") ;
  
}

function addComment() {
  var name = document.getElementById('name').value;
  var comment = document.getElementById('comment').value;
      document.getElementById('name').value = '';
      document.getElementById('comment').value = '';
  }
