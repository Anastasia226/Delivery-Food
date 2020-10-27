const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


//autorizacia
const buttonAuth = document.querySelector('.button-auth');
const  modalAuth= document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInform = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out')

let login = localStorage.getItem('delivery');

function toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}
buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);

function autorized(){


  function logOut(){
    login =null; 
    localStorage.removeItem('delivery');   
    userName.style.display = '';
   buttonOut.style.display = '';
   buttonAuth.style.display = '';
   buttonOut.removeEventListener('click', logOut);

   checkAuth();
  }

  console.log('autorizovan!');
  buttonAuth.style.display = 'none';
  userName.textContent = login;
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
  
}
function notautorized(){ 
  console.log('ne autorizovan');

  function logIn(event){
    event.preventDefault();
    login = loginInput.value;    

    if (login){      
      localStorage.setItem('delivery', login);
      toggleModalAuth();   
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInform.removeEventListener('submit', logIn);
      logInform.reset();
      checkAuth();
    } else{
      alert('Введите логин/пароль!');
    }
    
  }
  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInform.addEventListener('submit', logIn);
}

function checkAuth(){
  if (login){
  autorized();
   
} else {
  notautorized();
}
}
checkAuth();