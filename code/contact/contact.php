<?php
if (isset($_POST["send"])) {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $subject = $_POST["subject"];
  $body = $_POST["body"];
  $errors = array();
  
  $email_matcher = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*" .
  "@" .
  "[a-z0-9-]+" .
  "(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/";
  
  if (preg_match($email_matcher, $email) == 0) {
    array_push($errors, "You did not enter a valid email address");
  }
  if (count($errors) == 0) {
    $to = "joe@awesomeco.com"; // your email
    $subject = "[Generated from awesomeco.com] " . $subject;
    
    $from = $name . " <" . $email . ">";
    $headers = "From: " . $from;
    
    if (!mail($to, $subject, $body, $headers)) {
      array_push($errors, "Mail failed to send.");
    }
  }
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Awesome Web Development - Contact Us</title>
    <style type="text/css">
      body {
        font-size: 12px;
        font-family: Verdana;
      }
    
      #contact-form {
        width: 320px;
      }
    
      #contact-form label {
        display: block;
        margin: 10px 0px;
      }
    
      #contact-form input, #contact-form textarea {
        padding: 4px;
      }
    
      #contact-form .full-width {
        width: 100%;
      }
    
      #contact-form textarea {
        height: 100px;
      }
      .errors h3, .errors li {
        color: #FF0000;
      }
    
      .errors li {
        margin: 5px 0px;
      }
    </style>

  </head>
  <body>
  
    <h2>Contact Us</h2>
    <p>
      Please fill out this quick form to send us an email. We are excited 
      to hear from you!
    </p>
  
    <form id="contact-form" action="contact.php" method="post">
      <?php if (count($errors) > 0) : ?>
        <h3>There were errors that prevented the email from sending</h3>

        <ul class="errors">
          <?php foreach($errors as $error) : ?>
            <li><?php echo $error; ?></li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>
    
      <label for="name">Name</label>
      <input class="full-width" type="text" name="name">
    
      <label for="email">Your Email</label>
      <input class="full-width" type="text" name="email">
    
      <label for="subject">Subject</label>
      <input class="full-width" type="text" name="subject" 
             value="Web Consulting Inquiry">
    
      <label for="body">Body</label>
      <textarea class="full-width" name="body"></textarea>

      <input type="submit" name="send" value="Send">

    </form>

  </body>
</html>
