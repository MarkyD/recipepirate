<?php

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
if ($_POST['recipe-pirate-output']){
  //$jsonOutput = stripslashes($_POST['recipe-pirate-output']);
  $jsonOutput = ($_POST['recipe-pirate-output']);
  append('../recipes/'.$userName.'.js', $jsonOutput);
  }
  /*
echo $_POST['recipe-pirate-output']; 
echo '****';
echo $jsonOutput.'<br />';  
echo '****';
*/
echo @file_get_contents('../recipes/'.$userName.'.js');
//echo stripslashes($str);
?>

