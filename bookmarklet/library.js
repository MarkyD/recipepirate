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
    list.setAttribute("style","position:fixed;top:50%;left:10%;width:80%;height:50%;z-index:10000;margin:0;padding:0;font: 14px Consolas,monospace;white-space:pre-wrap;color:#000;background:rgba(255,255,0,.5);border:1px solid rgba(0,0,0,.2);overflow:scroll;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;")
    document.body.appendChild(list)
    
    list.addEventListener('click', function(){
      //this.style.display = 'none'
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
        
        var recipeScheme = {
          image: 'image',
          name: 'text',
          url: 'text',
          url: 'text',
          prepTime: 'duration',
          cookTime: 'duration',
          totalTime: 'duration',
          recipeYield: 'text',
          ingredients: 'ingredients', // array with filtering quantity (nth)
          recipeInstructions: 'instructions', //possible parsing of steps and time per step
          
          //nice to have
          description: 'text',
          /*,
          
          name: null,
          author: null,
          url: null,
          datePublished: null,
          
          description: null,
          prepTime: null,
          cookTime: null,
          recipeYield: null,
          nutrition: null, //TODO: later
          //ingredients: [],
          recipeInstructions: null,
          interactionCount: null*/
        };
        
        var recipeData = {
        
        };
        
        // (internal) settings
        var settings = {
            searchElements: ['div', 'h1', 'h2', 'meta', 'span', 'img', 'li'],
            searchString: '',
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
            /*var header = $('h1[itemprop="name"]');
            captains.log($('h1[itemprop="name"]').html());
            header.text('recipe robbed, arghh');
            */
            //alert(buildSearch('name') + '***');
            
            for (var i in recipeScheme){
              var $els = $(buildSearch(i));
              var value = null;
              switch (recipeScheme[i]){
              
                case 'image':
                  //TODO: fix for sites with no absolute URL for images
                  value = $els.attr('src');
                  break;
                  
                case 'duration':
                  value = $els.attr('content');
                  break;

                case 'ingredients':
                  value = [];
                  $els.each(function(index) {
                      value.push($(this).text());
                  });
                  break;    

                case 'instructions':
                  value = [];
                  var $list = $els.find('li div.txt'); //TODO: food.com specfic
                  $list.each(function(index) {
                      //captains.log($(this).text());
                      value.push({value: $(this).text(), duration: 'PT50M'});
                  });
                  //captains.log(value);
                  break;
                  
                default: //text
                  value = $els.text();
              }
              recipeData[i] = value;
              //$els.text('recipe robbed, arghh');
            }
            captains.log(recipeData);
            //captains.log('***Captions.log: ' + new Date() + ': pirating library loaded***\n\n');
        }
        
        //TODO preparsing is faster
        var buildSearch = function(itemProp) {
          var str = ['[itemprop="' + itemProp + '"]'];
          return settings.searchElements.join(str + ',') + str;
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



$('body').pirateRecipe({

});