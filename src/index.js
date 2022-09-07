const express = require('express');
const app = express();
const {v4: uuid} = require('uuid');



const clientes = [] // banco de dados

app.use(express.json());



function verificaContaExiste(req, res, next){
    const {cpf} = req.headers;

    const cliente = clientes.find((cliente) => cliente.cpf === cpf);

    if(!cliente){
        res.status(400).json({
            "msgErro": "CPF não possui uma conta!"
        });
    };

    req.cliente = cliente;

    return next();

}


app.post("/conta", (req, res)=>{
    const {cpf, nome} = req.body

    const cliente = clientes.some((cliente) => cliente.cpf === cpf);

    if(cliente){
        res.status(400).json({
            "msgErro": "Já existe uma conta com este CPF"
        });
    };

    clientes.push({
        cpf,
        nome,
        id: uuid(),
        estrato: []
    });

    res.status(201).json({
        "msgSucesso": "Conta criada com sucesso!"
    });

});


app.get("/estrato", verificaContaExiste, (req, res)=>{
    const {cliente} = req;
    return res.status(201).json(cliente.estrato)
})
 


app.listen(3333);