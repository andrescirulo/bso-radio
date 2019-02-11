const Temporadas = { template: '<div style="text-align:center">' + 
		'<v-progress-circular mx-auto :size="70" :width="7" indeterminate color="green" v-if="temporadas.length==0"></v-progress-circular>'+
		'<v-expansion-panel v-if="temporadas.length>0" v-for="(temp,t) in temporadas" :key="t" style="margin-bottom:10px;">' + 
			'<v-expansion-panel-content @input="onOpenOrClose(temp)" class="panel-temporada-content">'+
			'<div slot="header" inset class="headline text--lighten-1 teal--text" style="padding-left:5px;">{{temp.descripcion}} ({{temp.anio}})</div>'+
			'<v-progress-circular mx-auto :size="70" :width="7" indeterminate color="green" v-if="temp.capitulos==null"></v-progress-circular>'+
			'<v-list v-if="temp.capitulos!=null">' + 
				'<v-list-tile v-for="(capitulo,c) in temp.capitulos" :key="c" avatar @click="irACapitulo(capitulo)">'+
					'<v-list-tile-content style="padding-left:25px">'+
					  '<v-list-tile-title>{{capitulo.numero}} - {{ capitulo.nombre }}</v-list-tile-title>'+
					  '<v-list-tile-sub-title>{{ capitulo.fecha }}</v-list-tile-sub-title>'+
					'</v-list-tile-content>'+
					'<v-list-tile-action>'+
					  '<v-btn v-on:click.stop class="hidden-xs-only" ripple color="cyan" dark :href="capitulo.linkDescargar" target="_blank">'+
						'Descargar'+
					  '</v-btn>'+
					  '<v-btn v-on:click.stop icon class="hidden-sm-and-up" ripple color="cyan" dark :href="capitulo.link">'+
					  	  '<v-icon color="white">file_download</v-icon>'+
					  '</v-btn>'+
					'</v-list-tile-action>'+
				'</v-list-tile>'+
			'</v-list>' +
			'</v-expansion-panel-content>' +
		'</v-expansion-panel>' +
		'</div>',
	 data () {
		return { temporadas:[]}
	 },
	 created() {
		 Vue.http.get("api/temporadas.php").then(result => {
			 result.json().then(elem =>{
				 this.temporadas = elem;
			 });
		 }, error => {
			 console.error(error);
		 });
	 },
	 methods: {
		 irACapitulo:function(capitulo){
			this.$router.push('/capitulo/' + capitulo.numero) ;
		 },
		 onOpenOrClose(temporada){
			 if (temporada.capitulos!=null){return;}
//			 let capis = new Array();
//			 for (let i=0;i<temporada.cantidadCapitulos;i++){
//				 let capi =new Object();
//				 capi.numero='';
//				 capi.fecha='';
//				 capi.nombre='';
//				 capi.link='';
//				 capis.push(capi);
//			 }
//			 temporada.capitulos = capis;
			 Vue.http.get("api/temporadas.php?t=" + temporada.numero).then(result => {
		          result.json().then(elem =>{
		        	  temporada.capitulos = elem;
		          });
		     }, error => {
		          console.error(error);
		     });
		 }
	 }
}