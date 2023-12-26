<?php
    $admin_email = 'marcom_twm@straitsproperties.com.sg';
    
if (isset($_POST)) {
        $salutation = $_POST['salutation'];
        $name = $_POST['name'];
        $contact = $_POST['contact'];
        $email = $_POST['email'];
        $enquiry = $_POST['enquiry'];
        $message = $_POST['message'];
    }
    
   $to_email = $admin_email;
   $subject = "Contact Us Enquiry by " .$salutation . " " . $name;
   $message = "Salutation: " . $salutation . "<br>". "Name: " . $name . "<br>" . "Contact Number: ". $contact . "<br>" . "Email: " . $email . "<br>" . "Enquiry: ". $enquiry . "<br>". "Message: " . $message;
  
   // To send HTML mail, the Content-type header must be set
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    
    // Create email headers
    $from = "donotreply@email.com";
    $headers .= 'From: '.$from."\r\n".
        'Reply-To: '.$from."\r\n" .
        'X-Mailer: PHP/' . phpversion();

   if ( mail($to_email, $subject, $message, $headers)) {
      echo("success");
   } else {
      echo("failed");
   }
?>
