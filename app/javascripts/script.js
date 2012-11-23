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

	}
	
	$(document).ready(function(){
		init();	
	});
	
	
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
