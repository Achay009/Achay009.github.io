const btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
    document.querySelector(".formSuccess").style.display = "none";
   document.querySelector(".formError").style.display = "none";

   e.preventDefault();
    document.querySelector(".loader").style.display = "block";
    console.log("Api call has started");
    var input = document.getElementById('inputBvn');
    var bvn = input.value;

    var url = "https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/" + bvn + "?seckey=FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X";

    var fetchData = {
        request: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    }
if(!isNaN(bvn)){
    fetch(url, fetchData)
    .then(res => res.json())
    .then((response) => {
       
        if (response.status == "success") {
            console.log(response);
            document.querySelector(".loader").style.display = "none";
            document.querySelector(".formSuccess").style.display = "block";
            document.querySelector(".formSuccess").innerText = "Validation Success "+ response.data.first_name + " " + response.data.last_name;
           
        } else {
            document.querySelector(".loader").style.display = "none";
            document.querySelector(".formError").style.display = "block";
            document.querySelector(".formError").innerText = "Cannot find BVN Holder";
            
        }

    }).catch((error) =>{
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".formError").style.display = "block";
        document.querySelector(".formError").innerText = "Oops!! an Error Occured";
     
    
      
        
    });


console.log("Api call has finished");




    
}else{
    
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".formError").style.display = "block";
    document.querySelector(".formError").innerText = "Oops!! please Enter BVN number";
   // btn.addEventListener('click',)   would do it later...
 


}
   
})
