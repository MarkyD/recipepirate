javascript:(function () {  
  if (!($ = window.jQuery)) {
    var script = document.createElement( 'script' );  
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload=appendPirateRecipeScript;  
    document.body.appendChild(script);
  }
  else {  
    appendPirateRecipeScript();  
  }  
  function appendPirateRecipeScript() {  
    var script = document.createElement( 'script' );  
    script.src = 'http://staging.fabriquehq.nl/recipepirate/mark/bookmarklet/library.js';
    script.onload=function(){
      pirating.log('pirating library done');
    } 
    document.body.appendChild(script);
  }
}());

 