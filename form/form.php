<?php
// hide the errors
error_reporting( 0 );

$name    = $_POST['cs_form_name'];
$email   = $_POST['cs_form_email'];
$message = $_POST['cs_form_message'];

$to  = "example@gmail.com";
$sub = "Enquiry From Your Productions Website";

$email_message = '<html>
<head>
    <title>Enquiry From Your Productions Website</title>
</head>
<body>
<table>
	<tr>
        <th align="left">NAME:</th>
        <td align="left">' . $name . '</td>
    </tr>
    <tr>
        <th align="left">EMAIL:</th>
        <td align="left">' . $email . '</td>
    </tr>
    <tr>
        <th align="left">MESSAGE:</th>
        <td align="left">' . $message . '</td>
    </tr>
</table>
</body>
</html>
';

//Headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: <" . $email . ">";

//send mail
$mail = mail( $to, $sub, $email_message, $headers );

if ( $mail ) {
	echo 'Your mail was sent successfully';
} else {
	echo 'Error';
}