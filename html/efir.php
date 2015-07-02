<?php
/**
 * Created by PhpStorm.
 * User: kholmatov
 * Date: 19/10/14
 * Time: 17:29
 */
if(isset($_GET['command'])=='getResult'){
    include('array.php');
    $n = count($zarr);
    $rnd_index = rand(0,$n-1);
    $price=trim($zarr[$rnd_index]['price']);
    $price_mine = $price+($price/100*25);
    $result=array(
        'result_name'=>$zarr[$rnd_index]['name'],
        'price_mine'=>number_format(intval(round($price_mine,0)), 0, ',', ' '),
        'price'=>number_format(intval($price), 0, ',', ' ')
    );
    echo json_encode($result);
}