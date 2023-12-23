// Bakverksprodukter
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
    name: 'Saffron Bun',
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

// exportera listan med bakverksprodukter från products.js
export default pastry;
