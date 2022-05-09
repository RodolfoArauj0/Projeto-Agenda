const express =  require('express');
const rotas = express();
const agenda = require('./controladores/controlador')

rotas.get('/', agenda.listarContatos);
rotas.post('/', agenda.inserindoContato);
rotas.put('/:id', agenda.editarContato);
rotas.delete('/:id', agenda.exluirContato);





module.exports = rotas;