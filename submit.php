<?php

$status = true;
$message = "Het is gelukt";
//DB Connection
$servername = "localhost";
$username = "erian";
$password = "29erB2hHUv2o";

//Create MySQLi
$conn = new mysqli($servername, $username, $password, 'erian_form');

try {

  $fname = $_POST['Voornaam'];
  $lname = $_POST["Achternaam"];
  $geslacht = $_POST["geslacht"];

  $date = $_POST["datum"];
  $land = $_POST["Nationaliteit"];
  $tel = $_POST["Telefoonnummer"];

  $antwoord = $_POST["antwoord"];
  $adres = $_POST["adres"];
  $school = $_POST["school"];

  if (empty($adres)) 
  {
    $message = "Je hebt je adres niet ingevuld";
    echo json_encode(array(
      $status = false,
      "status" => $status,
      "message" => "$message"
    ));
    return false;
  }

  elseif (empty($school)) 
  {
    $message = "Je hebt je school niet ingevuld";
    echo json_encode(array(
      $status = false,
      "status" => $status,
      "message" => "$message"
    ));
    return false;
  }

//Check for errors
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }


  $stmt = $conn->prepare("INSERT INTO form_entries (voornaam,achternaam,geslacht,geboortedatum,nationaliteit,telefoonnummer,ja_nee,adres,school) VALUES (?,?,?,?,?,?,?,?,?)");
  $stmt->bind_param("sssssssss", $fname, $lname, $geslacht, $date, $land, $tel, $antwoord, $adres, $school);
  $stmt->execute();


  if ($stmt) {
    $status = true;
    $message = "je formulier is verzonden";
  }
}
catch (Exception $e) {
  $message = $e->getMessage();
  $status = false;
}
echo json_encode(array(
  "status" => $status,
  "message" => $message
));