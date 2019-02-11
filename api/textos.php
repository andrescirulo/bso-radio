<?php
require_once 'domain/texto.php';
require_once 'connect.php';

header('Content-Type: application/json');
session_save_path('sessions');
session_start();
$publico=" AND texto_publico=1";
if (isset($_SESSION["admin"]) && $_SESSION["admin"] === true){
    $publico="";
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET["t"])){
        $idTexto=$_GET["t"];
        $query = "SELECT texto_id, texto_titulo,texto_contenido,texto_autor, texto_subtitulo, texto_fecha, texto_resenia,texto_imagen FROM textos WHERE texto_id=?" . $publico;
        
        $st = $dbh->prepare($query);
        $st->bindParam(1,$idTexto);
        $st->execute();
        $resData = $st->fetch();
        $texto = new Texto();
        $texto->id=$resData["texto_id"];
        $texto->titulo=$resData["texto_titulo"];
        $texto->subtitulo=$resData["texto_subtitulo"];
        $texto->fecha=$resData["texto_fecha"];
        $texto->resenia=$resData["texto_resenia"];
        $texto->imagen=$resData["texto_imagen"];
        $texto->autor=$resData["texto_autor"];
        $texto->texto=$resData["texto_contenido"];
        
        echo json_encode($texto);
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
            $queryCount = "SELECT COUNT(*) cant FROM textos WHERE 1=1" . $publico;
            $st = $dbh->prepare($queryCount);
            $st->execute();
            $resData = $st->fetch();
            $info['paginas']=ceil($resData["cant"]/($LIMITE*1.0));
        }
        
        $textos=array();
        
        $query = "SELECT texto_id, texto_titulo,texto_autor, texto_subtitulo, texto_fecha, texto_resenia,texto_imagen_resenia,texto_seccion";
        $query.= " FROM textos WHERE 1=1" . $publico . " ORDER BY texto_id DESC LIMIT 10 OFFSET " . $offset;
        
        $st = $dbh->prepare($query);
        $st->execute();
        while ($resData = $st->fetch()) {
            $texto = new Texto();
            $texto->id=$resData["texto_id"];
            $texto->titulo=$resData["texto_titulo"];
            $texto->subtitulo=$resData["texto_subtitulo"];
            $texto->fecha=$resData["texto_fecha"];
            $texto->resenia=$resData["texto_resenia"];
            $texto->imagen=$resData["texto_imagen_resenia"];
            $texto->autor=$resData["texto_autor"];
            $texto->seccion=$resData["texto_seccion"];
            $textos[]=$texto;
        }
        $info['textos']=$textos;
        
        echo json_encode($info);
    }
}
?>