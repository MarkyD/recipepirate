var captains = {};

captains.log = function(){
  if (document.location.search.indexOf('debug' ) === -1){
    return;
  }
/*  */
if( ('addEventListener' in window) && ('JSON' in window) ) {
  
  if(!document.getElementById("log")) {
    var list = document.createElement("ul")
    var list = document.createElement("ul")
    list.setAttribute("id","log")
    list.setAttribute("style","position:fixed;top:50%;left:10%;width:80%;height:50%;z-index:999999;margin:0;padding:0;font: 14px Consolas,monospace;white-space:pre-wrap;color:#000;background:rgba(255,255,0,.5);border:1px solid rgba(0,0,0,.2);overflow:scroll;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;")
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
          description: 'text'
        };
        
        
        
        var recipeData = {
        
        };
        
        
        
        // (internal) settings
        var settings = {
            searchElements: ['div', 'h1', 'h2', 'meta', 'span', 'img', 'li'],
            searchString: '',
            pirateDomain: document.location.toString().indexOf('localhost') != -1 ? 
              'http://localhost/recipepirate/' : 
              'http://staging.fabriquehq.nl/recipepirate/mark/',
            robbedRecipeImage: 'images/robbed_recipe.png',
            userName: null
        };
        
        var popupHTML = '\
          <div id="HijackThis">\
            <section class="perkament">\
              <form id="pirate-form" action="##settings.pirateDomain##" method="POST" target="_blank">\
                <textarea name="output" id="recipe-pirate-output" style="display:none;"></textarea>\
                <div class="container">\
                  <img class="recipe-image" src="##recipeData.image##" alt="##recipeData.name##">\
                  <div class="recipe-save-form">\
                    <h1>##recipeData.name##</h1>\
                    <p>\
                      rob &amp; save this recipe to:\
                    </p>\
                    <span class="url">\
                      www.recipepirate.com/\
                    </span>\
                    <input type="text" id="userslug" placeholder="piratename" /><br />\
                    <span class="error"></span>\
                  </div>\
                </div>\
                <div class="recipe-actions">\
                  <input type="submit" class="button-action" value="Rob this recipe!" />\
                </div>\
              </form>\
            </section>\
          </div>\
        ';
        
        
        
        
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
            
            });
            scrape();
            createPopup();
        };
        
        createPopup = function() {
        //<link rel="stylesheet" href="/static/CACHE/css/8d546a25a16d.css" type="text/css"
          loadStylesheet('http://fonts.googleapis.com/css?family=Wellfleet' + '&' + (Math.random() * 100000));
          captains.log(settings.pirateDomain + 'bookmarklet/takeover.css'  + '?' + (Math.random() * 100000));
          loadStylesheet(settings.pirateDomain + 'bookmarklet/takeover.css'  + '?' + (Math.random() * 100000));
          
          //Yikes (different priorities): 
          popupReplaceHTML('settings.pirateDomain', settings.pirateDomain);
          popupReplaceHTML('recipeData.image', recipeData.image);
          popupReplaceHTML('recipeData.name', recipeData.name);
          //end Yikes
          $('body').append(popupHTML);
          $('#recipe-pirate-output').val(JSON.stringify(recipeData));
          $('#pirate-form').on('submit',function(event){
            var userName = $('#userslug').val();
            settings.userName = userName;
            if (userName == ''){
              $('#pirate-form .error').html('dumbass landlubber');
              return false;
            }
            $(this).attr({'action': settings.pirateDomain + 'put/' + userName});
            /* stop form from submitting normally */
            event.preventDefault(); 
                
            /* get some values from elements on the page: */
            var $form = $( this ),
                output = $form.find( 'textarea[name="output"]' ).val(),
                url = $form.attr( 'action' );

            /* Send the data using post and put the results in a div */
            $.post( url, { output: output },
              function( data ) {
                  /*$("#pirate-form").html(data);
                  $("#result-user-title").html(recipeData.name);
                  var userLink  = $("#result-user-link");
                  userLink.html('www.recipepirate.com/pirates/'  + settings.userName);
                  userLink.attr({'href': settings.pirateDomain + 'pirates/' + settings.userName});
                  $("#button-whatever").on('click',
                    function(){
                      $('#HijackThis').fadeOut();
                    }
                  );*/
                  
              }
            );
            
            //FIXME: no crossomain shite, faf
            var resultHTML = '\
              <div class="container">\
                  <h1>Yarr!!!</h1>\
                  <p>\
                    The recipe <strong id="result-user-title"></strong>\
                    has been robbed and saved!\
                  </p>\
                  <p>\
                    You can find the kitchenfriendly view\
                    at <a id="result-user-link" href="#"></a>\
                  </p>\
              </div>\
              <div class="recipe-actions">\
                <input type="button" id="button-whatever" class="button-action" value="Okay, whatever" />\
              </div>';
              $("#pirate-form").html(resultHTML);
              $("#result-user-title").html(recipeData.name);
              var userLink  = $("#result-user-link");
              userLink.html('www.recipepirate.com/pirates/'  + settings.userName);
              userLink.attr({'href': settings.pirateDomain + 'pirates/' + settings.userName});
              $("#button-whatever").on('click',
                function(){
                  $('#HijackThis').fadeOut();
                }
              );
                  
            //return false;
          });
        };
        /*
        
        */
        popupReplaceHTML = function(needle, replacement) {
          if (typeof replacement != 'undefined'){
            var re = new RegExp('##' + needle + '##','g');
            popupHTML = popupHTML.replace(re, replacement);
          }
          else {
            //alert(needle);
          };
        }
        
        loadStylesheet = function(href){
          var link = $("<link>");
          link.attr({
            type: 'text/css',
            rel: 'stylesheet',
            href: href
          });
          $("head").append( link );
          return link;
        };

        scrape = function() {
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
                  $els.attr({'src': settings.pirateDomain + 'bookmarklet/' + settings.robbedRecipeImage});
                  $els.css({'position': 'static'}); //food.com hack
                  captains.log(settings.pirateDomain + 'bookmarklet/' + settings.robbedRecipeImage);
                  break;
                  
                case 'duration':
                  value = $els.attr('content');
                  $els.html('recipes robbed! arggh');
                  break;

                case 'ingredients':
                  value = [];
                  $els.each(function(index) {
                      value.push($(this).text());
                      $(this).html('recipes robbed! arggh');
                  });
                  break;    

                case 'instructions':
                  value = [];
                  var $list = $els.find('li div.txt'); //TODO: food.com specfic
                  $list.each(function(index) {
                      //captains.log($(this).text());
                      value.push({value: $(this).text(), duration: 'PT50M'});
                      $(this).html('recipes robbed! arggh');
                  });
                  //captains.log(value);
                  break;
                  
                default: //text
                  value = $els.text();
                  $els.html('recipes robbed! arggh');
                  
              }
              recipeData[i] = value;
              //$els.text('recipe robbed, arghh');
            }
            //captains.log(recipeData);
            //captains.log('***Captions.log: ' + new Date() + ': pirating library loaded***\n\n');
        };
        
        //TODO preparsing is faster
        var buildSearch = function(itemProp) {
          var str = ['[itemprop="' + itemProp + '"]'];
          return settings.searchElements.join(str + ',') + str;
        };
        

        var foo_private_method = function() {
            // code goes here
        };
        
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
    };

})(jQuery);



$('body').pirateRecipe({

});