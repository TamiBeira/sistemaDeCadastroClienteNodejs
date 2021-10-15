const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente', {
    nome: String,
    cpf: String,
    telefone: String,
    endereco: String,
    cep: String,
    bairro: String
    });

module.exports = Cliente;