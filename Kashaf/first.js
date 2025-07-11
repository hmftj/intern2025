const stars=document.querySelectorAll('.star i');
let rating=0;

stars.forEach((star,index)=>{
    star.addEventListener('click',()=>{
        rating=stars.length-index;
        updateStars(rating);
    });
});

function updateStars(rating){
    stars.forEach((star,index)=>{
        if(stars.length-index<= rating)
        {
            star.classList.add('selected');
        }
        else{
            star.classList.remove('selected');
        }
    });
}

const inputReview=document.querySelector('.input-review');
const button=document.querySelector('.btn');
button.addEventListener('click',()=>{
    console.log(inputReview.value);
    inputReview.value="";
    alert("Review submitted successfully.")
})




