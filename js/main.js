// HÄMTA HTML ELEMENT
const pastryHtmlContainer = document.querySelector('#pastryContainer');
const cartHtmlContainer = document.querySelector('#cart');
const sortByPriceBtn = document.querySelector('#sortByPrice');
const sortByRatingBtn = document.querySelector('#sortByRating');
const sortByLetterBtn = document.querySelector('#sortByLetter');
const searchItemInput = document.querySelector('#searchItem');
const filterBreadBtn = document.querySelector('#filterBread');
const filterBunBtn = document.querySelector('#filterBun');
const filterCakeBtn = document.querySelector('#filterCake');
const invoiceDetails = document.querySelector('#invoiceDetails');
const creditCardDetails = document.querySelector('#creditCardDetails');
const paymentOptions = document.querySelectorAll('[name="paymentOption"]');
const inputFields = document.querySelectorAll('form input:not([type="checkbox"]):not([type="radio"]):not([type="button"])');
const popup = document.querySelector('#popup');
const orderSummary = document.querySelector('#orderSummary');
const orderBtn = document.querySelector('#sendForm');
const resetButton = document.querySelector('#resetForm');
const searchIcon = document.querySelector('#search-icon');
const filterIcon = document.querySelector('#filter-icon');
const sortIcon = document.querySelector('#sort-icon');
const divSearch = document.querySelector('.search-center');
const divFilter = document.querySelector('.filter-center');
const divSort = document.querySelector('.sort-center');
const itemFunctionContainer = document.querySelector('.item-function-container');

// IMPORTERA PRODUKTER TILL MAIN.JS
import pastryList from './products.js';

// BAKVERK
let pastry = pastryList;

// IMPORTERA FUNKTION TILL MAIN.JS
import { createItemPastry } from './function.js';

// SORTERING
function sortByPrice() {
  pastry.sort((a, b) => a.price - b.price);
  printPastry();
}

function sortByRating() {
  pastry.sort((a, b) => a.rating - b.rating);
  printPastry();
}

function sortByLetter() {
  pastry.sort((a, b) => ('' + a.name).localeCompare(b.name));
  printPastry();
}

// SÖKNING
const searchItem = (e) => {
  const searchItems = document.querySelectorAll('article h3');
  const searchValue = e.target.value.toLowerCase();

  searchItems.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(searchValue) !== -1) {
      item.parentElement.style.display = '';
    } else {
      item.parentElement.style.display = 'none';
    }
  });
};

// FILTRERING
const filterBread = () => {
  const filterItems = document.querySelectorAll('article h3');

  filterItems.forEach((items) => {
    const filterName = items.firstChild.textContent;

    if (filterName.indexOf('röd') !== -1) {
      items.parentElement.style.display = 'revert';
    } else {
      items.parentElement.style.display = 'none';
    }
  });
};

const filterBun = () => {
  const filterItems = document.querySelectorAll('article h3');

  filterItems.forEach((items) => {
    const filterName = items.firstChild.textContent;

    if (
      filterName.indexOf('ulle') !== -1 ||
      filterName.indexOf('rois') !== -1
    ) {
      items.parentElement.style.display = 'revert';
    } else {
      items.parentElement.style.display = 'none';
    }
  });
};

const filterCake = () => {
  const filterItems = document.querySelectorAll('article h3');

  filterItems.forEach((items) => {
    const filterName = items.firstChild.textContent;

    if (filterName.indexOf('årta') !== -1) {
      items.parentElement.style.display = 'revert';
    } else {
      items.parentElement.style.display = 'none';
    }
  });
};

const showSearch = () => {
  itemFunctionContainer.classList.add('left');
  divSearch.classList.toggle('show');
  divFilter.classList.remove('show');
  divSort.classList.remove('show');
};
const showFilter = () => {
  itemFunctionContainer.classList.add('left');
  divFilter.classList.toggle('show');
  divSearch.classList.remove('show');
  divSort.classList.remove('show');
};
const showSort = () => {
  itemFunctionContainer.classList.add('left');
  divSort.classList.toggle('show');
  divFilter.classList.remove('show');
  divSearch.classList.remove('show');
};

// ÄNDRA ANTAL VAROR
function decreaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  pastry[index].amount = Math.max(0, pastry[index].amount - 1);
  printPastry();
  updatePastryInStorage();
}

function increaseAmount(e, index) {
  addToCartAndUpdate(e, index);
}

function addToCartAndUpdate(e, index) {
  pastry[index].amount += 1;
  updatePastryInStorage();
  printPastry();
}

// TÖM KUNDVAGN
function clearCart() {
  pastry.forEach((pastryItem) => {
    pastryItem.amount = 0;
  });
  printPastry();
  printCartpastry();
  updatePastryInStorage();
}

// PRINT BAKVERK
function printPastry() {
  pastryHtmlContainer.innerHTML = '';

  pastry.forEach((pastryItem, index) => {
    const { name, images, price, rating, amount } = pastryItem;

    createItemPastry(name, images, price, rating, amount, index);
  });

  const minusBtns = pastryHtmlContainer.querySelectorAll('button.minus');
  const plusBtns = pastryHtmlContainer.querySelectorAll('button.plus');

  minusBtns.forEach((btn) => {
    btn.addEventListener('click', decreaseAmount);
  });

  plusBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => increaseAmount(e, index));
  });

  printCartpastry();
}

// PRINT KUNDVAGN
function printCartpastry() {
  cartHtmlContainer.innerHTML = '';
  let sum = 0;
  const cartContent = document.createDocumentFragment();

  pastry.forEach((pastryItem) => {
    if (pastryItem.amount > 0) {
      sum += pastryItem.price * pastryItem.amount;

      const article = document.createElement('article');
      const span = document.createElement('span');
      span.textContent = `${pastryItem.amount}st ${pastryItem.name} - ${
        pastryItem.amount * pastryItem.price
      } kr`;
      article.appendChild(span);
      cartContent.appendChild(article);
    }
  });

  const cartImage = document.createElement('img');
  cartImage.src = '/img/shopping-cart.png';
  cartImage.alt = 'Shopping Cart button';
  cartImage.width = 20;
  cartImage.height = 20;
  cartContent.appendChild(cartImage);

  const cartSpan = document.createElement('span');
  cartSpan.textContent = 'Kundvagn';
  cartContent.appendChild(cartSpan);

  const totalPrice = document.createElement('p');
  totalPrice.textContent = `Att Betala: ${sum} kr`;
  cartContent.appendChild(totalPrice);

  const lineBreak = document.createElement('br');
  cartContent.appendChild(lineBreak);

  const clearCartLink = document.createElement('a');
  clearCartLink.href = '';
  clearCartLink.id = 'clear-cart';
  clearCartLink.textContent = 'Töm Kundvagnen';
  clearCartLink.addEventListener('click', (event) => {
    event.preventDefault();
    clearCart();
  });
  cartContent.appendChild(clearCartLink);

  cartContent.appendChild(lineBreak);

  const orderLink = document.createElement('a');
  orderLink.href = 'order.html#orderForm';
  orderLink.id = 'order-cart';
  orderLink.textContent = 'Beställ';
  cartContent.appendChild(orderLink);

  cartHtmlContainer.appendChild(cartContent);

  printOrderSummary();
}

// PRINT ORDER TOTAL
function printOrderSummary() {
  const orderSummary = document.querySelector('#orderSummary');
  orderSummary.innerHTML = '';

  pastry.forEach((pastryItem) => {
    if (pastryItem.amount > 0) {
      const article = document.createElement('article');
      const span = document.createElement('span');

      span.textContent = `${pastryItem.amount}pcs ${pastryItem.name} - ${
        pastryItem.amount * pastryItem.price
      } kr`;

      article.appendChild(span);
      orderSummary.appendChild(article);
    }
  });

  const totalAmount = pastry.reduce(
    (acc, pastryItem) => acc + pastryItem.price * pastryItem.amount,
    0
  );

  // LAGRING AV BAKVERK I LOCAL STORAGE
  updatePastryInStorage();
}

// UPPDATERA ARRAY I LOCAL STORAGE
function updatePastryInStorage() {
  const cartItems = pastry.filter((pastryItem) => pastryItem.amount > 0);
  const pastryString = JSON.stringify(pastry);
  localStorage.setItem('pastryList', pastryString);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// LÄGG I KUNDVAGN UPPTADERA UI
function addToCart(e, index) {
  pastry[index].amount += 1;
  updatePastryInStorage();
  printPastry();
}

// HÄMTA BAKVERK UR LOCAL STORAGE OM DET FINNS
const storedPastry = localStorage.getItem('pastryList');
if (storedPastry) {
  pastry = JSON.parse(storedPastry);
  printPastry();
}

// HÄMTA KUNDVAGN FRÅN LOCAL STORAGE OM DET FINNS
const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
  printCartpastry();
}

// ------------------------------------------------------------------------------------------
// ------------------------------------ Kundvagn & beställning ------------------------------
// ------------------------------------------------------------------------------------------

let invoicePaymentSelected = false;

// VALIDERING AV FÄLT
inputFields.forEach((field) => {
  field.addEventListener('keyup', validateFormField);
  field.addEventListener('focusout', validateFormField);
});

// ÄNDRA BETALNING
paymentOptions.forEach((radio) => {
  radio.addEventListener('change', togglePaymentOptions);
});

// VÄXLING AV BETALNING
function togglePaymentOptions(e) {
  const selectedOption = e.currentTarget.value;
  invoicePaymentSelected = selectedOption === 'invoice';
  toggleDetailsVisibility();
}

// UPPDATERA BETALNINGSALTERNATIV
function toggleDetailsVisibility() {
  invoiceDetails.classList.toggle('hidden', !invoicePaymentSelected);
  creditCardDetails.classList.toggle('hidden', invoicePaymentSelected);
}

// VALIDERA FORMULÄR
function validateFormField() {
  let hasErrors = false;

  inputFields.forEach((field) => {
    const errorField = field.previousElementSibling;
    let errorMsg = '';

    if (errorField !== null) {
      errorField.innerHTML = '';
    }

    // VALIDERING AV OLIKA FÄLT
    switch (field.id) {
      case 'zipcode':
        if (field.value.length != 5) {
          errorMsg = 'Fältet är ej korrekt ifylld!';
          hasErrors = true;
        }
        break;
      case 'firstName':
      case 'lastName':
      case 'street':
      case 'city':
      case 'mobile':
      case 'email':
        if (field.value.length === 0) {
          errorMsg = 'Fältet är ej korrekt ifylld!';
          hasErrors = true;
        }
        break;
      case 'ssn':
        const regex = new RegExp(
          /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/
        );
        if (regex.exec(field.value) === null) {
          errorMsg = 'Felaktig Organisationsnummer/Personnummer!';
          hasErrors = true;
        }
        break;
    }

    if (errorField !== null) {
      errorField.innerHTML = errorMsg;
    }
  });

  // VALIDERING AV SKICKA-KNAPP
  orderBtn.disabled = hasErrors;
  if (hasErrors) {
    orderBtn.removeEventListener('click', sendForm);
  } else {
    orderBtn.addEventListener('click', sendForm);
  }
}

// POPUP ORDER SUMMERING
function showOrderSummary() {
  const orderSummary = document.querySelector('#orderSummary');
  orderSummary.innerHTML = '';

  const closeButton = document.createElement('button');
  closeButton.id = 'closePopup';
  closeButton.textContent = 'Stäng fönstret';

  const thankYouMessage = document.createElement('p');
  thankYouMessage.textContent =
    'Tack för din beställning! Den har nu skickats och är på väg till dig.';

  const divider = document.createElement('div');
  divider.classList.add('divider');

  orderSummary.appendChild(closeButton);
  orderSummary.appendChild(thankYouMessage);
  orderSummary.appendChild(divider);

  const orderList = document.createElement('ul');

  pastry.forEach((pastryItem) => {
    if (pastryItem.amount > 0) {
      const listItem = document.createElement('li');
      listItem.textContent = `${pastryItem.amount} st ${pastryItem.name} - ${
        pastryItem.amount * pastryItem.price
      } kr`;
      orderList.appendChild(listItem);
    }
  });

  orderSummary.appendChild(orderList);

  let totalSum = 0;
  pastry.forEach((pastryItem) => {
    if (pastryItem.amount > 0) {
      totalSum += pastryItem.amount * pastryItem.price;
    }
  });

  const totalListItem = document.createElement('li');
  totalListItem.textContent = `Totalsumma: ${totalSum} kr`;
  totalListItem.classList.add('total-sum-style');
  orderList.appendChild(totalListItem);

  orderSummary.classList.remove('hidden');
  closeButton.addEventListener('click', hideOrderConfirmation);
}

// SKICKA FORMULÄR
function sendForm() {
  popup.classList.remove('hidden');
  showOrderSummary();
  popup.addEventListener('click', hideOrderConfirmation);
  document
    .querySelector('#closePopup')
    .addEventListener('click', hideOrderConfirmation);
}

// ÅTERSTÄLL FORMULÄR
function resetFormFields() {
  inputFields.forEach((field) => {
    field.value = '';
  });

  document.querySelectorAll('.errorField').forEach((field) => {
    field.textContent = '';
  });
}

// GÖM POPUP ORDER
function hideOrderConfirmation() {
  popup.classList.add('hidden');
  orderSummary.classList.add('hidden');
  popup.removeEventListener('click', hideOrderConfirmation);
  document
    .querySelector('#closePopup')
    .removeEventListener('click', hideOrderConfirmation);
}

// EVENTLYSSNARE
searchIcon.addEventListener('click', showSearch);
filterIcon.addEventListener('click', showFilter);
sortIcon.addEventListener('click', showSort);
sortByPriceBtn.addEventListener('click', sortByPrice);
sortByRatingBtn.addEventListener('click', sortByRating);
sortByLetterBtn.addEventListener('click', sortByLetter);
searchItemInput.addEventListener('input', searchItem);
filterBreadBtn.addEventListener('click', filterBread);
filterBunBtn.addEventListener('click', filterBun);
filterCakeBtn.addEventListener('click', filterCake);

window.onload = function () {
  printPastry();
};

if (resetButton) {
  resetButton.addEventListener('click', resetFormFields);
}
