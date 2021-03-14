<?php
$url = 'https://h.eick-at.de/housepower/PowerServlet';
  $contents = file_get_contents($url);
  
  //If $contents is not a boolean FALSE value.
  if($contents !== false)
  {
      //Print out the contents.
      echo $contents;
       //echo json_decode($contents,true)["data"][0]["tuples"][0][1];
  }
?>
