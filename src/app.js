const express = require('express');
const  {v4: uuid} = require('uuid')
const app = express();

app.use(express.json())


const clientes = [];

app.post("/conta", (req, res) =>{
    const {cpf, nome} = req.body;

    const cliente = clientes.find(cliente => cliente.cpf === cpf);

    if(cliente){
        res.status(400).json({
            "msgErro" : "Cliente já possue uma Conta!"
        });
    };

    clientes.push({
        nome,
        cpf, 
        id: uuid(),
        estrato: [],
        type: "Debito"
    });

    res.status(201).json({
        "msgSucesso": "Conta criada com sucesso!"
    })
})






module.exports = app;



