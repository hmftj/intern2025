for(let a=1; a<10; a++){
document.writeln("<button>"+a+"</button>");
}

let btn=document.createElement("button");
btn.innerText="click me!";

function myFunction(){
    document.body.style.backgroundColor = ""; // Clears background
    btn.style.backgroundColor="blue";
}

btn.onclick = myFunction;

// Add the button to the page
document.body.appendChild(btn);

