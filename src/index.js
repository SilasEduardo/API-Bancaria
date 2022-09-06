const express = require('express');
const { send } = require('process');
const app = express();
const clientes = [];
const id = {v4: uuidv4} = require('uuid');

app.use(express.json())

function verificaCpfExiste(req, res, next){
    const {cpf} = req.headers;

    const cliente = clientes.find((cliente)=> cliente.cpf === cpf);

    if(!cliente){
        res.status(400).json({
            "mesErro": "Conta Não Existe"
        })
    }

    req.cliente = cliente

    return next()

}


// Criar Conta
app.post('/conta', (req, res)=>{
    
    const { name, cpf} = req.body;

    const contasJaExestente = clientes.some((cliente)=> cliente.cpf === cpf);

    if(contasJaExestente){
        res.status(400).json({
            "msgErro": "Conta Já Existente!"
        })
    }

    clientes.push({
        cpf,
        name,
        id: uuidv4(),
        estrato: []
    });
    res.status(201).json({
        "msgSucesso": "Conta Cadastrada com sucesso!"
    })
});

//Buscar Estrato
app.get('/extrato', verificaCpfExiste, (req, res)=>{
    const { cliente } = req

    return res.status(201).json(cliente.estrato)
});

app.post('/depositar', verificaCpfExiste, (req, res)=>{
    const {descricao, valor} = req.body;
    const { cliente } = req;

    const estratoOperacao = {
        descricao: descricao,
        valor: valor,
        data_op: new Date(),
        type: "credito",
    }

    cliente.estrato.push(estratoOperacao)

    res.status(201).json({
        "msgSucess": "Deposito feito com sucesso"
    });
})



//Busca Conta
app.get('/conta', verificaCpfExiste, (req, res)=>{
    const { cliente } = req

    return res.status(201).json(cliente)
})





app.listen(3333);
