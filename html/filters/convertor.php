<?php
/**
 * Created by PhpStorm.
 * User: kholmatov
 * Date: 19/10/14
 * Time: 17:29
 */
//'0' => array(
//    'name' => 'Форсунки CAT 3116 № 127-8225',
//    'price' => '9850'
//),
$mass='<?php
    $zarr = array(';
$f = fopen("file.csv", "rt") or die("Ошибка!");
for ($i=0; $data=fgetcsv($f,1000,";"); $i++) {
    $num = count($data);
    //echo "<h3>Строка номер $i (полей: $num):</h3>";
    for ($c=0; $c<$num; $c++){
        $object = explode(",", $data[$c]);
        $mass.= '
        "'.$i.'" => array(
            "name" => "'.trim(str_replace("|", ",", $object[0])).'",
            "price" => "'.trim($object[1]).'"
        ),
        ';
    }
}
fclose($f);
$mass.= '
);
?>';

echo $mass;

$ResultFile = '/home/user1167773/www/moyi-zapchasti.ru/array.php';
// Открываем файл для получения существующего содержимого
$current = file_get_contents($ResultFile);
// Добавляем нового человека в файл
$current = $mass;
// Пишем содержимое обратно в файл
file_put_contents($ResultFile, $current);