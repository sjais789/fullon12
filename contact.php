<?php

require 'connection.php';
$conn    = Connect();
$name    = $conn->real_escape_string($_POST['InputName']);
$email   = $conn->real_escape_string($_POST['InputEmail']);
$subj    = $conn->real_escape_string($_POST['InputSubject']);
$message = $conn->real_escape_string($_POST['InputMessage']);
$query   = "INSERT into he_cform (InputName,InputEmail,InputSubject,InputMessage) VALUES('" . $name . "','" . $email . "','" . $subj . "','" . $message . "')";
$success = $conn->query($query);

if (!$success) {
    die("Couldn't enter data: ".$conn->error);

}

echo "Thank You For Contacting Us <br>";

$conn->close();

?>