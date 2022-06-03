const mongoose = require('mongoose');

const ProfSchema = new mongoose.Schema({
    nome : String,
    lattes_link: String,
    lattes_code: String,
    email : String,
    celular: String,
    sexo: String,
    profissao: String,
    //dataNascimento: 
    //link CONFEF/CFN/CRP(válido)
    //receber curriculo (txt e pdf)
    //receber imagem
    especialidades: [String],
    bio: String,
});

    module.exports = mongoose.model('Prof', ProfSchema);