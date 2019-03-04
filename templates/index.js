String.prototype.padLeft = function (paddingValue) {
   return String(paddingValue + this).slice(-paddingValue.length);
};

function updateMinHeight(){
	document.getElementById('main-panel').style.minHeight=(window.innerHeight+10) + "px";
}

function scrollToTop(){
	scrollTo(document.documentElement,0,500);
}

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}

let navBar=document.getElementById("navBar");
window.onscroll = function(){setStickyBar();}
	
function setStickyBar(){
	if (sticky>0 && navBar!=null){
		if (window.pageYOffset > sticky) {
			navBar.classList.add("bar-sticky");
		} else {
			navBar.classList.remove("bar-sticky");
		}
	}
}

//Get the offset position of the navbar
let sticky = navBar.offsetTop;

const routes = [
  { path: '/', component: Inicio },
  { path: '/inicio/:pagina', component: Inicio },
  { path: '/temporadas', component: Temporadas },
  { path: '/bso-escribe/:pagina', component: BsoEscribe },
  { path: '/bso-escucha/:pagina', component: BsoEscucha },
  { path: '/cuadernos', component: Cuadernos },
  { path: '/quienes-somos', component: QuienesSomos },
  { path: '/capitulo/:id', component: Capitulo },
  { path: '/texto/:id', component: Texto },
  
]

const router = new VueRouter({
	  routes//short for `routes: routes`
	})

router.beforeEach((to, from, next) => {
	//DE ACUERDO AL TAMANIO ME FIJO SI TENGO QUE ANALIZAR QUE HAGO CON EL CAROUSEL
	const carousel=this.document.getElementById('el-carousel');
	if (carousel!=null){
		if ((from.fullPath==="/" || from.fullPath.startsWith("/inicio/")) && to.fullPath!=="/" && !to.fullPath.startsWith("/inicio/")) {
//			const carousel=this.document.getElementById('el-carousel');
//			if (from.matched.length==0){
//				router.app.$root.carouselVisible=false;
//			}
//			else{
				router.app.$root.carouselVisible=true;
				carousel.classList.remove('carousel-animation-in')
				carousel.classList.remove('carousel-animation-out')
				carousel.classList.add("carousel-animation-out");
//			}
	    }
		if (from.fullPath!=="/" && !from.fullPath.startsWith("/inicio/") && (to.fullPath=="/" || to.fullPath.startsWith("/inicio/"))) {
			router.app.$root.carouselVisible=true;
			carousel.classList.remove('carousel-animation-in')
			carousel.classList.remove('carousel-animation-out')
			carousel.classList.add("carousel-animation-in");
		}
	}
	scrollTo(document.documentElement,0,1000);
	next();
})

new Vue({
	router,
    data () {
	      return { imagenes:[
					{ src:'imagenes/carousel/1.webp'},
					{ src:'imagenes/carousel/2.webp'},
					{ src:'imagenes/carousel/3.webp'},
					{ src:'imagenes/carousel/4.webp'},
					{ src:'imagenes/carousel/5.webp'},
					{ src:'imagenes/carousel/6.webp'},
					{ src:'imagenes/carousel/7.webp'}],
				  imagenGrande:false,
				  timer:null,
				  paginas: [
					  { titulo:'Inicio',ruta:'/inicio/1',icono:'home'},
					  { titulo:'Temporadas',ruta:'/temporadas',icono:'assignment'},
					  { titulo:'¡BSO Escribe!',ruta:'/bso-escribe/1',icono:'create'},
					  { titulo:'¡BSO Escucha!',ruta:'/bso-escucha/1',icono:'mic'},
					  { titulo:'Quienes Somos',ruta:'/quienes-somos',icono:'face'},
					  { titulo:'¡Cuadernos!',ruta:'/cuadernos',icono:'chrome_reader_mode'},
				  ],
				  menu:false
	}},
	mounted(){
		updateMinHeight();
		this.timer=setInterval(this.setImagenInicial,200);
		if (Modernizr.webp==true){
			this.$root.$webp='&webp=1';
	    }
		else{
			this.$root.$webp='';
		}
	},
	methods:{
		mostrarCarousel: function() {
			return this.$vuetify.breakpoint.lgAndUp;
		},
		setImagenInicial: function(){
			let subcontainer=document.getElementById('submain-panel');
			if (subcontainer!=null && subcontainer.offsetWidth>50){
				clearInterval(this.timer);
				this.mostrarImagenGrande();
				let navBar=document.getElementById("navBar");
//				sticky=navBar.offsetTop;
			}
		},
		mostrarImagenGrande: function(){
			let subcontainer=document.getElementById('submain-panel');
			if (subcontainer==null){return true;}
			this.imagenGrande=(subcontainer.offsetWidth>720);
		},
		addMetaData: function(url,title,image,description){
			this.addMetaTag("og:url",url);
			this.addMetaTag("og:type","website");
			this.addMetaTag("og:title",title);
			this.addMetaTag("og:image",image);
			this.addMetaTag("og:description",this.stripHtml(description));
		},
		addMetaTag:function(name,content){
			var meta = document.createElement('meta');
			meta.name = name;
			meta.content = content;
			document.getElementsByTagName('head')[0].appendChild(meta);
		},
		stripHtml:function (html){
		   var tmp = document.createElement("DIV");
		   tmp.innerHTML = html;
		   return tmp.textContent || tmp.innerText || "";
		}
	}
}).$mount('#app')


//router.push('/inicio');