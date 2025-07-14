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

// button.addEventListener('click', () => {
//   if(inputReview.value!=""){
//     const reviewText = inputReview.value;
//   }else{
//     alert("Please write your feedback.");
//   }
  
//   // Clear the review box first
//   inputReview.value = "";

//   // Reset the stars
//   stars.forEach(star => star.classList.remove('selected'));
  
//   // Now show alert (after clearing)
//   alert("Review submitted successfully.");

//   // Optionally log the data
//   console.log("Rating:", rating);
//   console.log("Review:", reviewText);
// });






/* ---------- tiny helper ---------- */
const $ = (sel) => document.querySelector(sel);
const api = (action, opts = {}) =>
  fetch(`api.php?action=${action}`, opts).then(r => r.json());

/* ---------- star picker ---------- */
let current = 0;
$('#starBox').addEventListener('mouseover',  e => color(+e.target.dataset.val));
$('#starBox').addEventListener('mouseleave', () => color(current));
$('#starBox').addEventListener('click',     e => { current = +e.target.dataset.val; });

function color(n) {
  document.querySelectorAll('#starBox i').forEach(star =>
    star.classList.toggle('selected', +star.dataset.val <= n));
}

/* ---------- submit ---------- */
$('#send').addEventListener('click', async () => {
  if (!current) { alert('Pick a rating first'); return; }
  if (!$('#comment').value.trim()) { alert('Write your review'); return; }

  await api('create', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({
      name   : $('#name').value || 'Anonymous',
      rating : current,
      comment: $('#comment').value.trim()
    })
  });

  // reset UI
  current = 0; color(0);
  $('#comment').value = ''; $('#name').value = '';

  load();                    // refresh list + stats
});

/* ---------- fetch + render ---------- */
async function load() {
  const data = await api('read');

  /* stats */
  $('#avg').textContent = data.average.toFixed(2);
  $('#breakdown').innerHTML = Object.entries(data.stars)
    .map(([k,v]) => `${k}★ : ${v}`).join(' | ');

  /* reviews */
  $('#reviews').innerHTML = data.reviews.slice().reverse().map(r => `
    <div class="review">
      <strong>${'★'.repeat(r.rating)}</strong>
      by <em>${r.name}</em> –
      <small>${new Date(r.timestamp*1000).toLocaleString()}</small><br>
      ${r.comment}
    </div>`).join('');
}
load();                       // run on page‑load



