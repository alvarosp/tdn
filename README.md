# Script para las TDN #
Este script permite seleccionar tus actividades favoritas y poder verlas juntas en una lista para que sea más sencillo organizarse.

## Instalación ##
Requiere las extensiones Tampermonkey (Chrome o Safari) o Greasemonkey (Firefox) instaladas para poder ejecutar el script.

### Tampermonkey ([Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Safari](https://tampermonkey.net)) ###
1. Visita https://github.com/alvarosp/tdn/raw/master/tdn-mis_actividades.user.js
2. Cuando cargue el editor, selecciona `Install` (*NO* `Process with Chrome`).

### Greasemonkey ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)) ###
1. Visita https://github.com/alvarosp/tdn/raw/master/tdn-mis_actividades.user.js
2. Click derecho en la página y selecciona `Guardar página como` o `Save Page As`.
3. Con Firefox abierto, abre un Gestor de Archivos y navega hasta el directorio donde has descargado el script.
4. Arrastra el script a la ventana de Firefox.
5. Selecciona `Instalar`.

## Funcionamiento ##
En la lista de actividades aparecerá una estrella para añadir cada actividad a favoritos o eliminarlo si ya estaba.

![Lista de actividades](https://github.com/alvarosp/tdn/raw/master/images/shot1.png)

Junto a las pestaña "Alójate" hay una nueva pestaña "Mis Actividades", si haces click aparece un popup con la lista de actividades seleccionadas ordenadas por fecha, pudiendo eliminar todas si se desea. Haz click fuera del popup para cerrarlo.

![Vista de mis actividades](https://github.com/alvarosp/tdn/raw/master/images/shot2.png)

De momento solo funciona con las listas de actividades (Todas, Juegos de Mesa, Rol, Rol en Vivo…), pero no con Horarios ni con la página de una actividad en concreto.

## TO DO ##
* Poder eliminar cada elemento por separado desde "Mis Actividades".
* Poder añadir/eliminar las actividades en su propia página.
* Poder añadir/eliminar las actividades en la página de horarios.
* Arreglar bug Bootstrap.
* Añadir capturas al README.

## CHANGELOG ##
### v0.3 ###
* Las actividades se ordenan por fecha.
* Cambios de estilo en la tabla de mis actividades.
* Cuando se eliminan todas las actividades, se redibujan las estrellas.