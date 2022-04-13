const Tarea = require("./tarea");

class Tareas {

  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach( key => listado.push( this._listado[key] ) );

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea( id = '' ) {
    if ( this._listado[id] ) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray( tareas = [] ) {

    tareas.forEach( ( tarea ) => this._listado[tarea.id] = tarea );

  }

  crearTarea( desc = '' ) {

    const tarea = new Tarea( desc );
    this._listado[tarea.id] = tarea;

  }

  listadoCompleto() {

    let tareasString = '';

    this.listadoArr.forEach( ( tarea, index ) => {

      console.log( `\n${(++index + '.').green} ${tarea.desc} :: ${ (tarea.completadoEn !== null) ? 'Completada'.green : 'Pendiente'.red }` );
      
    });
  };

  listarPendientesCompletadas( completadas = true ) {

    let index = 0;
  
    this.listadoArr.forEach( ( tarea ) => {
      if ( completadas ) {
        if ( tarea.completadoEn ) {
          console.log( `\n${(++index + '.').green} ${tarea.desc} :: ${ tarea.completadoEn.green }` );
        }
      } 
      else if ( !tarea.completadoEn ) {
        console.log( `\n${(++index + '.').green} ${tarea.desc} :: ${ 'Pendiente'.red }` );
      };
    });
  };

  toggleCompletadas( ids = [] ) {

    ids.forEach ( id => {

      const tarea = this._listado[id];
      if ( !tarea.completadoEn ) tarea.completadoEn = new Date().toISOString()
    });

    this.listadoArr.forEach( tarea => {
      if ( !ids.includes(tarea.id) ) {
        this._listado[tarea.id].completadoEn = null;
      };
    });

  };

};

module.exports = Tareas;