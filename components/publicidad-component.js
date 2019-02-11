/**
 * 
 */
Vue.component('publicidad-component',{
	template: '<v-container fluid >' + 
		'<v-layout row wrap>' + 
		  '<v-flex style="margin-bottom:20px" class="elevation-6" v-for="(pub,i) in publicidades" :key="i" xs12>' +
		  	'<a :href="pub.link">' +
				'<v-img :src="pub.imagen" :style="getStyle(pub)"  >' + 
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
	    	  {imagen:'imagenes/saludos/montehermoso.jpg',link:'https://montehermosoediciones.com.ar/index.html'},
	    	  {imagen:'imagenes/saludos/asalallena.jpg',link:'http://www.asalallena.com.ar/'},
	    	  {imagen:'imagenes/saludos/asalallena-cursos.jpg',link:'http://www.asalallena.com.ar/category/actividades-asl/cursos/'},
	    	  {imagen:'imagenes/saludos/montehermoso-libros.gif',link:'https://montehermosoediciones.com.ar/libros.html'},
	    	  {imagen:'imagenes/saludos/cartelera.gif',link:null},
	    	  {imagen:'imagenes/saludos/guillermoguareschi.jpg',link:'http://www.guillermoguareschi.com/'},
	    	  {imagen:'imagenes/saludos/argentinapodcastera.png',link:'http://www.argentinapodcastera.com.ar/'},
	    	  {imagen:'imagenes/saludos/calandacritica.jpg',link:'https://calandacritica.com/'},
	    	  {imagen:'imagenes/saludos/cinecuaderno.jpg',link:'http://cinecuaderno.blogspot.com.ar/'},
	    	  {imagen:'imagenes/saludos/larocker.png',link:'http://www.larocker.com.ar/',back:'#000000'},
	    	  {imagen:'imagenes/saludos/shinobi.png',link:'http://shinobinews.com/',back:'#000000'}
	      ]}
	},
	methods:{
		getStyle:function (pub){
			if (pub.back!=null){
				return 'background-color:' + pub.back; 
			}
			return '';
		}
	}
})