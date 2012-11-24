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
        };
        
        var popupHTML = '\
          <div id="HijackThis">\
            <section class="perkament">\
              <form id="pirate-form" action="##settings.pirateDomain##" method="POST" target="_blank">\
                <textarea name="recipe-pirate-output" id="recipe-pirate-output"></textarea>\
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
            if (userName == ''){
              $('#pirate-form .error').html('dumbass landlubber');
              return false;
            }
            $(this).attr({'action': settings.pirateDomain + 'put/' + userName});
            //return false;
          });
        };
        
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


var recipes = [



{"image":"http://food.sndimg.com/img/recipes/99/47/6/large/picCijHRN.jpg","name":"The Best Easy Beef and Broccoli Stir-Fry","url":"http://www.food.com/recipe/the-best-easy-beef-and-broccoli-stir-fry-99476","prepTime":"PT15M","cookTime":"PT10M","totalTime":"PT25M","recipeYield":"1 (167 g)","ingredients":["\n\t\t\t\t\t\t\t3  tablespoons  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tcornstarch, divided\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1/2 cup  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\twater, plus \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t2  tablespoons  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\twater, divided\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1/2 teaspoon  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tgarlic powder \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1  lb    boneless round steak or 1  lb  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tcharcoal \n\t\t\t\t\t\t\tchuck steak, cut into thin 3-inch strips\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t2  tablespoons  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\tvegetable oil, divided\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t4  cups  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tbroccoli florets\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1  small  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tonion, cut into wedges \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1/3 cup  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\treduced sodium soy sauce \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t2  tablespoons  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tbrown sugar\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1  teaspoon  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tground ginger \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\thot \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tcooked rice \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t"],"recipeInstructions":[{"value":"In a bowl, combine 2 tablespoons cornstarch, 2 tablespoons water and garlic powder until smooth.","duration":"PT50M"},{"value":"Add beef and toss.","duration":"PT50M"},{"value":"In a large skillet or wok over medium high heat, stir-fry beef in 1 tablespoon oil until beef reaches desired doneness; remove and keep warm.","duration":"PT50M"},{"value":"Stir-fry broccoli and onion in remaining oil for 4-5 minutes.","duration":"PT50M"},{"value":"Return beef to pan.","duration":"PT50M"},{"value":"Combine soy sauce, brown sugar, ginger and remaining cornstarch and water until smooth; add to the pan.","duration":"PT50M"},{"value":"Cook and stir for 2 minutes.","duration":"PT50M"},{"value":"Serve over rice.","duration":"PT50M"}],"description":"This recipe easily rivals the beef & broccoli found at ANY local Chinese restaurant. So delicious, but I made a few minor changes: I used 2 minced garlic cloves in addition to garlic powder, minced fresh ginger rather than ground, and I added sesame oil.  I also let the beef (I used thin sirloin steaks) marinate for about 30 mins. before cooking.  This is so delicious - can't wait to try it next w/ chicken and/or shrimp.Excellent...finally a recipe for beef and broccoli that is great!!! Only thing I did differently was skip the dredging of the beef in cornstarch/water/garlic powder. Only because I felt my round steak strips needed marinating, I made the sauce mixture and marinated the steak strips in it for a few hours. Made a huge difference. Then proceeded with the cooking process as described. Also, added 2 garlic cloves minced and 1/4 tsp of crushed red peppers to the sauce as suggested by others. Outstanding recipe, thanks for sharing....still saying \"yummy\"!I've made this twice, the only changes were using chicken and doubling the sauce, and my whole family loves it!  That's quite an accomplishment in this house!  Thanks so much for the recipe!"},{"image":"http://food.sndimg.com/img/recipes/22/17/6/large/picEhAf75.jpg","name":"Classic Baked Ziti","url":"http://www.food.com/recipe/classic-baked-ziti-22176","prepTime":"PT20M","cookTime":"PT30M","totalTime":"PT50M","recipeYield":"1 (142 g)","ingredients":["\n\t\t\t\t\t\t\t1  lb  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tlean ground beef \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1  cup  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tonion, chopped \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t2    \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tgarlic cloves, minced\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1 (32  ounce) jar \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\tmeatless sauce\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1  cup  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tchicken broth \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1  teaspoon  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tdried oregano leaves \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1 (16  ounce) package \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tziti pasta, cooked and drained\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t   \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tshredded \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tmozzarella cheese \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t","\n\t\t\t\t\t\t\t1  cup  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tgrated \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tparmesan cheese \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t"],"recipeInstructions":[{"value":"Preheat oven to 350 degrees F.","duration":"PT50M"},{"value":"In a large skillet, cook ground beef, onions, and garlic over medium-high heat for 6 to 8 minutes or until beef is browned; stirring frequently.","duration":"PT50M"},{"value":"Stir in spaghetti sauce, chicken broth, and oregano.","duration":"PT50M"},{"value":"Reduce heat and simmer for 10 minutes.","duration":"PT50M"},{"value":"Stir 1 cup of the sauce into the cooked ziti noodles.","duration":"PT50M"},{"value":"Spoon 1/2 of the ziti mixture into a 13x9x2-inch baking dish.","duration":"PT50M"},{"value":"Sprinkle with 1 1/2 cups mozzarella cheese and 1/2 cup Parmesan cheese.","duration":"PT50M"},{"value":"Top with 2 cups sauce, then remaining ziti mixture and remaining sauce.","duration":"PT50M"},{"value":"Cover and bake 20 minutes.","duration":"PT50M"},{"value":"Sprinkle with remaining mozzarella and Parmesan cheese.","duration":"PT50M"},{"value":"Return to oven and bake uncovered for 10 minutes or until heated through.","duration":"PT50M"}],"description":"You know, I had never had baked ziti before - even eating out. I found this recipe when I was \"on the prowl\" for something totally different a couple of nights ago. Followed the recipe to a tee (except I subbed salt-free homemade meatless sauce and low-sodium chicken broth so that I could enjoy it without feeling guilty!) and BINGO! I was in business. Served it with a very crisp green salad topped with very spicy Greek olive oil dressing and my homemade sourdough croutons, and it was a meal to remember.Delicious. I added lots of sliced mushrooms with the mince because I love them. I will make this again many times.This was another great dish.  Made plenty, ate the leftovers the next day, it tasted even better if that is possible."}


];

alert(recipes[1].image);