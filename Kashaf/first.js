// const stars = document.querySelectorAll('.star i');
// let rating = 0;

// // Star click handler
// stars.forEach((star, index) => {
//   star.addEventListener('click', () => {
//     rating = stars.length - index;
//     updateStars(rating);
//   });
// });

// function updateStars(rating) {
//   stars.forEach((star, index) => {
//     if ((stars.length - index) <= rating) {
//       star.classList.add('selected');
//     } else {
//       star.classList.remove('selected');
//     }
//   });
// }

// // Submit button handler
// const inputReview = document.querySelector('.input-review');
// const button = document.querySelector('.btn');
// const messagesList = document.querySelector('.messages-list');

// button.addEventListener('click', () => {
//   if (inputReview.value !== "") {
//     const reviewText = inputReview.value;

//     // Create and append message
//     const message = document.createElement('div');
//     message.classList.add('message');
//     message.innerHTML = `<strong>Rating: ${rating} ★</strong><br>${reviewText}`;
//     messagesList.appendChild(message);

//     // Clear input and reset stars
//     inputReview.value = "";
//     stars.forEach(star => star.classList.remove('selected'));

//     alert("Review submitted successfully.");
//     console.log("Rating:", rating);
//     console.log("Review:", reviewText);
//   } else {
//     alert("Please write your feedback.");
//   }
// });









// ─────── Utility: shortcut to select elements ───────
const $ = (sel) => document.querySelector(sel);

// ─────── API helper ───────
const api = (action, opts = {}) =>
  fetch(`api.php?action=${action}`, opts).then(res => res.json());

// ─────── DOM Elements ───────
const stars        = document.querySelectorAll('.star i');
const inputReview  = $('.input-review');
const button       = $('.btn');
const messagesList = $('.messages-list');

let rating = 0;

// ─────── Star click handler (RTL logic preserved) ───────
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

// ─────── Submit Review ───────
button.addEventListener('click', async () => {
  const reviewText = inputReview.value.trim();

  if (!rating) {
    alert("Please select a rating.");
    return;
  }

  if (!reviewText) {
    alert("Please write your feedback.");
    return;
  }

  const payload = {
    name: 'Anonymous', // Optional: Add name input later
    rating: rating,
    comment: reviewText
  };

  try {
    await api('create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    alert("Review submitted successfully.");
    inputReview.value = "";
    updateStars(0);
    rating = 0;

    loadReviews(); // Refresh after submission
  } catch (err) {
    console.error('Error submitting review:', err);
    alert("An error occurred while submitting the review.");
  }
});

// ─────── Load Existing Reviews from JSON ───────
async function loadReviews() {
  try {
    const data = await api('read');
    const allReviews = data.reviews.slice().reverse();

    messagesList.innerHTML = allReviews.map(r => `
      <div class="message">
        <strong>Rating: ${r.rating} ★</strong><br>
        ${r.comment}
      </div>
    `).join('');
  } catch (err) {
    console.error("Failed to load reviews:", err);
  }
}

// ─────── Initialize ───────
document.addEventListener('DOMContentLoaded', loadReviews);




