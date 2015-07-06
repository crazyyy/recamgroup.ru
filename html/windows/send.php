<?php
/**
 * Created by PhpStorm.
 * User: kholmatov
 * Date: 13/10/14
 * Time: 19:56
 */
    //client_hodovoy
    //client_code
    //client_comment
    //client_phone

    date_default_timezone_set ('Europe/Moscow');

    if(isset($_POST['client_comment'])) $client_comment = $_POST['client_comment']; else $client_comment = " - ";
    if(isset($_POST['client_phone'])) $client_phone = $_POST['client_phone']; else exit;
    if(isset($_POST['client_email'])) $client_email = $_POST['client_email']; else $client_email = " - ";

    $message = "
        <table width='600' border='1' bordercolor='#B6B6B6' align='center' cellspacing='0' cellpadding='0' style='border:1px solid #B6B6B6; border-collapse:collapse; background-color:#FFF; margin-top:15px; margin-bottom:10px;'>
            <tr><td colspan='3' style='text-align:center; background-color:#619FCE; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#fff; font-weight:bold; padding:15px;'>Заявка:&nbsp;&nbsp;&nbsp;[&nbsp;".date ("F d,Y H:i:s a")."&nbsp;]</td>
            <tr>
            <td align='left' valign='top' width='270' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#6D6D6D; font-weight:bold; background-color:#ECF7FF; padding:10px 5px 10px 10px;'>телефон:</td>
            <td colspan='2' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000; font-weight:normal; padding:10px 5px 10px 10px;'>".$client_phone."</td>
            </tr>
            <tr>
            <td align='left' valign='top' width='270' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#6D6D6D; font-weight:bold; background-color:#ECF7FF; padding:10px 5px 10px 10px;'>Email:</td>
            <td colspan='2' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000; font-weight:normal; padding:10px 5px 10px 10px;'>".$client_email."</td>
            </tr>
            <tr>
            <td align='left' valign='top' width='270' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#6D6D6D; font-weight:bold; background-color:#ECF7FF; padding:10px 5px 10px 10px;'>комментарий:</td>
            <td colspan='2' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000; font-weight:normal; padding:10px 5px 10px 10px;'>".$client_comment."</td>
            </tr>

            </table>
        ";

   $subject     = "Заявка на запчасти о наличии и цене";

require_once "SendMailSmtpClass.php";
$mailSMTP = new SendMailSmtpClass('recamgr@mail.ru', '9257650656v', 'smtp.mail.ru', 'recamgr',465);
$to = "recamgr@gmail.com";
$headers     = "MIME-Version: 1.0\r\n";
$headers    .= "Content-type: text/html; charset=utf-8\r\n";
$headers    .= "From: <recamgr@mail.ru>\r\n";
//$result =  $mailSMTP->send($to, $subject, $message, $headers);
$result = mail($to,$subject,$message,$headers);

if($result === true){
    echo "Письмо успешно отправлено";
}else{
    echo "Письмо не отправлено. Ошибка: " . $result;
}
?>