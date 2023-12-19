const pastryHtmlContainer = document.querySelector('#pastryContainer');
const cartHtmlContainer = document.querySelector('#cart');
const sortByPriceBtn = document.querySelector('#sortByPrice');
const sortByRatingBtn = document.querySelector('#sortByRating');

const pastry = [
  {
    id: 1,
    name: 'Bread',
    price: 20,
    images: [
      {
        src: '/img/bread.jpg',
        alt: 'Bread',
      },
    ],
    rating: 91,
    amount: 0,
    category: 'pastry',
  },
  {
    id: 2,
    name: 'Dark Bread',
    price: 25,
    images: [
      {
        src: '/img/dark-bread.jpg',
        alt: 'Dark Bread',
      },
    ],
    rating: 87,
    amount: 0,
    category: 'pastry',
  },
  {
    id: 3,
    name: 'Cinamon Bun',
    price: 35,
    images: [
      {
        src: '/img/cinnamon-bun.jpg',
        alt: 'Cinamon Bun',
      },
    ],
    rating: 89,
    amount: 0,
    category: 'sweet',
  },
  {
    id: 4,
    name: 'Saffron bun',
    price: 10,
    images: [
      {
        src: '/img/saffron-bun.jpg',
        alt: 'Saffron bun',
      },
    ],
    rating: 32,
    amount: 0,
    category: 'sweet',
  },
  {
    id: 5,
    name: 'Birthday Cake',
    price: 180,
    images: [
      {
        src: '/img/birthday-cake.jpg',
        alt: 'Birthday Cake',
      },
    ],
    rating: 54,
    amount: 0,
    category: 'cake',
  },
  {
    id: 6,
    name: 'Wedding Cake',
    price: 350,
    images: [
      {
        src: '/img/wedding-cake.jpg',
        alt: 'Wedding Cake',
      },
    ],
    rating: 22,
    amount: 0,
    category: 'cake',
  },
];

sortByPriceBtn.addEventListener('click', sortByPrice);
sortByRatingBtn.addEventListener('click', sortByRating);

function sortByPrice() {
  pastry.sort((a, b) => a.price - b.price);
  printPastry();
}

function sortByRating() {
  pastry.sort((a, b) => a.rating - b.rating);
  printPastry();
}

function decreaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  if (pastry[index].amount <= 0) {
    pastry[index].amount = 0;
  } else {
    pastry[index].amount -= 1;
  }
  printPastry();
}

function increaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  pastry[index].amount += 1;
  printPastry();
}

function printPastry() {
  pastryHtmlContainer.innerHTML = '';

  pastry.forEach((pastry, index) => {
    pastryHtmlContainer.innerHTML += `
        <article>
          <h3>${pastry.name}</h3>
          <img src="${pastry.images[0].src}" alt="${pastry.images[0].alt}">
          <div>Pris: <span>${pastry.price}</span> kr</div>
          <div>Omdöme: <span>${pastry.rating}</span></div>
          <div>Antal: <span>${pastry.amount}</span></div>
          <button class="minus" data-id="${index}">-</button>
          <button class="plus" data-id="${index}">+</button>
        </article>
      `;
  });

  const minusBtns = document.querySelectorAll('button.minus');
  const plusBtns = document.querySelectorAll('button.plus');

  minusBtns.forEach(btn => {
    btn.addEventListener('click', decreaseAmount);
  });

  plusBtns.forEach((btn) => {
    btn.addEventListener('click', increaseAmount);
  });

  printCartpastry();
}

function printCartpastry() {
  cartHtmlContainer.innerHTML = '';

  let sum = 0;

  pastry.forEach(pastry => {
    if (pastry.amount > 0) {
      sum += pastry.amount * pastry.price;
      cartHtmlContainer.innerHTML += `
        <article>
            <span>${pastry.amount}st ${pastry.name} - ${pastry.amount * pastry.price} kr</span>
        </article>
      `;
    }
  });

  cartHtmlContainer.innerHTML += `
    <img src="/img/shopping-cart.png" alt="Shopping Cart button" width="20" height="20"> <span>Kundvagn</span>
    <p>Totalsumma: ${sum} kr</p>`;
}

printPastry();

// ------------------------------------ ORDER FORM ------------------------------

const invoiceDetails = document.querySelector('#invoiceDetails');
const creditCardDetails = document.querySelector('#creditCardDetails');
const paymentOptions = document.querySelectorAll('[name="paymentOption"]');
const inputFields = document.querySelectorAll('form input:not([type="checkbox"]):not([type="radio"]):not([type="button"])');
const popup = document.querySelector('#popup');
const orderSummary = document.querySelector('#orderSummary');

const orderBtn = document.querySelector('#sendForm');
const resetButton = document.querySelector('#resetForm');


let invoicePaymentSelected = false;

inputFields.forEach(field => {
  field.addEventListener('keyup', validateFormField);
  field.addEventListener('focusout', validateFormField);
});

paymentOptions.forEach(radio => {
  radio.addEventListener('change', togglePaymentOptions);
});

function validateFormField() {

  let hasErrors = false;

  inputFields.forEach(field => {
    const errorField = field.previousElementSibling;
    let errorMsg = '';
    if (errorField !== null) {
      errorField.innerHTML = '';
    }

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
          /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/
        );
        if (regex.exec(field.value) === null) {
          errorMsg = 'Felaktig personnummer!';
          hasErrors = true;
        }
        break;
    }

    if (errorField !== null) {
      errorField.innerHTML = errorMsg;
    }
  });

  if (hasErrors) {
    document.querySelector('#sendForm').setAttribute('disabled', 'disabled');
    orderBtn.removeEventListener('click', sendForm);
  } else {
    document.querySelector('#sendForm').removeAttribute('disabled');
    orderBtn.addEventListener('click', sendForm);
  }
}

function sendForm() {
  popup.classList.remove('hidden');
  orderSummary.classList.remove('hidden');
  popup.addEventListener('click', hideOrderConfirmation);
  document.querySelector('#closePopup').addEventListener('click', hideOrderConfirmation);
}

function resetFormFields() {
  document.getElementById('firstName').placeholder = 'Förnamn';
  document.getElementById('lastName').placeholder = 'Efternamn';
  document.getElementById('street').placeholder = 'Adress';
  document.getElementById('zipcode').placeholder = 'Postnummer';
  document.getElementById('city').placeholder = 'Postort';
  document.getElementById('mobile').placeholder = 'Telefonnummer';
  document.getElementById('email').placeholder = 'E-mail';
  document.getElementById('cardNumber').placeholder = 'Kortnummer';
  document.getElementById('expiryMonth').placeholder = 'MM';
  document.getElementById('expiryYear').placeholder = 'ÅÅ';
  document.getElementById('ssn').placeholder = 'Organisationsnummer/Personnummer';

  const errorFields = document.querySelectorAll('.errorField');
  errorFields.forEach(field => {
    field.textContent = ''; 
  });

  hideOrderConfirmation();
}

resetButton.addEventListener('click', resetFormFields);

function hideOrderConfirmation() {
  popup.classList.add('hidden');
  orderSummary.classList.add('hidden');
  popup.removeEventListener('click', hideOrderConfirmation);
  document
    .querySelector('#closePopup')
    .removeEventListener('click', hideOrderConfirmation);
}

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

