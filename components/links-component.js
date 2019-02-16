/**
 * 
 */
Vue.component('links-component',{
	template: '<v-container fluid >' + 
		'<v-layout row wrap>' + 
		  '<v-flex style="margin-bottom:20px" :style="getFlexStyle(link)" :class="getFlexClass(link)"  v-for="(link,i) in links" :key="i">' +
		  	'<a :href="link.link">' +
				'<v-img :src="link.imagen" class="transparent elevation-6" :style="getImgStyle(link)">' + 
		    		'<v-layout slot="placeholder" fill-height align-center justify-center ma-0>' + 
		    			'<v-progress-circular indeterminate color="orange"></v-progress-circular>' + 
					'</v-layout>' + 
				'</v-img>' + 
			'</a>' +
		  '</v-flex>' + 
		'</v-layout>' + 
		'</v-container>',
	data () {
	      return { links:[
	    	  {imagen:'imagenes/links/facebook.webp',link:'https://www.facebook.com/bsoradio/',sml:true,pad:5},
	    	  {imagen:'imagenes/links/instagram.webp',link:'https://www.instagram.com/bsoradio/',sml:true,pad:5},
	    	  {imagen:'imagenes/links/twitter.webp',link:'https://twitter.com/BSOradio',sml:true,pad:5},
	    	  {imagen:'imagenes/links/itunes.webp',link:'https://itunes.apple.com/ar/podcast/bso-banda-sonora-original-temporada-7-2018/id1396781627?mt=2',rad:3},
	    	  {imagen:'imagenes/links/ivoox.webp',link:'http://www.ivoox.com/escuchar-bso-banda-sonora-original_nq_91917_1.html'},
	    	  {imagen:'imagenes/links/mixcloud.webp',link:'https://www.mixcloud.com/bsoradio/'},
	    	  {imagen:'imagenes/links/youtube.webp',link:'https://www.youtube.com/channel/UCAwA_hNlgUomg0wAZa18DFA'},
	      ]}
	},
	methods:{
			getFlexClass:function(link){
				let style='xs12';
				if (link.sml!=null && link.sml===true){
					style='xs4';
				}
				return style;
			},
			getFlexStyle:function(link){
				let style='';
				if (link.pad!=null){
					style+='padding-right:' + link.pad + 'px';
					style+=';padding-left:' + link.pad + 'px';
				}
				return style;
			},
			getImgStyle:function(link){
				let style='';
				if (link.rad!=null){
					style+='border-radius:' + link.rad + 'px';
				}
				return style;
			}
	}
})