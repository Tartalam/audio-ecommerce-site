const posts = [];

const images = ['../image/pexels-eric-esma-302047-894156.jpg',
              '../image/pexels-padrinan-167092.jpg',
              '../image/pexels-pixabay-207353.jpg',
              '../image/pexels-pixabay-257904.jpg',
              '../image/pexels-pixabay-276092.jpg',
              '../image/pexels-pixabay-459277.jpg',
              '../image/pexels-pixabay-534283.jpg',
              '../image/pexels-thepaintedsquare-1010519.jpg',
              '../image/pexels-umkreisel-app-956999.jpg',
              '../image/pexels-vishnurnair-1105666.jpg'

];

// let imageIndex = 0;

for(let i = 0; i < images.length; i++){
posts.push({
  id: i,
  image: images[i % images.length]
});
}

// console.log(posts);

