const fs = require("fs");
const colors = require('colors');

const crearArchivo = async (base = 5, list = false, h = 1) => {
  try {
    let salida = "";

    for (let i = 1; i <= h; i++) {
      salida += ` ${base} * ${i} = ${base * i}\n`;
    }

    if (list) {
      console.log("==============".green);
      console.log(' Tabla del:', colors.blue( base ) );
      console.log("==============".green);
      console.log(salida);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

    return `tabla-${base}.txt`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearArchivo,
};
