const inputTarea = document.getElementById('input-tarea');
const btnAgregarTarea = document.querySelector('button');
const listaTarea = document.getElementById('lista-tareas');

btnAgregarTarea.addEventListener('click', agregarTarea);

inputTarea.addEventListener('keydown', e => {
  if(e.key === 'Enter') {
    agregarTarea();
  }
});

function agregarTarea() {
  if(inputTarea.value) {
    const tareaNueva = document.createElement('div');
    tareaNueva.classList.add('tarea');

    const tareaText = document.createElement('p');
    tareaText.innerText = inputTarea.value;
    tareaNueva.appendChild(tareaText);

    const iconos = document.createElement('div');
    iconos.classList.add('iconos');
    tareaNueva.appendChild(iconos);

    const iconoCompletar = document.createElement('i');
    iconoCompletar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
    iconoCompletar.addEventListener('click', completarTarea);

    const iconoEliminar = document.createElement('i');
    iconoEliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
    iconoEliminar.addEventListener('click', eliminarTarea);

    iconos.append(iconoCompletar, iconoEliminar);

    listaTarea.appendChild(tareaNueva);

    inputTarea.value = "";
  } else {
    alert('Por favor ingrese un tarea');
  }
}

function completarTarea(e) {
  let tarea = e.target.parentElement.parentElement;

  tarea.classList.toggle('completada');
}

function eliminarTarea(e) {
  let tarea = e.target.parentElement.parentElement;

  tarea.remove();
}