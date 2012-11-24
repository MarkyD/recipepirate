<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>Recipe Pirate</title>
		<meta name="description" content="" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />


	<link href='http://fonts.googleapis.com/css?family=Wellfleet' rel='stylesheet' type='text/css'>
	<style type="text/css">
	
	html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: Arial;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
	
	body {
		background-color: #382418;
	}

	.bg {
		width: 1024px;
		height: 1500px;
		position: relative;
		margin: 0 auto;
		background: url('bookmarklet/images/bookmarklet.png');
	}
	
		a {
				background-color: #742703;
				display: block;
				float: left;
				position: absolute;
				top: 293px;
				left: 135px;
				text-decoration: none;
				cursor: pointer;
				-webkit-border-radius: 5px;
				border-radius: 5px;
				font-size: 37px;
				height: 62px;
				line-height: 62px;
        margin-top:10px;
				padding: 0 10px;
				color: white;
				border: none;
				-webkit-appearance:none;
				font-family: Wellfleet;
			}
</style>
</head>
<body>
	


<div class="bg">
	<a href="javascript:(function () {  
  if (!($ = window.jQuery)) {
    script = document.createElement( 'script' );  
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
    document.body.appendChild(script);
  }
}());">Rob this Recipe!</a>
	
</div>	
<h1>aaaaaaaaight</h1>

</body>

<script>
  
</script>
</html>