

 var btn = document.getElementById('btn');

 btn.addEventListener('click', sharePayment);

function sharePayment(){
  
    console.log("the button is being cliked");
    var amount = document.getElementById('amount');
    var ant = amount.value;
    var riderShare = document.getElementById('riderCut');
    var companyShare = document.getElementById('companyCut');


    if(!isNaN(ant)||ant ==0){
    var ridersCut = (75/100)*ant;
    var companyCut = (25/100)*ant;

    riderShare.innerHTML = "<span>&#8358;</span>"+ ridersCut;
    companyShare.innerHTML = "<span>&#8358;</span>"+ companyCut;
    document.querySelector(".formSuccess").style.display = "block";
    document.querySelector(".formSuccess").innerText = "Calculation Success";
    document.querySelector(".formError").style.display = "none";
   

    }else{
        document.querySelector(".formSuccess").style.display = "none";
        document.querySelector(".formError").style.display = "block";
        document.querySelector(".formError").innerText = "Oops!! please Enter number";
    }


}
