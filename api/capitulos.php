<?php
require_once 'domain/capitulo.php';
require_once 'domain/temporada.php';
require_once 'connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET["t"])){
        $capitulos = array();
        
        $query = "SELECT capi_temporada,capi_numero, capi_nombre,capi_link FROM capitulos WHERE capi_temporada=? AND capi_publico=1";
        $st = $dbh->prepare($query);
        $st->bindParam(1,$_GET["t"]);
        $st->execute();
        while ($resData = $st->fetch()) {
            $capitulo = new Capitulo();
            $capitulo->temporada = $resData["capi_temporada"];
            $capitulo->numero = $resData["capi_numero"];
            $capitulo->nombre = $resData["capi_nombre"];
            $capitulo->linkDescargar = $resData["capi_link_descargar"];
            $capitulos[] = $capitulo;
        }
        
        echo json_encode($capitulos);
    }
    elseif (isset($_GET["c"])){
        $query = "SELECT capi_temporada,capi_numero, capi_nombre,capi_link_descargar,capi_link_escuchar,capi_fecha,capi_texto,IFNULL(capi_imagen,'default_capitulo.jpg') capi_imagen FROM capitulos WHERE capi_numero=? AND capi_publico=1";
        $st = $dbh->prepare($query);
        $st->bindParam(1,$_GET["c"]);
        $st->execute();
        $resData = $st->fetch();
        $capitulo = new Capitulo();
        $capitulo->temporada = $resData["capi_temporada"];
        $capitulo->fecha= $resData["capi_fecha"];
        $capitulo->numero = $resData["capi_numero"];
        $capitulo->nombre = $resData["capi_nombre"];
        $capitulo->linkDescargar = $resData["capi_link_descargar"];
        $capitulo->linkEscuchar = $resData["capi_link_escuchar"];
        $capitulo->texto = $resData["capi_texto"];
        $capitulo->imagen = $resData["capi_imagen"];
    
        echo json_encode($capitulo);
    }
    elseif (isset($_GET["r"])){
        $capitulos = array();
        $idRef=$_GET["r"];
        $query = "SELECT capi_temporada,capi_numero, capi_nombre,capi_fecha,capi_imagen FROM capitulos WHERE capi_numero<>? AND capi_publico=1 ORDER BY capi_fecha desc LIMIT 5";
        $st = $dbh->prepare($query);
        $st->bindParam(1,$idRef);
        $st->execute();
        while ($resData = $st->fetch()) {
            $capitulo = new Capitulo();
            $capitulo->fecha = $resData["capi_fecha"];
            $capitulo->numero = $resData["capi_numero"];
            $capitulo->nombre = $resData["capi_nombre"];
            $capitulo->imagen = $resData["capi_imagen"];
            $capitulos[] = $capitulo;
        }
        
        echo json_encode($capitulos);
    }
    else{
        $capitulos = array();
        
        $query = "SELECT capi_temporada,capi_numero, capi_nombre,capi_link_descargar,capi_fecha,capi_texto,IFNULL(capi_imagen,'default_capitulo.jpg') capi_imagen FROM capitulos WHERE capi_publico=1 ORDER BY capi_numero DESC LIMIT 10";
        $st = $dbh->prepare($query);
        $st->execute();
        while ($resData = $st->fetch()) {
            $capitulo = new Capitulo();
            $capitulo->temporada = $resData["capi_temporada"];
            $capitulo->fecha= $resData["capi_fecha"];
            $capitulo->numero = $resData["capi_numero"];
            $capitulo->nombre = $resData["capi_nombre"];
            $capitulo->linkDescargar = $resData["capi_link_descargar"];
            $capitulo->texto = $resData["capi_texto"];
            $capitulo->imagen = $resData["capi_imagen"];
            $capitulos[] = $capitulo;
        }
        
        echo json_encode($capitulos);
    }
}

?>