**Prueba B1** 

**Foodex Yummi! (recetas de comida)**

Kevin Javier Chacón

Estudiante en software EPN



**Datos generales del proyecto**

Nombre del estudiante: Kevin Javier ChacÃ³n

Nombre del proyecto: Foodex Yummi!

Tema seleccionado: Recetas de comida

API utilizada: TheMealDB

Link de la API: https://www.themealdb.com/api.php

TecnologÃ­as utilizadas:

* Ionic Angular Standalone
* Capacitor
* Supabase Authentication
* TheMealDB API
* Capacitor Camera
* LocalStorage

Repositorio de GitHub:

* https://github.com/xGlitchWolfx/FoodexYummi



**Parte 1: creando el proyecto**

Primero creamos nuestro proyecto base usando:



* ionic start miApp --type=angular
* tabs
* standalone



De esta forma empezamos el proyecto ahora decidí escoger el tema de

Recetas ya que mi pc es Impar
Ahora vamos con el desarrollo de la aplicación

**Parte 2: Desarrollo**

Para desarrollar una 4ta pestaña (y en general implementar mas pestañas)
decidí replicar el como fue creada la pestaña 3
Después en *Tabs.routes.ts* en la linea 24 implemente el código para implementar

una nueva pestaña la cual es:



*{*

&#x20; *path: 'tab4',*

&#x20; *loadComponent: () =>*

&#x20;   *import('../tab4/tab4.page').then((m) => m.Tab4Page),*

*},*



Esto hace que Ionic/Angular pueda cargar la nueva tab

y por ultimo en *tabs.page.html* en la linea 17 implemente:



*<ion-tab-button tab="tab4" href="/tabs/tab4">*

&#x20; *<ion-icon aria-hidden="true" name="Home"></ion-icon>*

&#x20; *<ion-label>Tab 4</ion-label>*

*</ion-tab-button>*



Para que la app en general pueda tener mas de una pestaña en este caso usaremos 4 
una pestaña que sirva como login/register 
una pestaña que sirva para ver el listado de recetas disponibles
una pestaña que sirva para ver la receta que seleccionamos
y una ultima pestaña que sirva para editar nuestro perfil (es decir tomarnos una foto o cargar una de la galería para foto de perfil)


<Captura para mostrar iconos>


En esta parte decidí cambiar los iconos por 4 nuevos para que tenga mas sentido lo que estamos viendo
en todo caso decidí cambiar los iconos por los 4 vistos en la captura los cuales son:



* id-card: para login
* images: para el listado de recetas tipo galería
* pencil: para ver la receta seleccionada
* person: para la edición del perfil (foto de perfil, uso de cámara, etc)



<Captura A2>



Después procederemos con la edición de los nombres de las tabs y con eso estaría terminada esta parte 



**Parte 2.1 Consumo del API**
Para esta parte consumiremos el API que en mi caso es el de TheMealDB un api para ver recetas de comida

Primero generamos un servicio nuevo creando una carpeta llamada "Services" y en esta agregaremos *recetas.service.ts* la cual en su interior tendrá la lógica para consumir el api



<Captura A3>



De esa manera ahora llamamos a la API

Ahora en la pestaña 2 mostraremos a modo de galería una receta a escoger mientras que en la pestaña 3 mostraremos la receta seleccionada por el usuario 



**Parte 2.2 Pestaña "lista de recetas"**

En esta pestaña se verá a modo de lista las recetas disponibles que tenemos para esto en recetas.service.ts usaremos una lógica para llamar a las recetas disponibles

una vez hecho esto solo quedaría editar nuestra pestaña 2 con los elementos que necesitamos mostrar es decir el titulo de la receta y la imagen de dicha receta en formato de galería
lo cual quedaría de la siguiente manera:


<Captura A4>



Donde podemos buscar las recetas por nombre y aparecerán de igual manera como se ve en la captura de pantalla



La pestaña 2 permite buscar recetas por nombre mediante un *ion-searchbar*

Al cargar la pantalla se realiza una búsqueda inicial de recetas con el término *chicken* para mostrar por defecto esas recetas 



como precaución decidí agregar una funcionalidad para que cuando alguien busque una receta que no exista aparezca un mensaje de error


<Captura A6>



Entonces al seleccionar una receta esta nos hará un movimiento hacia la pestaña 3 donde podremos saber mas sobre esta receta seleccionada

**Parte 2.3 Pestaña "Receta"**

Esta pestaña funciona en conjunto con la pestaña 2 ya que al seleccionar una receta de la lista de recetas aca se mostrara la receta que hemos seleccionado para poder ver mas a fondo como esta se hace en si misma es decir los detalles para esto se consume el endpoint `lookup.php?i=` de TheMealDB para obtener la información completa de esa receta.

<Captura A5>



Se vería de esta manera para que la foto se vea centrada y circular decidí usar *tab3.page.scss* para darle el diseño que busco el cual fue hacer que se vea circular y centrado 



También se implementaron estados básicos de interfaz: mensaje cuando no existe una receta seleccionada, indicador de carga mientras se consulta la API y mensaje de error si no se puede obtener la información.


De esta manera queda concluido el apartado de consumir el api de las recetas



**Parte 3 Sistema de Registo y Login**

Usando Login SupaBase en este caso creamos una cuenta en la pagina de la API de supabase para después con las variables de entorno poder empezar a crear la lógica pero antes de esto debemos instalar supabase en nuestro proyecto usando


npm install @supabase/supabase-js



Y luego en *src/environments/environment.ts*

agregar las claves y la API para que el programa lo pueda consumir de manera estable y segura

usando esto podemos registrarnos en la app y asi podremos usarla ya que la app no se podrá usar a menos que se tenga una cuenta creada y correo verificado (para mayor seguridad dado que la app tuviera micro transacciones o sistemas de pagos) esta pestaña junto con la de perfil tienen una interacción la cual es que si ya estamos en sesión activa la pestaña Autenticación se ocultara de la barra y se volverá a mostrar si de casualidad cerramos sesión 

aquí como se vería esta pestaña de Login/Register



<Captura B1>



Mientras mantengamos la sesión abierta la pestaña de login/register se ocultara temporalmente por ahora Perfil solo funciona para esto pero en breve agregaremos las funcionalidades de cámara y etc 

**Parte 4 Edición de perfil**
En esta parte trabajaremos la parte de la cámara - fotos - almacenaje de fotos etc



Puesto que la pestaña 4 AUN no tiene nada vamos a trabajar de cero primero haremos la instalación del sistema de uso de cámara
el cual es el siguiente código en la terminal



npm install @capacitor/camera



y seguir el tutorial de la documentación al pie de la letra



De esta manera podremos editar nuestro perfil dentro de la app además de que la foto se queda almacenada localmente en la misma para que no se quite cuando salgamos de la app y la cerremos 



La configuración consiste en llamar al capacitor de la cámara 



&#x20; async cambiarFoto(source: CameraSource) {

&#x20;   const foto = await Camera.getPhoto({

&#x20;     quality: 80,

&#x20;     resultType: CameraResultType.DataUrl,

&#x20;     source,

&#x20;   });



&#x20;   this.fotoPerfil = foto.dataUrl ?? '';

&#x20;   localStorage.setItem(this.claveFotoPerfil, this.fotoPerfil);

&#x20; }



lo cual se hace con las siguientes líneas de código de esta manera cambiamos la foto de perfil sea o no con cámara 



para que la foto se vea circular usamos:



ion-card {

&#x20; max-width: 420px;

&#x20; margin: 24px auto;

}



ion-card-content {

&#x20; display: grid;

&#x20; gap: 16px;

}



.foto-perfil {

&#x20; width: 256px;

&#x20; height: 256px;

&#x20; margin: 0 auto;

&#x20; border-radius: 50%;

&#x20; object-fit: cover;

}



p {

&#x20; margin: 0;

&#x20; text-align: center;

}



<Captura B3>


Con esto tenemos terminado el proyecto de la prueba B1



**Parte 5: InstalaciÃ³n y ejecuciÃ³n**

Para instalar el proyecto primero se debe clonar el repositorio y luego ejecutar:

* npm install

Para ejecutar en navegador:

* ionic serve

Para sincronizar los cambios con Android:

* npx cap sync android

Para ejecutar en Android:

* ionic capacitor run android

O tambiÃ©n se puede abrir el proyecto en Android Studio con:

* npx cap open android



**Parte 6: Capturas**

En esta parte se deben agregar las capturas finales del proyecto:

* Captura del login/register
* Captura de la lista de recetas
* Captura del detalle de una receta
* Captura del perfil con foto
* Captura de la app ejecutÃ¡ndose en Android



**Parte 7: Uso de IA**

Para el desarrollo del proyecto se usÃ³ IA como apoyo para revisar errores, organizar la lÃ³gica del consumo del API, implementar Supabase, trabajar con la cÃ¡mara de Capacitor y redactar partes del informe.

Prompts usados:

* Ayuda para consumir el API de TheMealDB en Ionic Angular.
* Ayuda para mostrar recetas en una pestaÃ±a y el detalle en otra.
* Ayuda para implementar login y registro con Supabase.
* Ayuda para bloquear pestaÃ±as si el usuario no ha iniciado sesiÃ³n.
* Ayuda para usar la cÃ¡mara y guardar la foto localmente.
* Ayuda para personalizar el icono y nombre de la app.

No se colocaron claves secretas en el repositorio. Solo se usa la clave pÃºblica necesaria para el cliente de Supabase.


