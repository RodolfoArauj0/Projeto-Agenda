const yup = require('./configYUP');

const schemaValidarContato = yup.object().shape({
    nome: yup.string().required(),
    sobrenome: yup.string().required(),
    telefone: yup.string().required()
})

module.exports = schemaValidarContato;