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
		
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

		<link href='http://fonts.googleapis.com/css?family=Wellfleet' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="../app/stylesheets/styles.css" />
		
		<script src="../app/javascripts/jquery-1.8.3.min.js" type="text/javascript"></script>
		<script src="../app/javascripts/backgroundcolor.js" type="text/javascript"></script>
		<script src="../app/javascripts/script.js" type="text/javascript"></script>				
	</head>
	
	<body class="overview-page">
		<div class="page overview">
			
		</div>
		
		
		<div class="page detail" style="display: none">
		<header class="header">
			<button class="button-action left">< my recipes</button>		
			<h1 class="header-title" data-role="recipe-title"></h1>							
		</header>
		
		<section class="section-sidebar" data-role="section-sidebar">
			<ul class="nav-tabs" data-role="nav-tabs">
				<li>
					<a href="#info" data-role="link-info" class="active">info</a>
				</li>
				<li>
					<a href="#stuff" data-role="link-stuff">stuff</a>
				</li>
				<li>
					<a href="#steps" data-role="link-steps">steps</a>
				</li>
			</ul>
			
			<div class="tab" data-role="tab">
				<div class="recipe-info open-tab" data-role="recipe-info">
					<h1 class="recipe-title" data-role="recipe-title">
						<!-- fill with title -->
					</h1>
					<div class="recipe-image" data-role="recipe-image"></div> <!-- fill with image -->
					
					<dl>
						<dt>prep time</dt>
						<dd data-role="preptime">
							<!-- fill with preptime -->
						</dd>
						
						<dt>cook time</dt>
						<dd data-role="cooktime">
							<!-- fill with cooktime -->
						</dd>
						
						<dt>ready in</dt>
						<dd data-role="totaltime">
							<!-- fill with totaltime -->
						</dd>
					</dl>
				</div>
				
				
				<!-- Tab stuff -->
				<ul data-role="ingredients" class="list-ingredients" style="display: none">
					<!-- fill with ingredients -->
				</ul>
				
				<!-- Tab steps -->
				<ol data-role="nav-steps" class="nav-steps" style="display: none">
					<!-- fill with steps -->
				</ol>
			</div>				
			
		</section>
		
		<section class="recipe" data-role="section-content">
			<div class="intro">
				
				<img src="images/pirate-logo.png" alt="Recipe Pirate" />
				
				<h2>Roll up yar sleeves, matey...<br />Time to start!</h2>
				
				<img src="images/arrow-down.png" alt="Start cooking matey" />				
			</div>
			
			<div data-role="recipe-steps" class="steps">
				<!-- fill with recipe steps -->
			</div>

			<div class="intro">
				
				<img src="images/pirate-logo.png" alt="Recipe Pirate" />
				
				<h2>You made it to shore, sailor!<br />It should look like this. Arrr!</h2>
				
				<img src="images/arrow-down.png" alt="Start cooking matey" />			
				
				<div class="recipe-image" data-role="recipe-image" ></div>	
			</div>

			
		</section>
		</div>
	</body>
</html>