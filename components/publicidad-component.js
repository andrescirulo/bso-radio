/**
 * 
 */
Vue.component('publicidad-component',{
	template: '<v-container fluid >' + 
		'<v-layout row wrap>' + 
		  '<v-flex style="margin-bottom:20px" class="elevation-6" v-for="(pub,i) in publicidades" :key="i" xs12>' +
		  	'<a :href="pub.link">' +
		  		'<video v-if="mostrarVideo(pub)" :src="getVideoUrl(pub)" class="video-style" autoplay loop muted ></video>' + 
				'<v-img v-else :src="pub.imagen" :style="getStyle(pub)"  >' + 
		    		'<v-layout slot="placeholder" fill-height align-center justify-center ma-0>' + 
		    			'<v-progress-circular indeterminate color="orange"></v-progress-circular>' + 
					'</v-layout>' + 
				'</v-img>' + 
			'</a>' +
		  '</v-flex>' + 
		'</v-layout>' + 
		'</v-container>',
	data () {
	      return { publicidades:[
	    	  {imagen:'imagenes/saludos/montehermoso.webp',link:'https://montehermosoediciones.com.ar/index.html'},
	    	  {imagen:'imagenes/saludos/asalallena.webp',link:'http://www.asalallena.com.ar/'},
	    	  {imagen:'imagenes/saludos/asalallena-cursos.webp',link:'http://www.asalallena.com.ar/category/actividades-asl/cursos/'},
	    	  {imagen:'imagenes/saludos/montehermoso-libros.gif',link:'https://montehermosoediciones.com.ar/libros.html',animado:true},
	    	  {imagen:'imagenes/saludos/cartelera.gif',link:null,animado:true},
	    	  {imagen:'imagenes/saludos/guillermoguareschi.webp',link:'http://www.guillermoguareschi.com/'},
	    	  {imagen:'imagenes/saludos/argentinapodcastera.webp',link:'http://www.argentinapodcastera.com.ar/'},
	    	  {imagen:'imagenes/saludos/calandacritica.webp',link:'https://calandacritica.com/'},
	    	  {imagen:'imagenes/saludos/cinecuaderno.webp',link:'http://cinecuaderno.blogspot.com.ar/'},
	    	  {imagen:'imagenes/saludos/larocker.webp',link:'http://www.larocker.com.ar/',back:'#000000'},
	    	  {imagen:'imagenes/saludos/shinobi.webp',link:'http://shinobinews.com/',back:'#000000'}
	      ]}
	},
	methods:{
		getStyle:function (pub){
			if (pub.back!=null){
				return 'background-color:' + pub.back; 
			}
			return '';
		},
		mostrarVideo: function(pub){
			return (pub.animado!=null && pub.animado===true && Modernizr.video && (Modernizr.video.h264 || Modernizr.video.webm));
		},
		getVideoUrl: function(pub){
			if (Modernizr.video.webm){
				return pub.imagen.replace('.gif','.webm');
			}
			else if (Modernizr.video.h264) {
				return pub.imagen.replace('.gif','.mp4');
			}
		}
	}
})