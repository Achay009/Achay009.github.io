const btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
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

    fetch(url, fetchData)
        .then(res => res.json())
        .then((response) => {
           
            if (response.status == "success") {
                console.log(response);
                document.querySelector(".loader").style.display = "none";
                alert("Validation Succes " + response.data.first_name + " " + response.data.last_name);
            } else {
                document.querySelector(".loader").style.display = "none";
                alert("Cannot find BVN holder");
            }

        }).catch((error) =>{
            document.querySelector(".loader").style.display = "none";
          alert("Opps Something Occured try again")
          
            
        });

window.
   

    console.log("Api call has finished");

})
