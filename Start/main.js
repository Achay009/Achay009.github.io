window.sr = ScrollReveal();

sr.reveal('.navbar',{
     duration:2000,
     origin:'bottom'
});

sr.reveal('.showcase-left',{
     duration:2000,
     origin:'left',
     distance:'300px'
});



// set up text to print, each item in array is new line
var aText = new Array(
    "Hello I am Uche Echesurum and I am a Sofware developer." 
    
    );
    var iSpeed = 100; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
     
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row
     
    function typewriter()
    {
     sContents =  ' ';
     iRow = Math.max(0, iIndex-iScrollAt);
     var destination = document.getElementById("typewriter");
     
     while ( iRow < iIndex ) {
      sContents += aText[iRow++] ;
     }
     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != aText.length ) {
       iArrLength = aText[iIndex].length;
       setTimeout("typewriter()", 500);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
    }
    
    
    typewriter();

    sr.reveal('.showcase-img-left',{
     duration:2000,
     origin:'left',
     distance:'300px'
});
sr.reveal('.showcase-desc-right',{
     duration:2000,
     origin:'right',
     distance:'300px',
     viewFactor:0.2
});
sr.reveal('.showcase-img2-top',{
     duration:2000,
     origin:'top',
     distance:'300px',
     viewFactor:0.2
});
sr.reveal('.showcase-works-bottom',{
     duration:2000,
     origin:'bottom',
     distance:'300px',
     viewFactor:0.2

});

sr.reveal('showcase-contact',{
     duration:2000,
     origin:'top',
     distance:'300px',
     viewFactor:0.2

});