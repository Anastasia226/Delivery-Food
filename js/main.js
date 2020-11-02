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

const restaurantTitle = document.querySelector(".restaurant-title");
const restaurantRating = document.querySelector(".rating");
const restaurantPrice = document.querySelector(".price");
const restaurantCategory = document.querySelector(".category");
const modalBody = document.querySelector(".modal-body");
const modalPrice = document.querySelector(".modal-pricetag");
const buttonClearCart = document.querySelector(".clear-cart");

let login = localStorage.getItem("delivery");
const cart = [];
const getData = async function (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Ошибка по адресу ${url}, статус ошибки ${response.status}`
    );
  }
  return await response.json();
};
getData("./db/partners.json");
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
    cartButton.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }
  console.log("autorizovan!");
  buttonAuth.style.display = "none";
  userName.textContent = login;
  userName.style.display = "inline";
  buttonOut.style.display = "flex";
  cartButton.style.display = "flex";
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

function createCardRestaurants({
  image,
  kitchen,
  name,
  price,
  stars,
  products,
  time_of_delivery,
}) {
  const card = `
<a  class="card card-restaurant" data-products="${products}">
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${time_of_delivery} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
					</a>
`;
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createCardGood({ name, description, price, image, id }) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = id;
  card.insertAdjacentHTML(
    "beforeend",
    `
              <img
                src="${image}"
                alt="image"
                class="card-image"
              />
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                  <div class="ingredients">
                    ${description}
                  </div>
                </div>
                <div class="card-buttons">
                  <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                  </button>
                  <strong class="card-price card-price-bold">${price} ₽</strong>
                </div>
              </div>
  `
  );

  cardsMenu.insertAdjacentElement("beforeend", card);
}
function openGoods(event) {
  const target = event.target;
  if (login) {
    const restaurant = target.closest(".card-restaurant");
    if (restaurant) {
      cardsMenu.textContent = "";
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");
      console.log(restaurant);
      // const { name, kitchen, price, stars } = restaurant.info;

      // restaurantTitle.textContent = name;
      // restaurantRating.textContent = stars;
      // restaurantPrice.textContent = price;
      // restaurantCategory.textContent = kitchen;

      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    }
  } else {
    toggleModalAuth();
  }
}

function addToCart(event) {
  const target = event.target;
  const buttonAddToCart = target.closest(".button-add-cart");
  if (buttonAddToCart) {
    const card = target.closest(".card");
    const title = card.querySelector(".card-title-reg").textContent;
    const cost = card.querySelector(".card-price").textContent;
    const id = card.id;

    const food = cart.find(function (item) {
      return item.id === id;
    });
    if (food) {
      food.count += 1;
    } else {
      cart.push({
        id,
        title,
        cost,
        count: 1,
      });
    }

    console.log(cart);
  }
}
function renderCart() {
  modalBody.textContent = "";
  cart.forEach(function ({ id, title, cost, count }) {
    const itemCart = `
   <div class="modal-body">
          <div class="food-row">
            <span class="food-name">${title}</span>
            <strong class="food-price">${cost} </strong>
            <div class="food-counter">
              <button class="counter-button counter-minus" data-id=${id}>-</button>
              <span class="counter">${count}</span>
              <button class="counter-button counter-plus" data-id='${id}'>+</button>
            </div>
          </div>
   `;
    modalBody.insertAdjacentHTML("beforeend", itemCart);
  });
  const totalPrice = cart.reduce(function (result, item) {
    return result + parseFloat(item.cost) * item.count;
  }, 0);
  modalPrice.textContent = totalPrice + "P";
}
function changeCount(event) {
  const target = event.target;

  if (target.classList.contains("counter-button")) {
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });
    renderCart();
    if (target.classList.contains("counter-minus")) {
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);
      }
    }
    if (target.classList.contains("counter-plus")) {
      food.count++;
    }
    renderCart();
  }
}
function init() {
  getData("./db/partners.json").then(function (data) {
    data.forEach(createCardRestaurants);
  });
  cartButton.addEventListener("click", function () {
    renderCart();
    toggleModal();
  });
  buttonClearCart.addEventListener("click", function () {
    cart.length = 0;
    renderCart();
  });
  modalBody.addEventListener("click", changeCount);
  close.addEventListener("click", toggleModal);
  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  cardsMenu.addEventListener("click", addToCart);
  cardsRestaurants.addEventListener("click", openGoods);

  logo.addEventListener("click", function () {
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
  });

  checkAuth();
}
init();
