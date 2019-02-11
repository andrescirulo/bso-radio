<?php
require_once 'domain/entrevista.php';
require_once 'connect.php';

header('Content-Type: application/json');
session_save_path('sessions');
session_start();
$publico=" AND entr_publico=1";
if (isset($_SESSION["admin"]) && $_SESSION["admin"] === true){
    $publico="";
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET["e"])){
    }
    else{
        $LIMITE = 10;
        $pagina=0;
        if (isset($_GET["p"])){
            $pagina=($_GET["p"]-1);
        }
        $offset = $LIMITE*$pagina;
        
        $info= array();
        
        if (!isset($_GET["tp"]) || $_GET["tp"]==0){
            $queryCount = "SELECT COUNT(*) cant FROM entrevistas WHERE 1=1" . $publico;
            $st = $dbh->prepare($queryCount);
            $st->execute();
            $resData = $st->fetch();
            $info['paginas']=ceil($resData["cant"]/($LIMITE*1.0));
        }
        
        $entrevistas=array();
        $query = "SELECT entr_id, entr_titulo, entr_fecha,entr_texto,entr_link,entr_autor, IFNULL(entr_imagen,'default_entrevista.jpg') entr_imagen,entr_ivoox";
        $query .= " FROM entrevistas WHERE 1=1" . $publico . " ORDER BY entr_fecha DESC LIMIT 10 OFFSET " . $offset;
                
        $st = $dbh->prepare($query);
        $st->execute();
        while ($resData = $st->fetch()) {
            $entrevista = new Entrevista();
            $entrevista->id=$resData["entr_id"];
            $entrevista->titulo=$resData["entr_titulo"];
            $entrevista->fecha=$resData["entr_fecha"];
            $entrevista->imagen=$resData["entr_imagen"];
            $entrevista->texto=$resData["entr_texto"];
            $entrevista->link=$resData["entr_link"];
            $entrevista->autor=$resData["entr_autor"];
            $entrevista->ivoox=$resData["entr_ivoox"];
            $entrevistas[]=$entrevista;
        }
        
        $info['entrevistas']=$entrevistas;
        echo json_encode($info);
    }
}
?>