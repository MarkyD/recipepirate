var captains = {};

captains.log = function(){
  if (document.location.search.indexOf('debug' ) === -1){
    return;
  }
/*  */
if( ('addEventListener' in window) && ('JSON' in window) ) {
  
  if(!document.getElementById("log")) {
    var list = document.createElement("ul")
    list.setAttribute("id","log")
    list.setAttribute("style","position:fixed;top:80%;left:10%;width:80%;height:20%;z-index:10000;margin:0;padding:0;font:80%/1 Consolas,monospace;white-space:pre-wrap;color:#000;background:rgba(255,255,0,.5);border:1px solid rgba(0,0,0,.2);overflow:scroll;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;")
    document.body.appendChild(list)
    
    list.addEventListener('click', function(){
      this.style.display = 'none'
    })
  }

  // Allow pretty-print option:
  var space = (arguments[0]==='  ') ? '  ' : false;
  document.getElementById("log").style.display = 'block'
  document.getElementById("log").insertAdjacentHTML("afterbegin", "<li>" + JSON.stringify(Array.prototype.slice.call(arguments), null, space) + "</li>")
}
/*  */
  for( index in arguments ) {
    console.log( arguments[index] )
  }
/*  */
};


// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// changed by MDI, argggh

(function($) {
    
  var pluginName = "pirateRecipe"; 
    
	$[pluginName] = function(element, options) {
        
        // defaults
        var defaultOptions = {
            foo: 'bar',
            onFoo: function() {} // default callback
        };
        
        var recipeData = {
          name: null,
          author: null,
          url: null,
          datePublished: null,
          image:null,
          description: null,
          prepTime: null,
          cookTime: null,
          recipeYield: null,
          nutrition: null, //TODO: later
          ingredients: [],
          recipeInstructions: null,
          interactionCount: null
        };
        
        // (internal) settings
        var settings = {
            active: 'ok'
        };
        
        // scoping helper inside events eg
        var plugin = this;
        
        // global element reference
        var $element = $(element),
             element = element;
        
        //constructor
        var init = function() {
            settings = $.extend({}, settings, defaultOptions, options);
            // code goes here
            $element.on('click', function(){
            
            })
            plugin.scrape();
        }

        this.scrape = function() {
            var header = $('h1[itemprop="name"]');
            captains.log($('h1[itemprop="name"]').html());
            header.text('recipe robbed, arghh');
            
            recipeData.
        }
        

        var foo_private_method = function() {
            // code goes here
        }
        
        // initialize
        init();

    }

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (undefined == $(this).data(pluginName)) {
                var plugin = new $[pluginName](this, options);
                $(this).data(pluginName, plugin);
            }
        });
    }

})(jQuery);

captains.log('pirating library loaded');

$('body').pirateRecipe({

});