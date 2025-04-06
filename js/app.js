//constantes de los inputs del formulario
const inputTitulo = document.getElementById("titulo");
const inputSumario = document.getElementById("sumario");
const inputContenido = document.getElementById("contenido");
const btnSubirImg = document.getElementById("subir-imagen");
const btnSubirArchivo = document.getElementById("subir-archivo");
const btnCrearNoticia = document.getElementById("btn-crear-noticia");
//etiqueta img del la seccion articulo
const imagenArticulo =document.querySelectorAll(".img-articulo");
//etiqueta img del carrousel
// const imagenCarrousel = document.querySelectorAll(".img-noticia");

let noticia ={
    id: "",
    titulo: "",
    sumario: "",
    contenido: "",
    imagen: "",
    archivo: "",
}

//arreglo que contendrá el objeto "noticia"
let noticias = [];

//arreglo donde se guardará lo que retorne el local storage
let noticiaStorage =[] ;

//este contador se usa en el condicional para asignar el primer id a la noticia en 0
let contador = 0;
if(localStorage.getItem("noticias")){
    contador = 1;
}

//ingresar el valor del titulo en  el objeto noticia
inputTitulo.addEventListener("keyup",(event)=>{
    let titulo = event.target.value
    noticia.titulo = titulo;    
}) 

//ingresar el valor del sumario en  el objeto noticia
inputSumario.addEventListener("keyup", (event)=>{
    let sumario = event.target.value
    noticia.sumario = sumario;
})

//ingresar el valor del contenido en  el objeto noticia
inputContenido.addEventListener("keyup", (event)=>{
    let contenido =event.target.value
    noticia.contenido =  contenido;
})

//se obtiene la ruta de la imagen y se almacena en el objeto noticia

btnSubirImg.addEventListener("change",()=>{
    const reader = new FileReader();

    reader.addEventListener("load", ()=>{
        // console.log(reader.result);
        noticia.imagen = reader.result;
    })

    reader.readAsDataURL(btnSubirImg.files[0]);
})

//se obtiene la ruta del archivo y se almacena en el objeto noticia
btnSubirArchivo.addEventListener("change", ()=>{

    const reader = new FileReader();

    reader.addEventListener("load", ()=>{
        // console.log(reader.result);
        noticia.archivo = reader.result;
    })

    reader.readAsDataURL(btnSubirArchivo.files[0]);

})


//guarda el objeto noticia en el arreglo noticias usando un arreglo auxiliar y se almacena en el localStorage.
btnCrearNoticia.addEventListener("click", (e) => {
    e.preventDefault
    // se asigna el valor del id
    noticiaStorage = JSON.parse(localStorage.getItem("noticias"));
    if (contador == 0){    
        noticia.id = 0; 
    }else{
        noticia.id = noticiaStorage.length;
    }
    contador++; 
    
    // arreglo auxiliar
    let nuevaNoticia = {
        id : noticia.id,
        titulo: noticia.titulo,
        sumario: noticia.sumario,
        contenido: noticia.contenido,
        imagen: noticia.imagen,
        archivo: noticia.archivo,
    };
    
    // se almacena el objeto en el arreglo
    noticias = [...noticias, nuevaNoticia];
    
    // Local Storage
    // verificamos si ya existe el arreglo almacenado en el localStorage
    if (localStorage.getItem("noticias")) {
        // si existe, se obtiene el string formato Json y lo convertimos en arreglo
        noticiaStorage = JSON.parse(localStorage.getItem("noticias"));
        // introducimos la nueva noticia en el arreglo que sacamos del localStorage
        noticiaStorage.push(nuevaNoticia);
        // guardamos nuevamente el arreglo en el localStorage
        localStorage.setItem("noticias", JSON.stringify(noticiaStorage));
    } else {
        // si no existe el arreglo en el localStorage entonces se almacena el arreglo "noticias" convertido en string con formato Json
        localStorage.setItem("noticias", JSON.stringify(noticias));
    }
    location.reload();
});

//Imprimir todas las noticias(volver a cargar las noticias cuando se recarga la pagina)
noticiaStorage = JSON.parse(localStorage.getItem("noticias"));
// Se resta 1 al recorrido del ciclo para que no muestre la ultima noticia repetida
for(let i = 0; i < noticiaStorage.length; i++){

    // contenedor del codigo html donde iran todas las noticias
    let articuloNoticia = document.getElementById("articulos-noticias");
    
    //se crea el div que se introducira en el codigo html para mostrar la nueva noticia
    let div = document.createElement("div");
    div.innerHTML =`<article class="articulo" id="articulo-noticia${i}">

                        <div class="contenedor-img">
                            <img src="${noticiaStorage[i].imagen}" alt="" class="img-articulo">
                        </div>
                        <div class="contenedor-textoNoticia">
                            <h2>${noticiaStorage[i].titulo}</h2>
                            <p>${noticiaStorage[i].contenido}</p>
                        </div>
                        <div class="contenedor-descargable">
                            <a href="${noticiaStorage[i].archivo}" download >Descargar</a>

                            <div class="contenedor-acciones">
                                <button id="btnEditar-noticia" onclick ="editarNoticia(${noticiaStorage[i].id})">Editar noticia</button>
                                <button id="btnElimiar-noticia" onclick="eliminarNoticia(${noticiaStorage[i].id})">Eliminar noticia</button>
                            </div>

                        </div>
                    </article>`;

    //se inyecta el codigo anterior en la seccion donde van todas las noticias 
    articuloNoticia.appendChild(div);

    //mostrar todas las noticias en el carrousel
    let carrouselNoticia = document.getElementById("track");
    let divCarrousel = document.createElement("div");
    divCarrousel.classList.add("carrousel");
    divCarrousel.classList.add("contenedor-noticia")
    divCarrousel.innerHTML = ` <div class="contenedor-img-noticia">
                                    <img class="img-noticia" src="${noticiaStorage[i].imagen}" alt="Imagen de la noticia">
                                </div>
                                <h3 class="titulo-noticia">${noticiaStorage[i].titulo}</h3>
                                <p class="descripcion-noticia">${noticiaStorage[i].sumario}</p>
                                <div class="contenedor-btn-ver-noticia">
                                    <a href="#articulo-noticia${i}" class="btn-ver-noticia">Ver mas...</a>
                                </div>`;
    carrouselNoticia.appendChild(divCarrousel);
 
}

// Editar noticia
function editarNoticia(id){
    noticiaStorage = JSON.parse(localStorage.getItem("noticias"));

    //Se obtiene el id de la noticia a la cual se pulsa el boton de eliminar
    const index = noticiaStorage.findIndex((noticia)=>{
        return  noticia.id == id
    });

    //modal editar formulario
    const modalEditar = document.querySelector('.modal-editar');
    // formulario de editar noticia
    let formEditar = document.createElement("form");
    formEditar.classList.add("contenedor-modal-formulario");
    formEditar.innerHTML = `<h2>¡Cuentanos tu historia!</h2>
                            <label for="titulo-editado">Título de la noticia</label>
                            <input class="entrada" type="text" name="titulo" id="titulo-editado" placeholder="Ingrese el título de la noticia" value="${noticiaStorage[index].titulo}">
                            <label for="sumario-editado">Sumario</label>
                            <textarea name="contenido" class="contenido" id="sumario-editado" cols="30" rows="2" placeholder="Ingresa el Sumario de la noticia">${noticiaStorage[index].sumario}</textarea>
                            <label for="contenido-editado">Descripción</label>
                            <textarea name="contenido" class="contenido" id="contenido-editado" cols="30" rows="7" placeholder="Ingresa la descripción de la noticia">${noticiaStorage[index].contenido}</textarea>
                            
                            <div class="contenedor-archivos-formulario">
                                <div>
                                    <label for="imagen">Subir imagen</label>
                                    <input class="archivo" type="file" name="imagen" id="subir-imagen-editado" value="${noticiaStorage[index].imagen}">
                                </div>
                          
                                <div >
                                    <label for="archivo">Subir archivo</label>
                                    <input class="archivo"  type="file" name="archivo" id="subir-archivo-editado" value="${noticiaStorage[index].archivo}">
                                </div>
                            </div>
                            <div class="contenedor-botones-formulario">
                                <button id="btn-editar-noticia" class="boton-formulario"  type="submit">Editar noticia</button>
                                <button id="btn-cancelar-noticia" class="boton-formulario"  type="submit">Cancelar</button>
                            </div>`
    modalEditar.appendChild(formEditar);

    modalEditar.classList.add("ver-modal-editar");

    //obtener url de la imagen la url de la imagen editada
    //input de la imagen 
    let imagen = document.getElementById('subir-imagen-editado');
    //variable para almacenar la url de la imagen
    let urlImg = "";
    imagen.addEventListener("change",()=>{
        const reader = new FileReader();
    
        reader.addEventListener("load", ()=>{
            // console.log(reader.result);
            urlImg = reader.result;
            
        })
        reader.readAsDataURL(imagen.files[0]);
    })
    
    // Guardar datos del formulario de editar noticias y guardarlo nuevamente en el local Storage
    const btnEditarNoticia = document.querySelector("#btn-editar-noticia");
    btnEditarNoticia.addEventListener("click", ()=> {
        let titulo = document.getElementById('titulo-editado').value;
        let sumario = document.getElementById('sumario-editado').value;
        let contenido = document.getElementById('contenido-editado').value;


        // let imagen = document.getElementById('subir-imagen-editado');
        let archivo = document.getElementById('subir-archivo-editado').value;

        let noticiaEditada = {
            id: id,
            titulo: titulo,
            sumario: sumario,
            contenido: contenido,
            imagen: urlImg,
            archivo: archivo
        };
        console.log(noticiaEditada)

        noticiaStorage[id] = noticiaEditada;
        localStorage.setItem("noticias", JSON.stringify(noticiaStorage))
    })

  
}
//funcion para obtener la url de la imagen cargada 

// funcion borrar noticias
function eliminarNoticia(id){
    //Se abre el modal que pregunta si desea eliminar la noticia
    const modalEliminar = document.getElementById("modal-eliminar");
    modalEliminar.classList.add("ver-modal-eliminar");
    //boton de aceptar eliminar noticia del modal eliminar noticia
    const eliminarNoticia = document.querySelector(".btn-aceptar-eliminar")

   

    //Se obtiene el id de la noticia a la cual se pulsa el boton de eliminar
    const index = noticiaStorage.findIndex((noticia)=>{
        return  noticia.id == id
    })

    //se elimina la noticia al dar click al boton aceptar
    eliminarNoticia.addEventListener("click", ()=>{
        noticiaStorage.splice(index,1)
        localStorage.removeItem("noticias")
        localStorage.setItem("noticias", JSON.stringify(noticiaStorage));
    })
}

//resetear formulario para que los input esten vacios al ingresar una nueva noticia
function resetear() {

    console.log("se envio el formulario");
    formulario.reset();
    return false
}

//Limpiar local storage(descomentar siguiente linea)
// localStorage.removeItem("noticias");    
