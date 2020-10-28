"use strict";

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
//переменные для авторизации
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInform = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("delivery");
function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  if (modalAuth.classList.contains("is-open")) {
    disabledScroll();
  } else {
    enableScroll();
  }
}

function autorized() {
  //функция выхода
  function logOut() {
    login = null;
    localStorage.removeItem("delivery");
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonAuth.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }
  console.log("autorizovan!");
  buttonAuth.style.display = "none";
  userName.textContent = login;
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  buttonOut.addEventListener("click", logOut);
}

//функция входа
function notautorized() {
  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;
    if (loginInput.value.trim()) {
      localStorage.setItem("delivery", login);
      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInform.removeEventListener("submit", logIn);
      logInform.reset();
      checkAuth();
    } else {
      loginInput.style.background = "#ff0000";
      setTimeout(function () {
        loginInput.style.background = "#ffffff";
      }, 2000);
      loginInput.value = "";
    }
  }
  console.log("ne autorizovan");
  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInform.addEventListener("submit", logIn);
  modalAuth.addEventListener("click", function (event) {
    if (event.target.classList.contains("is-open")) {
      toggleModalAuth();
    }
  });
}
//проверка аторизации
function checkAuth() {
  if (login) {
    autorized();
  } else {
    notautorized();
  }
}

function createCardRestaurants() {
  const card = `
<a  class="card card-restaurant">
						<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Пицца плюс</h3>
								<span class="card-tag tag">50 мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 900 ₽</div>
								<div class="category">Пицца</div>
							</div>
						</div>
					</a>
`;
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";

  card.insertAdjacentHTML(
    "beforeend",
    `
              <img
                src="img/pizza-plus/pizza-oleole.jpg"
                alt="image"
                class="card-image"
              />
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title card-title-reg">Пицца Оле-Оле</h3>
                </div>
                <div class="card-info">
                  <div class="ingredients">
                    Соус томатный, сыр «Моцарелла», черри, маслины, зелень,
                    майонез
                  </div>
                </div>
                <div class="card-buttons">
                  <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                  </button>
                  <strong class="card-price-bold">440 ₽</strong>
                </div>
              </div>
  `
  );

  cardsMenu.insertAdjacentElement("beforeend", card);
}
function openGoods(event) {
  if (login) {
    console.log("dfdfds");
    const target = event.target;
    const restaurant = target.closest(".card-restaurant");
    if (restaurant) {
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");
      cardsMenu.textContent = "";
      createCardGood();
      createCardGood();
      createCardGood();
    }
  } else {
    toggleModalAuth();
  }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
buttonAuth.addEventListener("click", toggleModalAuth);
closeAuth.addEventListener("click", toggleModalAuth);

cardsRestaurants.addEventListener("click", openGoods);

logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});

checkAuth();
createCardRestaurants();
createCardRestaurants();
createCardRestaurants();
