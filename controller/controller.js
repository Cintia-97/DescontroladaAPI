const { response } = require('express');
const { MongoClient, ObjectId } = require('mongodb'); 
const url = 'mongodb+srv://cintiagonsalez199:hriYCV5ankvt6wWp@cluster0.76kehbr.mongodb.net/';
const client = new MongoClient(url);

const dbName = 'Des_controlada';
client.connect((err) => { 
    console.log(err)
    console.log("Connected successfully to server");
});

const db = client.db(dbName);
const expenses = db.collection('expenses');
const gain = db.collection('gain');

const list = async (req, res) => {
    let result=[]

    const gain_data = await gain.find({});
    const expenses_data = await expenses.find({});

    while (await gain_data.hasNext()) {
        const newGain = await gain_data.next()
        result.push(newGain);
    }

    while (await expenses_data.hasNext()) {
        const newExpenses = await expenses_data.next()
        result.push(newExpenses);
    }

    const obj = {
        title: 'Despesas',
        dados: result
    }

    res.send(obj)
}

const listByType = async (req, res) => {
    const { type } = req.params;
    let result

    if (type === 'ganho') {
        result =  await gain.find({type});
    } else {
        result =  await expenses.find({type});
    }
    

    const despesas = [];

    while (await result.hasNext()) {
        const newDespesa = await result.next()
        despesas.push(newDespesa);
    }

    const obj = {
        title: 'Despesas Controladas',
        despesas: despesas
    }

    return res.send(obj)
}

const create = async (req, res) => {
    try {

        const {origin, value, date, name} = req.body;
        
        if(origin === 'ganho') {
            await gain.insertOne({name, origin, value, date})
        }else{
            await expenses.insertOne({name, origin, value, date})
        }

        return res.send('create')
    } catch (error) {
        console.log(error)
        return response.status(500).send('Erro ao inserir ganho')
    }
}

const remove = async (req, res) => {
    try {
        const {type, id} = req.body;

        if(type === 'ganho') {
            await gain.deleteOne({_id: new ObjectId(id)})
        } else {
            await expenses.deleteOne({_id: new ObjectId(id)})
        }

        return res.send('deleted')
    } catch (error) {
        console.log(error)
        return res.send('Erro ao deletar ganho')
    }
}

module.exports = {
    list,
    listByType,
    create,
    remove
}