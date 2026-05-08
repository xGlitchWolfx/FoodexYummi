**Prueba B1** 

**Foodex Yummi! (recetas de comida)**

Kevin Javier Chacón

Estudiante en software EPN


API utilizada: TheMealDB

Link de la API: https://www.themealdb.com/api.php

Tecnologías utilizadas:

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


<img width="596" height="56" alt="Captura Iconos" src="https://github.com/user-attachments/assets/f5d89fd0-1495-44d0-85ac-71515cc39f31" />


En esta parte decidí cambiar los iconos por 4 nuevos para que tenga mas sentido lo que estamos viendo
en todo caso decidí cambiar los iconos por los 4 vistos en la captura los cuales son:



* id-card: para login
* images: para el listado de recetas tipo galería
* pencil: para ver la receta seleccionada
* person: para la edición del perfil (foto de perfil, uso de cámara, etc)



<img width="958" height="954" alt="Captura A2" src="https://github.com/user-attachments/assets/ab71308a-103f-44c8-999a-06e45705f03a" />




Después procederemos con la edición de los nombres de las tabs y con eso estaría terminada esta parte 



**Parte 2.1 Consumo del API**
Para esta parte consumiremos el API que en mi caso es el de TheMealDB un api para ver recetas de comida

Primero generamos un servicio nuevo creando una carpeta llamada "Services" y en esta agregaremos *recetas.service.ts* la cual en su interior tendrá la lógica para consumir el api



<img width="1110" height="418" alt="Captura A3" src="https://github.com/user-attachments/assets/c1a0da42-5adc-4a9e-9590-8867b78997c7" />




De esa manera ahora llamamos a la API

Ahora en la pestaña 2 mostraremos a modo de galería una receta a escoger mientras que en la pestaña 3 mostraremos la receta seleccionada por el usuario 



**Parte 2.2 Pestaña "lista de recetas"**

En esta pestaña se verá a modo de lista las recetas disponibles que tenemos para esto en recetas.service.ts usaremos una lógica para llamar a las recetas disponibles

una vez hecho esto solo quedaría editar nuestra pestaña 2 con los elementos que necesitamos mostrar es decir el titulo de la receta y la imagen de dicha receta en formato de galería
lo cual quedaría de la siguiente manera:


<img width="714" height="888" alt="Captura A4" src="https://github.com/user-attachments/assets/dbda508e-4bd3-4a6b-a4e1-d5cb5c69d352" />




Donde podemos buscar las recetas por nombre y aparecerán de igual manera como se ve en la captura de pantalla



La pestaña 2 permite buscar recetas por nombre mediante un *ion-searchbar*

Al cargar la pantalla se realiza una búsqueda inicial de recetas con el término *chicken* para mostrar por defecto esas recetas 



como precaución decidí agregar una funcionalidad para que cuando alguien busque una receta que no exista aparezca un mensaje de error


<img width="558" height="176" alt="Captura A6" src="https://github.com/user-attachments/assets/a38c15fd-2382-43f6-bfb3-7e09142cfdfb" />



Entonces al seleccionar una receta esta nos hará un movimiento hacia la pestaña 3 donde podremos saber mas sobre esta receta seleccionada

**Parte 2.3 Pestaña "Receta"**

Esta pestaña funciona en conjunto con la pestaña 2 ya que al seleccionar una receta de la lista de recetas aca se mostrara la receta que hemos seleccionado para poder ver mas a fondo como esta se hace en si misma es decir los detalles para esto se consume el endpoint `lookup.php?i=` de TheMealDB para obtener la información completa de esa receta.

<img width="554" height="877" alt="Captura A5" src="https://github.com/user-attachments/assets/80ea7511-4c87-4a04-8c9e-8937b854e1b6" />


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


<img width="536" height="798" alt="Captura B1" src="https://github.com/user-attachments/assets/5a52ef03-6828-4420-a2cd-fef59bfe47de" />


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



<img width="503" height="878" alt="B3" src="https://github.com/user-attachments/assets/ef3e3a09-c8b0-45de-9a41-a1d3162e795c" />



**Parte 7: Uso de IA**

Para el desarrollo del proyecto se usa IA como apoyo para revisar errores, organizar la logica del consumo del API, implementar Supabase

Prompts usados:

* Ayuda para consumir el API de TheMealDB en Ionic Angular.
* Ayuda para mostrar las recetas en formato de galeria.
* Ayuda para implementar login y registro con Supabase.
* Ayuda para bloquear pestañas si el usuario no ha iniciado sesion.

No se colocaron claves secretas en el repositorio.
