<?php

	function getImgBaseDir(){
		return str_replace( DIRECTORY_SEPARATOR . 'api', DIRECTORY_SEPARATOR  . 'imagenes',getcwd());
	}

	function crearThumbConMinimo($dire,$archivo,$minDim)
	{
		$base_img_dir=getImgBaseDir();
		$source= $base_img_dir . DIRECTORY_SEPARATOR . $dire . DIRECTORY_SEPARATOR . $archivo;
		
		if ($minDim==null){
			return $source;
		}
		
		list($width_s, $height_s, $type, $attr) = getimagesize($source, $info2); // obtengo informacion del archivo
				
		if ($width_s<$height_s){
			$width_d=$minDim;
			$height_d=round($height_s*($width_d/$width_s));
		}
		else{
			$height_d=$minDim;
			$width_d=round($width_s*($height_d/$height_s));
		}
		
		$dirDest = $base_img_dir . DIRECTORY_SEPARATOR  . 'thumbnails' . DIRECTORY_SEPARATOR . $dire . DIRECTORY_SEPARATOR . $width_d . "_" . $height_d . DIRECTORY_SEPARATOR;
		$dest = $dirDest . $archivo;
		
		if (!file_exists($dest))
		{
			
			$gd_s = imagecreatefromjpeg($source); // crea el recurso gd para el origen
			$gd_d = imagecreatetruecolor($width_d, $height_d); // crea el recurso gd para la salida
			
			imagecopyresampled($gd_d, $gd_s, 0, 0, 0, 0, $width_d, $height_d, $width_s, $height_s); // redimensiona
			if (!file_exists($dirDest)){
				mkdir($dirDest,0755,true);
			}
			imagejpeg($gd_d,$dest,90); // graba
			// Se liberan recursos
			imagedestroy($gd_s);
			imagedestroy($gd_d);
			
		}
		return $dest;
	}
	
?>
