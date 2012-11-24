<?php
DEFINE("MAGIC_QUOTES_GPC", ini_get("magic_quotes_gpc")); 

function append($file, $data)
{
  // Append if the fila already exists...
  if (file_exists($file))
  {
    file_put_contents($file,  ','.$data, FILE_APPEND);
    // Note: use LOCK_EX if an exclusive lock is needed.
    // file_put_contents($file,  $data, FILE_APPEND | LOCK_EX);
  }
  // Otherwise write a new file...
  else
  {
    file_put_contents($file, $data);
  }
}

$userName  = $_GET['username'];
//echo $userName;
if ($_POST['output']){
  if(MAGIC_QUOTES_GPC) { 
    //echo 'quotes';//'$name = $_POST['data']; 
    $jsonOutput = stripslashes($_POST['output']);
  } 
  else { 
    //$name = addslashes($_POST['data']); 
    //echo 'no quotes';
    $jsonOutput = ($_POST['output']);
  }
  append('../recipes/'.$userName.'.js', $jsonOutput);
  }
  
//echo @file_get_contents('../recipes/'.$userName.'.js');
//echo stripslashes($str);
?>
<div class="container">				
    <h1>Yarr!!!</h1>
    <p>
      The recipe <strong id="result-user-title">[title]</strong>
      has been robbed and saved!
    </p>
    <p>
      You can find the kitchenfriendly view
      at <a id="result-user-link" href="#">www.recipepirate.com/pocaripat</a>
    </p>
</div>
<div class="recipe-actions">
  <input type="button" id="button-whatever" class="button-action" value="Okay, whatever" />
</div>