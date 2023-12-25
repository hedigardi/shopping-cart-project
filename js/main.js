// Hitta HTML-element
const pastryHtmlContainer = document.querySelector('#pastryContainer');
const cartHtmlContainer = document.querySelector('#cart');
const sortByPriceBtn = document.querySelector('#sortByPrice');
const sortByRatingBtn = document.querySelector('#sortByRating');
const sortByLetterBtn = document.querySelector('#sortByLetter');
const searchItemInput = document.querySelector('#searchItem');
const filterBreadBtn = document.querySelector('#filterBread');
const filterBunBtn = document.querySelector('#filterBun');
const filterCakeBtn = document.querySelector('#filterCake');

// Importera listan med bakverksprodukter till main.js
import pastryList from './products.js';

// Bakverksprodukter
const pastry = pastryList;

// Sorteringsfunktioner
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

const searchItem = (e) => {
  const searchItems = document.querySelectorAll('article h3');
  const searchValue = e.target.value;

  searchItems.forEach((items) => {
    const itemName = items.firstChild.textContent.toLocaleLowerCase();
    if (itemName.indexOf(searchValue) !== -1) {
      items.parentElement.style.display = 'revert';
    } else {
      items.parentElement.style.display = 'none';
    }
  });
};

const filterBread = () => {
  const filterItems = document.querySelectorAll('article h3');

  filterItems.forEach((items) => {
    const filterName = items.firstChild.textContent;

    if (filterName.indexOf('Bread') !== -1) {
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

    if (filterName.indexOf('Bun') !== -1) {
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

    if (filterName.indexOf('Cake') !== -1) {
      items.parentElement.style.display = 'revert';
    } else {
      items.parentElement.style.display = 'none';
    }
  });
};

// Lägger till eventlyssnare för sortering
sortByPriceBtn.addEventListener('click', sortByPrice);
sortByRatingBtn.addEventListener('click', sortByRating);
sortByLetterBtn.addEventListener('click', sortByLetter);
searchItemInput.addEventListener('input', searchItem);
filterBreadBtn.addEventListener('click', filterBread);
filterBunBtn.addEventListener('click', filterBun);
filterCakeBtn.addEventListener('click', filterCake);

// Ändra mängdfunktioner
function decreaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  pastry[index].amount = Math.max(0, pastry[index].amount - 1);
  printPastry();
}

function increaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  pastry[index].amount += 1;
  printPastry();
}

// Töm Kundvagnen
function clearCart() {
  pastry.forEach((pastryItem) => {
    pastryItem.amount = 0;
  });
  printPastry();
  printCartpastry();
}

// Utskriftsfunktion för bakverken
function printPastry() {
  pastryHtmlContainer.innerHTML = '';

  pastry.forEach((pastryItem, index) => {
    const { name, images, price, rating, amount } = pastryItem;

    pastryHtmlContainer.innerHTML += `
      <article>
        <h3>${name}</h3>
        <img src="${images[0].src}" alt="${images[0].alt}">
        <div>Pris: <span>${price}</span> kr</div>
        <div>Omdöme: <span>${rating}</span></div>
        <div>Antal: <span>${amount}</span></div>
        <button class="minus" data-id="${index}">-</button>
        <button class="plus" data-id="${index}">+</button>
      </article>
    `;
  });

  const minusBtns = pastryHtmlContainer.querySelectorAll('button.minus');
  const plusBtns = pastryHtmlContainer.querySelectorAll('button.plus');

  minusBtns.forEach((btn) => {
    btn.addEventListener('click', decreaseAmount);
  });

  plusBtns.forEach((btn) => {
    btn.addEventListener('click', increaseAmount);
  });

  printCartpastry();
}

// Utskriftsfunktion för lilla hörn kundvagnen
function printCartpastry() {
  cartHtmlContainer.innerHTML = '';

  let sum = 0;

  pastry.forEach((pastryItem) => {
    if (pastryItem.amount > 0) {
      sum += pastryItem.amount * pastryItem.price;
      cartHtmlContainer.innerHTML += `
        <article>
          <span>${pastryItem.amount}st ${pastryItem.name} - ${
        pastryItem.amount * pastryItem.price
      } kr</span>
        </article>
      `;

      // Lägger till innehållet från 'cart div' till 'orderSummary div
      orderSummary.innerHTML += cartHtmlContainer.innerHTML;
    }
  });

  cartHtmlContainer.innerHTML += `
    <img src="/img/shopping-cart.png" alt="Shopping Cart button" width="20" height="20"> <span>Kundvagn</span>
    <p>Totalsumma: ${sum} kr</p>
    <br>
    <a href="#" id="clear-cart">Rensa kundvagnen</a>
    `;

  const clearCartButton = document.querySelector('#clear-cart');
  clearCartButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearCart();
  });
}

// Utskrift av bakverk
printPastry();

// ------------------------------------------------------------------------------------------
// ------------------------------------ Kundvagn & beställning ------------------------------
// ------------------------------------------------------------------------------------------

// Hitta HTML-element
const invoiceDetails = document.querySelector('#invoiceDetails');
const creditCardDetails = document.querySelector('#creditCardDetails');
const paymentOptions = document.querySelectorAll('[name="paymentOption"]');
const inputFields = document.querySelectorAll(
  'form input:not([type="checkbox"]):not([type="radio"]):not([type="button"])'

);
const popup = document.querySelector('#popup');
const orderSummary = document.querySelector('#orderSummary');

const orderBtn = document.querySelector('#sendForm');
const resetButton = document.querySelector('#resetForm');

let invoicePaymentSelected = false;

// Validering av inmatningsfält
inputFields.forEach((field) => {
  field.addEventListener('keyup', validateFormField);
  field.addEventListener('focusout', validateFormField);
});

// Hantera ändring i betalningsalternativ
paymentOptions.forEach((radio) => {
  radio.addEventListener('change', togglePaymentOptions);
});

// Hantera växling av betalningsalternativ
function togglePaymentOptions(e) {
  if (e.currentTarget.value === 'invoice') {
    invoiceDetails.classList.remove('hidden');
    creditCardDetails.classList.add('hidden');
    invoicePaymentSelected = true;
  } else {
    invoiceDetails.classList.add('hidden');
    creditCardDetails.classList.remove('hidden');
    invoicePaymentSelected = false;
  }
}

// Valideringsfunktion för formulärfält
function validateFormField() {
  let hasErrors = false;

  inputFields.forEach((field) => {
    const errorField = field.previousElementSibling;
    let errorMsg = '';

    if (errorField !== null) {
      errorField.innerHTML = '';
    }

    // Validering av olika fält...
    switch (field.id) {
      case 'zipcode':
        if (field.value.length != 5) {
          errorMsg = 'Fältet är ej korrekt ifylld!'; // felmeddelande
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
          errorMsg = 'Fältet är ej korrekt ifylld!'; // felmeddelande
          hasErrors = true;
        }
        break;
      case 'ssn':
        const regex = new RegExp(
          /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/,
        );
        if (regex.exec(field.value) === null) {
          errorMsg = 'Felaktig Organisationsnummer/Personnummer!'; // felmeddelande
          hasErrors = true;
        }
        break;
    }

    if (errorField !== null) {
      errorField.innerHTML = errorMsg;
    }
  });

  // Aktivera/inaktivera skicka-knappen baserat på validering
  if (hasErrors) {
    document.querySelector('#sendForm').setAttribute('disabled', 'disabled');
    orderBtn.removeEventListener('click', sendForm);
  } else {
    document.querySelector('#sendForm').removeAttribute('disabled');
    orderBtn.addEventListener('click', sendForm);
  }
}

// Funktion för att visa beställningsdetaljer i popup-fönstret
function showOrderSummary() {
  const orderSummary = document.querySelector('#orderSummary');
  orderSummary.innerHTML =
    '<button id="closePopup">Stäng fönstret</button><p>Tack för din beställning! Den har nu skickats och är på väg till dig.</p><div class="divider"></div>';

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

  // Beräknar totalsumman för alla produkter i kundvagnen
  let totalSum = 0;
  pastry.forEach((pastryItem) => {
    if (pastryItem.amount > 0) {
      totalSum += pastryItem.amount * pastryItem.price;
    }
  });

  // Lägger till totalsumman i orderöversikten
  const totalListItem = document.createElement('li');
  totalListItem.textContent = `Totalsumma: ${totalSum} kr`;
  totalListItem.classList.add('total-sum-style');
  orderList.appendChild(totalListItem);

  orderSummary.classList.remove('hidden');
  document
    .querySelector('#closePopup')
    .addEventListener('click', hideOrderConfirmation);
}

// Skicka formulär
function sendForm() {
  popup.classList.remove('hidden');
  showOrderSummary();
  popup.addEventListener('click', hideOrderConfirmation);
  document
    .querySelector('#closePopup')
    .addEventListener('click', hideOrderConfirmation);
}

// Återställ formulärfält
function resetFormFields() {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('street').value = '';
  document.getElementById('zipcode').value = '';
  document.getElementById('city').value = '';
  document.getElementById('mobile').value = '';
  document.getElementById('email').value = '';
  document.getElementById('cardNumber').value = '';
  document.getElementById('expiryMonth').value = '';
  document.getElementById('expiryYear').value = '';
  document.getElementById('ssn').value = '';

  const errorFields = document.querySelectorAll('.errorField');
  errorFields.forEach((field) => {
    field.textContent = '';
  });

  hideOrderConfirmation();
}

// Återställning vid reset-knapptryck
resetButton.addEventListener('click', resetFormFields);

// Göm orderbekräftelse-popup
function hideOrderConfirmation() {
  popup.classList.add('hidden');
  orderSummary.classList.add('hidden');
  popup.removeEventListener('click', hideOrderConfirmation);
  document
    .querySelector('#closePopup')
    .removeEventListener('click', hideOrderConfirmation);
}

// Hämta element från id och skapa JS-variabel

const searchIcon = document.querySelector('#search-icon');
const filterIcon = document.querySelector('#filter-icon');
const sortIcon = document.querySelector('#sort-icon');

const divSearch = document.querySelector('.search-center');
const divFilter = document.querySelector('.filter-center');
const divSort = document.querySelector('.sort-center');

const itemFunctionContainer = document.querySelector(
  '.item-function-container'
);

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

// Händelselyssnare

searchIcon.addEventListener('click', showSearch);
filterIcon.addEventListener('click', showFilter);
sortIcon.addEventListener('click', showSort);
