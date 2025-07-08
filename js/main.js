for(let a=1; a<10; a++){
document.writeln("<button>"+a+"</button>");
}


function myFunction(){
    btn.style.backgroundColor=blue;
}
let btn=document.createElement("button");
btn.innerText="click me!";
btn.onclick(myFunction(),()=>{
    
});

