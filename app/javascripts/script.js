var inlineScroll = (function(){
	var $sidebar,
		$content,
		$inlineAnchors,
		$tabLinks;
	
	function init(){
		$sidebar = $('[data-role~="section-sidebar"]');
		$content = $('[data-role~="section-content"]');		
		
		setScreenDimensions();
		setTabNavigation();
		
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
								$('[data-role~="recipe-image"]').css("background-image","url('"+value+"')");
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
			        	
			        	for (i=0; i < object[property].length; i++) {
			        		var value = object[property][i];
			        		$container.append("<li>"+value+"</li");
			        	};
			        }
			        
			        if(property == "recipeInstructions"){
			        	$navContainer = $('[data-role~="nav-steps"]');
			        	$contentContainer = $('[data-role~="recipe-steps"]');
			        	
			        	console.log($contentContainer);
			        	
			        	for (i=0; i < object[property].length; i++) {
			        		var value = object[property][i];
			        		$navContainer.append("<li><a href='#step"+(i+1)+"'><span class='number'>"+(i+1)+"</span>"+value.value+"</a></li");
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
	
	function setTabNavigation(){
		var $tabLinks = $('[data-role~="nav-tabs"] a');
		
		$tabLinks.live("click",function(ev) {
			ev.preventDefault();
			
			var $this = $(this).attr("data-role");
			
			$('.open-tab').hide();
			
			if ($this == "link-info"){
				$('[data-role~="recipe-info"]').show().addClass("open-tab");
			}
			
			if($this == "link-stuff"){
				$('[data-role~="ingredients"]').show().addClass("open-tab");
			}
			
			if($this == "link-steps"){
				$('[data-role~="nav-steps"]').show().addClass("open-tab");
			}
			
			$tabLinks.removeClass("active");
			$(this).addClass("active");
		});
	}
	
	function setScreenDimensions() {		
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
								
		$sidebar.height(windowHeight - 80);
		$content.height(windowHeight - 80);
		
		$content.width(windowWidth - 281);
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
