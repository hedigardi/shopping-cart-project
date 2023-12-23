const sortByPriceBtn = document.querySelector('#sortByPrice');
const sortByRatingBtn = document.querySelector('#sortByRating');
const sortByLetterBtn = document.querySelector('#sortByLetter');

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

// Lägger till eventlyssnare för sortering
sortByPriceBtn.addEventListener('click', sortByPrice);
sortByRatingBtn.addEventListener('click', sortByRating);
sortByLetterBtn.addEventListener('click', sortByLetter);

console.log(pastry);
