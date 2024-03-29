
var hoursToGo = 0;
var minutesToGo = 27;
var secondsToGo = 43;
var startTime = new Date();       
var endTime = new Date();

var inlineScroll = (function(){
	var $sidebar,
		$content,
		$inlineAnchors,
		$tabLinks,
		$tab,
		count,
		timer;
	
	function init(){
		$sidebar = $('[data-role~="section-sidebar"]');
		$content = $('[data-role~="section-content"]');
		$tab = $('[data-role~="tab"]');		
		

		setScreenDimensions();
		setTabNavigation();
		parseOverview(recipes);
		
		
		//$('[data-role~="start-timer"]').live("click",handleTimer);
		$('[data-role~="to-my-overview"]').live("click",backToOverview);		
	}
	
	$(document).ready(function(){
		init();	
		
	});
	/*
	function handleTimer(count){
		console.log(count);
		
  		if(count === 0) {
		    clearInterval(timer);
		    //endCountdown();
		  } else {
		    $('[data-role~="start-timer"]').html(count);
		    count--;
		  }
				
	}*/


	
	function parseOverview(recipes){				
		
		var url = document.location.pathname;
		var urlsplit = url.split("/");		
		var username = urlsplit[urlsplit.length-1];
		
		$('[data-role~="user-name"]').text(username+"'s");
		
		for (var i = 0; i < recipes.length; i++) {
	    var object = recipes[i];			
			$('[data-role~=recipes-list]').append('<li><div class="image" style="background-image: url('+object.image +')"></div><h2>'+ object.name+'</h2></li>');		  
	  }  		    
		
		$('[data-role~=recipes-list] li').bind("click",navigateToDetail);    
	}
	
	function navigateToDetail(ev) {
		console.log("navigate to detail");					
		
		var index = $(ev.currentTarget).index();
		
		
		parseRecipe(recipes[index]);
		
		$('[data-role~="page-overview"]').hide();
		$('body').removeClass("overview-page");
		
		
		
		//$('[data-role~="page-detail"]').addClass("anim-in").show();		
		$('[data-role~="page-detail"]').show();
		$('[data-role~="section-content"]').scrollTop(0);
		
	};
	
	function backToOverview(){
		$('[data-role~="page-detail"]').hide();
		$('body').addClass("overview-page");
		$('[data-role~="page-overview"]').show();
		
		topsArray = [];
		$('[data-role~="next-step"]').remove();
		$('[data-role~="ingredients"],[data-role~="nav-steps"],[data-role~="recipe-steps"]').html("");		
	}
	
	function parseRecipe(object) {
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
	        	
	        	for (i=0; i < object[property].length; i++) {
	        		var value = object[property][i];
	        		$navContainer.append("<li><a href='#step"+(i+1)+"'><span class='number'>"+(i+1)+"</span>"+value.value+"</a></li");
              var strBomb = '';
              if (i == 1){
                strBomb = "<div class='bomb'><span data-role='start-timer'>"+value.duration+"</span></div>";
              }
	        		$contentContainer.append("<div id='step"+(i+1)+"' class='instruction' data-role='inline-anchor'><span class='stepnr'>"+(i+1)+"</span><p>"+value.value+"</p>" + strBomb + "</div>");
              if (i == 1){
                hoursToGo = 0;
                minutesToGo = 0;
                secondsToGo = 3;
                startTime = new Date();  
                endTime = new Date();
                endTime.setHours(
                    startTime.getHours() + hoursToGo,
                    startTime.getMinutes() + minutesToGo, 
                    startTime.getSeconds() + secondsToGo, 
                    startTime.getMilliseconds()
                );
                update();
              }

	        	};
	        }			        			        
			    //}
			};

      



  //function to update counter
  function update(){
      var currentTime = new Date();

      var remainingTime = new Date();
      remainingTime.setTime(endTime.getTime()-currentTime.getTime());
      var hours = remainingTime.getHours();
      var minutes = remainingTime.getMinutes();
      var seconds = remainingTime.getSeconds();
      if (minutes < 10){
        minutes = '0' + minutes.toString();
      }; 
      if (seconds < 10){
        seconds = '0' + seconds.toString();
      }; 
      var $el = $('[data-role~="start-timer"]');
      $el.text(minutes+":"+seconds);
      if (minutes == '00' && seconds == '00'){
        $el.parent().addClass('exploded');
        return;
      }
      //call itself every second
      setTimeout(update,500);
  }
            

      
      
		/*});
		.complete(function(){*/
		setTimeout(function(){			
			
			$('#step1').addClass("active");
			$content.append("<a href='#step2' data-role='next-step' class='button-action button-down'>Arr! Next step!</a>")
			// set inline scroll
			$inlineAnchors = $('[data-role~="inline-anchor"]');			  	
			setInlineScroll();	
			
			setNextStep();
			
			var count =$('[data-role~="recipe-steps"] .instruction').length;
			$('[data-role~="steptotal"]').text("/"+count);
		},1000);	
		//});
				
	}
	
	function setNextStep() {
		$button = $('[data-role~="next-step"]');
		
		$button.bind("click", function(ev){
			// on click on a inline anchor
			ev.preventDefault();
			
							console.log('click');
			var index = $(this).attr("href").match(/\d+/);			

      $content.animate( {scrollTop: topsArray[index-1]}, { 'easing': 'swing', duration: 500 } );
		  		  
		  if(index[0] <= topsArray.length){
		  	
		  	$thisParent = $("#step"+parseInt(index[0]-1));		  	
		  	
		  	// change background of parent		  		  	
		  	$thisParent.animate({'background-color':'#FFF','color':'#D2D2D2'},500);
		  	$thisParent.delay(500).queue(function() {
		  		$(this).find("span").addClass("done");	
		  	});
		  	
		  	var $smallNav = $('[data-role~="nav-steps"]').find('[href=#step'+parseInt(index[0]-1)+']');
		  	$smallNav.animate({'color':'#D2D2D2'});
		  	$smallNav.delay(500).queue(function() {
		  		$(this).find("span").addClass("done");	
		  	});
		  			  	
		  	// change background of next
		  	$thisParent.next().animate({'background-color':'#FFFFCC'},500);
		  	
		  	var nextHeight = $thisParent.next().innerHeight();
		  	$(this).animate( {scrollTop: topsArray[index-1]+nextHeight}, { 'easing': 'swing', duration: 500 } );
		  	
		  	// set correct link in next-button
		  	$(this).attr("href","#step"+(parseInt(index[0])+1));
		  	
		  	mast(parseInt(index[0]));
		  			  	
		  } else {
		  	$button.fadeOut();
		  	
		  	$thisParent = $("#step"+parseInt(index[0]-1));		  	
		  	
		  	// change background of parent		  		  	
		  	$thisParent.animate({'background-color':'#FFF','color':'#D2D2D2'},500);
		  	$thisParent.delay(500).queue(function() {
		  		$(this).find("span").addClass("done");	
		  	});
		  	
		  	var $smallNav = $('[data-role~="nav-steps"]').find('[href=#step'+parseInt(index[0]-1)+']');
		  	$smallNav.animate({'color':'#D2D2D2'});
		  	$smallNav.delay(500).queue(function() {
		  		$(this).find("span.stepnr").addClass("done");	
		  	});
		  	
		  	$('[data-role~="step"]').text("All");
				$('[data-role~="steptotal"]').text("");
		  }
		   
		});
	}
	
	function mast(index){
		console.log('index is'+index);
		var $pirate = $('[data-role~="pirate-in-mast"]');
		var stepsCount = $('[data-role~="recipe-steps"] .instruction').length;
		var windowHeight = $(window).height();
		console.log(stepsCount)		
				
		var step = (windowHeight-40-89)/stepsCount;
		console.log("step is"+step);
		
		var slideDown = 40+(step*index);
		console.log(slideDown);							
				
		$pirate.animate({'top':slideDown},500);		
		
		$('[data-role~="step"]').text(index-1);
		$('[data-role~="steptotal"]').text("/"+stepsCount);
		
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
								
								
		$sidebar.height(windowHeight - 100);
		$content.height(windowHeight - 100);
		$tab.height(windowHeight - 160);
		
		$content.width(windowWidth - 281);
		
		$('[data-role~="mast"]').height(windowHeight-18);
	}
	
	function setInlineScroll() {
		
		// create array of all inline anchors
		topsArray = $inlineAnchors.map(function() {
    	return $(this).offset().top-300;  
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
