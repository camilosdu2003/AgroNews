const abrirModal = document.querySelector('.contenedor-boton');

const btnCancelarNoticia = document.querySelector('#btn-cancelar-noticia');
const btnAgregarNoticia = document.getElementById('btn-crear-noticia');

const modalFormulario = document.querySelector('.modal-formulario');




abrirModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modalFormulario.classList.add('ver-modal-formulario');
});

btnCancelarNoticia.addEventListener('click', (e)=>{
    e.preventDefault();
    modalFormulario.classList.remove('ver-modal-formulario')
});

btnAgregarNoticia.addEventListener('click', (e)=>{
    e.preventDefault();
    modalFormulario.classList.remove('ver-modal-formulario')
});


