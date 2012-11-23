var inlineScroll = (function(){
	var $sidebar,
		$content,
		$inlineAnchors;
	
	function init(){
		$sidebar = $('[data-role~="section-sidebar"]');
		$content = $('[data-role~="section-content"]');		
		
		setScreenDimensions();
		
		
		parseRecipe();
	}
	
	$(document).ready(function(){
		init();	
	});
	
	
	function parseRecipe() {

		
		
		$.getJSON("http://localhost/recipepirate/bookmarklet/beautiful_json.js", function(data){			

			
			for (var i = 0; i < data.length; i++) {
			    var object = data[i];
			    for (property in object) {
			        var value = object[property];
							
							if(property == "name"){
								$('[data-role~="recipe-title"]').text(value);
							}
																
							if(property == "image"){
								$('[data-role~="recipe-image"]').attr("src",value);
							}									
										 
							if(property == "prepTime"){
								$('[data-role~="preptime"]').text(value);
							}
							if(property == "cookTime"){
								$('[data-role~="cooktime"]').text(value);
							}										 	
							if(property == "totalTime"){
								$('[data-role~="totaltime"]').text(value);
							}										 									 
										        
			        if(property == "ingredients"){
			        	$container = $('[data-role~="ingredients"]');			        				        	
			        	
			        	$container.append("<li>"+value+"</li");/*
			        	for (i=0; i < object[property].length; i++) {
			        		var value = object[property][i];
			        		
			        	};*/
			        }
			        
			        if(property == "recipeInstructions"){
			        	$navContainer = $('[data-role~="nav-steps"]');
			        	$contentContainer = $('[data-role~="recipe-steps"]');
			        	
			        	console.log($contentContainer);
			        	
			        	for (i=0; i < object[property].length; i++) {
			        		var value = object[property][i];
			        		$navContainer.append("<li><a href='#step"+(i+1)+"'>"+value.value+"</a></li");
			        		$contentContainer.append("<div id='step"+(i+1)+"' class='instruction' data-role='inline-anchor'>"+value.value+"</div>");			        					        		
			        	};
			        }			        			        
			    }
			}
		}).complete(function(){
			
			// set inline scroll
			$inlineAnchors = $('[data-role~="inline-anchor"]');			
			setInlineScroll();	
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
		$('a[href*=#]').live("click", function(){							
			var index = $(this).attr("href").match(/\d+/);			
      
      $content.animate( {scrollTop: topsArray[index-1]}, { 'easing': 'swing', duration: 500 } );
		});   
	}
	
	return {
		
	}
	
})();
