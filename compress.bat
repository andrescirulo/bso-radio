@echo on
call terser components/cuaderno-zoom.js components/publicidad-component.js components/links-component.js templates/inicio.js templates/bso-escribe.js templates/texto.js templates/bso-escucha.js templates/cuadernos.js templates/capitulo.js templates/quienes-somos.js templates/temporadas.js templates/index.js -c -o templates/templates.min.js
call terser scripts/modernizr.min.js scripts/dayjs.min.js scripts/vue.min.js scripts/vue-router.min.js scripts/vuetify_1.5.9.min.js scripts/vue-resource.min.js -c -o scripts/scripts.min.js
