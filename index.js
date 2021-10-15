const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');




const Cliente = require('./Cliente');



const app = express();
app.use(cors()); //Não dar erro do back e front
app.use(express.json());//Imprimir os dados em JSON

const PORT = 3030;

//CONEXAO BANCO DE DADOS
mongoose.connect('mongodb://localhost:27017/cliente', {useNewUrlParser: true, useUnifiedTopology: true}).then((conn =>{
    console.log('Conectado ao banco de dados!');
})).catch(err =>{
    console.log('Erro na conexão com banco de dados!');
});


//START ROTAS
//ROTA - CADASTRO CLIENTE
app.post('/cadastro-cliente', (req, res)=>{
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var telefone = req.body.telefone;
    var endereco = req.body.endereco;
    var cep = req.body.cep;
    var bairro = req.body.bairro;

//REALIZA VALIDAÇÃO PARA NÃO TER DADOS VAZIOS
    if(nome === ' ' || nome === '' || nome === undefined){
        res.statusCode = 400;
        res.json({err: 'Nome não pode ser vazio!'});
        return;
    }else if(cpf === ' ' || cpf === '' || cpf === undefined){
        res.statusCode = 400;
        res.json({err: 'CPF não pode ser vazio!'});
        return;
    }else if(telefone === ' ' || telefone === '' || telefone === undefined){
        res.statusCode = 400;
        res.json({err: 'Telefone não pode ser vazio!'});
        return;
    }else if(endereco === ' ' || endereco === '' || endereco === undefined){
        res.statusCode = 400;
        res.json({err: 'Endereço não pode ser vazio!'});
        return;
    }else if(cep === ' ' || cep === '' || cep === undefined){
        res.statusCode = 400;
        res.json({err: 'CEP não pode ser vazio!'});
        return;
    }else if(bairro === ' ' || bairro === '' || bairro === undefined){
        res.statusCode = 400;
        res.json({err: 'Bairro não pode ser vazio!'});
        return;
    }

//SALVAR NO BANCO DE DADOS
const cliente = new Cliente({
    nome,
    cpf,
    telefone,
    endereco,
    cep,
    bairro
})
cliente.save().then(()=>{
    res.statusCode = 200;
    res.json({msg: 'Cadastro realizado com sucesso!'});
}).catch(err =>{
    res.statusCode = 500;
    res.json({err:'err'});
})
})

//ROTA - BUSCA CLIENTE
app.get('/busca-cliente/:cpf', (req, res)=>{
    let cpf = req.params.cpf;

    Cliente.findOne({'cpf': cpf}).then(cpf=>{
        if(cpf != undefined){
            res.statusCode = 200;
            res.json(cpf);
        }else{
            res.json({msg: 'Cliente não localizado no banco de dados!'});
        }
    }).catch(err=>{
        res.statusCode = 500;
        res.json({err: err})
    })
})

//ROTA - DELETAR CLIENTE
app.delete('/deletar-cliente/:id', (req, res)=>{
    let id = req.params.id;
    Cliente.deleteOne({'_id': id}).then(deletar =>{
        res.statusCode = 200;
        res.json({msg: 'Cadastro deletado com sucesso!'});
    }).catch(err =>{
        res.statusCode = 500;
        res.json({err: err});
    })
})

//ROTA - EDITAR CLIENTE
app.patch('/editar-cliente/:id', (req, res)=>{
    let id = req.params.id;
    Cliente.findOneAndUpdate({'_id': id}, req.body).then(editar =>{
        res.json({msg:'Cadastro atualizado com sucesso!'});
    }).catch(err =>{
        res.statusCode = 500;
        res.json({err: err});
    })
})
//END ROTAS

//SERVIDOR
app.listen(PORT, (err)=>{
    if(err)throw err;
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})