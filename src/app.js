const express = require('express');
const  {v4: uuid} = require('uuid');
const app = express();
app.use(express.json());


const clientes = [];

function verificaCpfConta(req, res, next){
    const {cpf, descricao} = req.headers;

    const cliente = clientes.find(cliente => cliente.cpf === cpf);

    if(!cliente){
        res.status(400).json({
            "msgErro": "Não exite um cpf com essa conta!"
        });
    };

    req.cliente = cliente

   return next()
}

// criar conta;
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
        saldo: 0,
        type: "Debito"
    });

    res.status(201).json({
        "msgSucesso": "Conta criada com sucesso!"
    });
});


// Estrato
app.get("/estrato", verificaCpfConta, (req, res) => {
    const { cliente } = req;
    return res.status(201).json(cliente.estrato)
    
});


//Depositar
app.post("/deposito", verificaCpfConta, (req, res)=>{
    const { cliente } = req;
    const{valor, descricao} = req.body;

    const depositoBancario = {
        nome: cliente.nome,
        descricao,
        data_op: new Date(),
        valor,
        typo: "Conta Corrente"
    }

    cliente.estrato.push(depositoBancario)

    res.status(201).json({
        "msgSucess": "Deposito feito com sucesso! "
    })

})





module.exports = app;



