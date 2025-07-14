const stars = document.querySelectorAll('.star i');
let rating = 0;

// Star click handler
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    rating = stars.length - index;
    updateStars(rating);
  });
});

function updateStars(rating) {
  stars.forEach((star, index) => {
    if ((stars.length - index) <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

// Submit button handler
const inputReview = document.querySelector('.input-review');
const button = document.querySelector('.btn');

button.addEventListener('click', () => {
  if(inputReview.value!=""){
    const reviewText = inputReview.value;
  }else{
    alert("Please write your feedback.");
  }
  
  // Clear the review box first
  inputReview.value = "";

  // Reset the stars
  stars.forEach(star => star.classList.remove('selected'));
  
  // Now show alert (after clearing)
  alert("Review submitted successfully.");

  // Optionally log the data
  console.log("Rating:", rating);
  console.log("Review:", reviewText);
});
