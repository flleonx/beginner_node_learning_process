require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Imprimit el menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3": // listar completadas
        tareas.listarPendientesCompletadas();
        break;

      case "4": // listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5": //completado | pendiente
          const ids = await mostrarListadoChecklist( tareas.listadoArr );
          tareas.toggleCompletadas( ids );
        break;

      case "6": // borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if ( id !== '0' ) {
          const ok = await confirmar('¿Está seguro?');
          if ( ok ) { 
            tareas.borrarTarea( id );
            console.log('Tarea borrada');
          };
        };
        break;
    };

    guardarDB(tareas.listadoArr);

    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
