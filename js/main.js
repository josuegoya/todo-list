const inputTarea = document.getElementById('input-tarea');
const btnAgregarTarea = document.querySelector('button');
const listaTarea = document.getElementById('lista-tareas');
let tareas = [];

btnAgregarTarea.addEventListener('click', agregarTarea);

inputTarea.addEventListener('keydown', e => {
  if(e.key === 'Enter') {
    agregarTarea();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  crearHTML();
});

function agregarTarea() {
  if(inputTarea.value) {
    const tarea = inputTarea.value;
  
    const tareaObj = {
      id: Date.now(),
      tarea,
      completada: false
    }
  
    tareas = [...tareas, tareaObj];
  
    crearHTML();

    inputTarea.value = '';
  } else {
    alert('Por favor ingrese un tarea');
  }
}

function crearHTML() {
  limpiarHTML();

  if(tareas.length > 0) {
    tareas.forEach(tarea => {
      const tareaNueva = document.createElement('div');
      tareaNueva.classList.add('tarea');

      if(tarea.completada) {
        tareaNueva.classList.add('completada');
      } else {
        tareaNueva.classList.remove('completada');
      }
  
      const tareaText = document.createElement('p');
      tareaText.innerText = tarea.tarea;
      tareaNueva.appendChild(tareaText);
  
      const iconos = document.createElement('div');
      iconos.classList.add('iconos');
      tareaNueva.appendChild(iconos);
  
      const iconoCompletar = document.createElement('i');
      iconoCompletar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
      iconoCompletar.addEventListener('click', () => completarTarea(tarea.id));
  
      const iconoEliminar = document.createElement('i');
      iconoEliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
      iconoEliminar.addEventListener('click', () => eliminarTarea(tarea.id));
  
      iconos.append(iconoCompletar, iconoEliminar);
  
      listaTarea.appendChild(tareaNueva);
    });
  } 

  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function limpiarHTML() {
  while(listaTarea.firstChild) {
    listaTarea.removeChild(listaTarea.firstChild);
  }
}

function completarTarea(id) {
  tareas.forEach(tarea => {
    if(tarea.id === id) {
      if(!tarea.completada) {
        tarea.completada = true;
      } else {
        tarea.completada = false;
      }

      crearHTML();
    }
  })
}

function eliminarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id);

  crearHTML()
}