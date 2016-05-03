<?php
error_reporting(7);
set_magic_quotes_runtime(0);
if(function_exists('date_default_timezone_set')){date_default_timezone_set('Hongkong');}

function Add_S($array){
	foreach($array as $key=>$value){
		if(!is_array($value)){
			$value=str_replace("&#x","& # x",$value);
			$value=preg_replace("/eval/i","eva l",$value);
			!get_magic_quotes_gpc() && $value=addslashes($value);
			$array[$key]=$value;
		}else{
			$array[$key]=Add_S($array[$key]); 
		}
	}
	return $array;
}
function unicode_encode($name){
    $name = iconv('gbk', 'UCS-2', $name);
	
    $len = strlen($name);
    $str = '';
    for ($i = 0; $i < $len - 1; $i = $i + 2){
        $c = $name[$i];
        $c2 = $name[$i + 1];
        if (ord($c) > 0){
            $str .= '\u'.base_convert(ord($c), 10, 16).str_pad(base_convert(ord($c2), 10, 16), 2, 0, STR_PAD_LEFT);
        }else {
            $str .= $c2;
        }
    }
    return $str;
}



$_POST=Add_S($_POST);
$_GET=Add_S($_GET);

$cb = isset($_GET['callback'])?trim($_GET['callback']):'';
$type = isset($_GET['type'])?trim($_GET['type']):'';

function To_data($str,$cb=0){
	if($cb){
		echo $cb.'('.$str.')';
	}else{
		echo $str;
	}
}

To_data('{"title" : "hello world"}',$cb);

?>