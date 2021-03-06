# Script para las TDN #
Este script permite seleccionar tus actividades favoritas y poder verlas juntas en una lista para que sea más sencillo organizarse.

## Instalación ##
Requiere las extensiones Tampermonkey (Chrome o Safari) o Greasemonkey (Firefox) instaladas para poder ejecutar el script.

Una vez instalada la extensión puedes ir por ejemplo a [la lista de actividades](http://www.jornadas-tdn.org/actividades/lista/jornadas-tierra-de-nadie-2015) y deberían aparecer las estrellas en cada actividad para poder marcarla como favoritos, así como el botón "Mis Actividades".

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

Se pueden añadir actividades a favoritos desde las listas de actividades (Todas, Juegos de Mesa, Rol, Rol en Vivo…), la página de una actividad en concreto o desde la web de Horarios, aunque desde esta última no se puede acceder a "Mis Actividades".

## TO DO ##
* Poder eliminar cada elemento por separado desde "Mis Actividades".
* Añadir extensión al CSV que se exporta.
* Botón "Mis Actividades" en Horarios.

## CHANGELOG ##
### v1.0.1 ###
* Arreglado bug www.
* Cambio tamaño estrella en actividad.
### v1.0.0 ###
* Se pueden añadir actividades a favoritos desde Horarios.
* Se puede añadir una actividad a favoritos desde su propia página.
* Se puede descargar la lista de "Mis Actividades" en formato CSV.
* Arreglado el bug de Bootstrap.
* Reestructuración de código para que sea más fácil gestionar distintos paths.
* Cambiada la forma en la que se guardan los tipos de eventos para que se pueda exportar el CSV.
* Altura fija del modal de "Mis Actividades".

### v0.3 ###
* Las actividades se ordenan por fecha.
* Cambios de estilo en la tabla de mis actividades.
* Cuando se eliminan todas las actividades, se redibujan las estrellas.