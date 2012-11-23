var inlineScroll = (function(){
	var $sidebar,
		$content,
		$inlineAnchors;
	
	function init(){
		$sidebar = $('[data-role~="section-sidebar"]');
		$content = $('[data-role~="section-content"]');
		$inlineAnchors = $('[data-role~="inline-anchor"]');
		
		setScreenDimensions();
		setInlineScroll();
		
		parseRecipe();
	}
	
	$(document).ready(function(){
		init();	
	});
	
	
	function parseRecipe() {
		console.log("parse recipe");
		
		
		$.getJSON("http://localhost/recipepirate/bookmarklet/beautiful_json.js", function(data){
			console.log(data);
			//var forum = json.forum;
			
			for (var i = 0; i < data.length; i++) {
			    var object = data[i];
			    for (property in object) {
			        var value = object[property];
			        
			        if(property == "ingredients"){
			        	$('[data-role~="'+property+'"]').html(value);
			        }
			        
			         if(property == "recipeInstructions"){
			        	$container = $('[data-role~="nav-steps"]');
			        	for (i=0; i <property.length; i++) {
			        		var value = object[property][i];
			        		console.log(value);
			        	};
			        }
			        
			        console.log(property + "=" + value); 
			    }
			}
		});
	}
	
	function setScreenDimensions() {		
		var windowHeight = $(window).height();
				
		$sidebar.height(windowHeight - 80);
		$content.height(windowHeight - 80);
	}
	
	function setInlineScroll() {
		
		// create array of all inline anchors
		topsArray = $inlineAnchors.map(function() {
    	return $(this).offset().top-80;  
    }).get();       
				
		// on click on a inline anchor
		$('a[href*=#]').click(function(){
				
			var index = $("ol a").index(this);			
      
      $content.animate( {scrollTop: topsArray[index]}, { 'easing': 'swing', duration: 500 } );
		});   
	}
	
	return {
		
	}
	
})();
