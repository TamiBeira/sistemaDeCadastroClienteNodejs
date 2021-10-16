const mongoose = require('mongoose');

const Clientes = mongoose.model('Clientes', {
    nome: String,
    cpf: String,
    telefone: String,
    endereco: String,
    cep: String,
    bairro: String
    });

module.exports = Clientes;