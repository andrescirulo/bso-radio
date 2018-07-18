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

const routes = [
  { path: '/', component: Inicio },
  { path: '/temporadas', component: Temporadas },
  { path: '/bso-escribe', component: BsoEscribe },
  { path: '/bso-escucha', component: BsoEscucha },
  { path: '/cuadernos', component: Cuadernos },
  { path: '/quienes-somos', component: QuienesSomos },
  { path: '/capitulo/:id', component: Capitulo },
  { path: '/texto/:id', component: Texto },
  
]

const router = new VueRouter({
	  routes//short for `routes: routes`
	})

router.beforeEach((to, from, next) => {
	 if (from.fullPath==="/" && to.fullPath!=="/") {
		 const carousel=this.document.getElementById('el-carousel');
		 carousel.classList.remove('carousel-animation-in')
		 carousel.classList.remove('carousel-animation-out')
		 carousel.classList.add("carousel-animation-out");
     }
	 if (from.fullPath!=="/" && to.fullPath=="/") {
		 const carousel=this.document.getElementById('el-carousel');
		 carousel.classList.remove('carousel-animation-in')
		 carousel.classList.remove('carousel-animation-out')
		 carousel.classList.add("carousel-animation-in");
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
		{ src:'imagenes/carousel/4.png'},
		{ src:'imagenes/carousel/5.webp'},
		{ src:'imagenes/carousel/6.webp'},
		{ src:'imagenes/carousel/7.webp'},
	]}},
	mounted(){
		updateMinHeight();
	}
}).$mount('#app')


//router.push('/inicio');