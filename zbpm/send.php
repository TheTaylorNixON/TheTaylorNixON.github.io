<?php
error_reporting(85);
header("Content-Type: text/html; charset=UTF-8");


$mail_to = "avrinov.s@gmail.com"; // E-mail на который будут отправляться уведомления
$mail_from = "mail@".$_SERVER['HTTP_HOST']; $mail_from_name = $_SERVER['HTTP_HOST']; // E-mail с которого будут отправляться уведомления ($_SERVER['HTTP_HOST'] - домен текущего сайта)
$mail_subject = "Заявка"; // Тема уведомлений


$labels = array(
	"name" => "Имя", 
	"email" => "E-mail", 
	"phone" => "Телефон", 
);



$mail_boundary = "boun".md5(uniqid())."dary";
$mail_headers = array("MIME-Version: 1.0", "From: =?UTF-8?B?".base64_encode($mail_from_name)."?= <".$mail_from.">", "Content-Type: multipart/mixed; boundary=\"".$mail_boundary."\"");
if(preg_match("/^[^\n]+\@[^\n]+\.[^\n]+$/u", trim($_POST['email']))){$mail_headers[] = "Reply-To: ".trim($_POST['email']);}

$mail_message = ""; foreach($_POST as $k=>$v){
if(is_array($v)&&$v){$mail_message .= (($labels[trim($k)])?$labels[trim($k)]:htmlspecialchars(trim($k))).":<br>"; foreach($v as $k2=>$v2){if($v2 = trim($v2)){$mail_message .= "&nbsp;".(is_numeric(trim($k2))?"":(($labels[trim($k2)])?$labels[trim($k2)]:htmlspecialchars(trim($k2))).": ")."<b>".nl2br(htmlspecialchars($v2))."</b><br>";}}}
else{$v = trim($v); if($v&&$v!="undefined"){$mail_message .= (($labels[trim($k)])?$labels[trim($k)]:htmlspecialchars(trim($k))).": <b>".nl2br(htmlspecialchars($v))."</b><br>";}}
}


$mail_message1 = "--".$mail_boundary."
Content-Type: text/html; charset=\"UTF-8\"
Content-Transfer-Encoding: base64

".base64_encode($mail_message)."

--".$mail_boundary;


foreach($_FILES as $v){
if($v['type']&&$v['tmp_name']){
$mail_message1 .= "
Content-Disposition: attachment; filename=\"=?UTF-8?B?".base64_encode($v['name'])."?=\"
Content-Type: ".$v['type']."; name=\"=?UTF-8?B?".base64_encode($v['name'])."?=\"
Content-Transfer-Encoding: base64

".base64_encode(file_get_contents($v['tmp_name']))."

--".$mail_boundary;
}
}


if(trim($_POST['phone'])&&mail($mail_to, "=?UTF-8?B?".base64_encode($mail_subject)."?=", $mail_message1, implode("\r\n", $mail_headers))){
echo "1"; exit;
}else{echo "Error";}
?>