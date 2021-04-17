# Desafio MercadoLibre

## Uso
Para instalar los paquetes requeridos:
```
npm i 
```
Para iniciar el sistema:
```
npm start 
```
En caso de querer modificar el estilo desde los scss, ejecutar:
```
npm run scss
```
en otra consola para que cualquier cambio que se realice en los archivos scss, se compilen y se vean reflejados en los CSS.

## Frontend
Utilicé Handlebars (motor de plantillas) para manejar todo el front.

Para el estilo, utilizo Sass, pero con node-sass, proceso los Sass para convertirlos en archivos CSS.

Las 3 vistas son responsive. No utilicé muchos breakpoints para mejorar el diseño, ya que no había un diseño particular para seguir.


## Audits
Testee las vistas con Google Lighthouse para poder checkear usabilidad, SEO y rendimiento.

Algunos de los errores importantes que recibo es por el no poder usar https y no usar metas, ya que no sabia que info utilizar de la API para armar los tags; y por parte de la accesibilidad, el no contraste de los colores aunque utilicé los colores de las especificaciones.