const knex = require('../conexaoDB/knex');
const schemaValidarContato = require('../ValidacoesYUP/schemaCadastro')

const listarContatos = async (req, res)=>{
    const {nome} = req.query;

    if(nome){
        const buscarContato = await knex('contatos').whereILike('nome',`%${nome}%`).debug();
        res.status(200).json(buscarContato)
    }

    const liscandoContatos = await knex('contatos');
    res.status(200).json(liscandoContatos);
}

const inserindoContato = async (req, res)=>{
    const {nome, sobrenome, telefone, email, cpf} = req.body;

    try {  
        await schemaValidarContato.validate(req.body);

        const verificarCPF = await knex('contatos').where(({cpf}));
        if(verificarCPF.length > 0 ){
        return res.status(400).json({erro:'CPF já cadastrado...'})
        }

        const verificarEmail = await knex('contatos').where({email});
        if(verificarEmail.length > 0){
            return res.status(400).json({erro:"E-mail já cadastrado..."})
        }

        const cadastrandoUsuario = await knex('contatos').insert({nome, sobrenome, telefone, email, cpf}).returning('*');
        
        if(cadastrandoUsuario.length === 0){
        return res.status(400).json({erro:"Contato não cadastrado!"});
        }

        return res.status(200).json(cadastrandoUsuario);
        
    } catch (error) {
    return res.status(400).json(error.message);
    }
};

const editarContato = async (req, res)=>{
    const {nome, sobrenome, telefone, email, cpf} = req.body;
    const {id} = req.params;

    try {
        await schemaValidarContato.validate(req.body);

        if(cpf){
            const verificaCFPContato = await knex('contatos').where({id, cpf});
            if(cpf === verificaCFPContato){
                const verificarCPF = await knex('contatos').where({cpf});
                if(verificarCPF.length > 0 ){
                    return res.status(400).json({erro:'CPF já cadastrado...'})
        }
    }
}       
        if(email){
            const verificarEmailContato = await knex('contatos').where({id, email});
            if(email === verificarEmailContato){
                const verificarEmail = await knex('contatos').where({email});
                if(verificarEmail.length > 0){
                    return res.status(400).json({erro:"E-mail já cadastrado..."});
            }
        }
    }
    const editandoContato = await knex('contatos').update({nome, sobrenome, telefone, email, cpf}).where({id}).returning('*');
    if(editandoContato.length === 0){
        return res.status(400).json({mensagem:"Contato não encontrado!"});
        }
        
        return res.status(200).json(editandoContato);
        
    } catch (error) {
    return res.status(400).json(error.message);
    }
};

const exluirContato = async (req,res)=>{
    const {id} = req.params;
    try {           
        const exluindoContato = await knex('contatos').del().where({id});

        if(exluindoContato.length === 0){
            return res.status(400).json({erro:"Contato não encontrado!"})
        }
        
        return res.status(200).json({mensagem:"Usuário excluído com sucesso!"})
        
    } catch (error) {
        return res.status(400).json(error.message);

    }
};



module.exports={inserindoContato, listarContatos, editarContato, exluirContato};