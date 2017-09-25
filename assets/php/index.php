<?php
$fields[0] = "NAME";
$fields[1] = "DESCR";
$fields[2] = "HTML";
$fields[3] = "CSS";
$fields[4] = "JS";
$fields[5] = "PHP";

$res = 'sucs';
$home = '/home/RTFM.ru/www/data/';
$com_json = json_decode($_POST['com'],true);
//--------------------------------------------------------------------------
function read($arr){
    global $home;
    global $fields;
    $i = 1;
    $flag = true;
    $File =array();
    do {
        if (file_exists($home.$arr[Stat]."/".$i."NAME.txt")){
            $j = 0;
            foreach ($fields as $f)
            {
                if (file_exists($home.$arr[Stat]."/".$i.$f.".txt")){
                $File[$i][$j] = file($home.$arr[Stat]."/".$i.$f.".txt");
                }
            ++$j;
            }
            ++$i;   
        }else{$flag = false; if(!$File[1])$File[1][0] = 'Нет записей';}      
    } while ($flag);
    $js_json = json_encode($File);
    echo $js_json;
}

//--------------------------------------------------------------------------*/
function write_file($arr, $stat, $name, $i){
    global $home;
if ($arr[$name]){
$fh = fopen($home.$stat."/".$i."".$name.".txt", 'w');
$text = <<<_END
$arr[$name]
_END;
$text = htmlentities($text, ENT_QUOTES, 'UTF-8');
fwrite($fh, $text);
fclose($fh);
}
}
//------------------------------------------
function write($arr){
global $home;
$flag = true;
$i = 1;
global $fields;
    //считаем файлы
    do {
        if (file_exists($home.$arr[Stat]."/".$i."NAME.txt")){
        ++$i;
        }else{$flag = false;}  
    } while ($flag);
    
    //перебираем fields, пишем файл, если не пустой
    foreach ($fields as $f)
    {
    write_file($arr[text_d], $arr[Stat], $f, $i);
    }
$File = 'Запись создана';
$js_json = json_encode($File);
echo $js_json;   
}
//------------------------------------------
function edit($arr){
global $home;
global $fields;
    //перебираем fields, пишем файл, если не пустой
    foreach ($fields as $f)
    {
    if($arr[text_d][$f]=="delete_file186"){
        unlink("/home/RTFM.ru/www/data/".$arr[Stat]."/".$arr['N']."".$f.".txt");
    }else{
    write_file($arr[text_d], $arr[Stat], $f, $arr['N']);
    }
    //если строчка пустая, удаляем файл
    //arrr
    }
$File = 'Запись изменена';
$js_json = json_encode($File);
echo $js_json;
}
//--------------------------------------------------------------------------
function del($arr){
global $home;
global $fields;
//удалить файлы
foreach ($fields as $f)
{
    $fp = $home.$arr[Stat]."/".$arr['N']."".$f.".txt";
    if (file_exists($fp)){
    unlink($fp);  
    }  
}
//переименовать -1
$k = 0;
$i = $arr['N'] + 1;
$flag = true;
do {
    if (file_exists($home.$arr[Stat]."/".$i."NAME.txt")){
        $k = $i - 1;
        foreach ($fields as $f)
        {
            $fp = $home.$arr[Stat]."/".$i."".$f.".txt"; 
            if (file_exists($fp)){
            rename($fp, $home.$arr[Stat]."/".$k."".$f.".txt");  
            }
        }
        ++$i;
    }else{$flag = false;}
} while ($flag);
//*/
    $File = 'Запись удалена';
    $js_json = json_encode($File);
    echo $js_json;   
}
//------------------------------------------
function rename_two($one, $two){
global $home;
rename($one, $home."/temp.txt");
rename($two, $one);
rename($home."/temp.txt", $two);
}
//------------------------------------------
function move($arr){
global $home;
global $fields;
$File = $home.$arr[Stat]."/".$arr['N']."NAME.txt";
if($arr['move'] == 'Down'){$N = $arr['N'] + 1;}
if($arr['move'] == 'Up'){$N = $arr['N'] - 1;}
if (file_exists($home.$arr[Stat]."/".$arr['N']."NAME.txt")){
    if (file_exists($home.$arr[Stat]."/".$N."NAME.txt")){
        foreach ($fields as $f)
        {   
            $one = $home.$arr[Stat]."/".$arr['N']."".$f.".txt";
            $two = $home.$arr[Stat]."/".$N."".$f.".txt";
            //$File = 'sucs_f';
            if ((file_exists($one))&&(file_exists($two))){
            rename_two($one, $two);
            }elseif(file_exists($one)){
            rename($one, $two);
            }elseif(file_exists($two)){
            rename($two, $one);
            }
        }
    }
}
    

$js_json = json_encode($File);
echo $js_json;
}
//--------------------------------------------------------------------------
switch($com_json[Command]){
    case "read": 
        read($com_json);
        //$res = '111';
        break;
    case "write": 
        write($com_json);
        break;
    case "del": 
        del($com_json);
        break;
    case "edit": 
        edit($com_json);
        break;
    case "move": 
        move($com_json);  
        break;
}
    //$File = $com_json;
    //$js_json = json_encode($File);
    //echo $js_json;

?>