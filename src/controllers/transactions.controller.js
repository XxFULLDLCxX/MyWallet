import { ObjectId } from 'mongodb';
import { db } from '../database/database.connection.js';
import dayjs from 'dayjs';

export const getTransactions = async (req, res) => {
  try {
    const transactions = await db.collection('transactions').find().toArray();
    const total = transactions.reduce((n, obj) => n + (obj.operation === 'output' ? -1 : 1) * obj.value, 0);
    res.send([total, ...transactions.reverse()]);
  } catch (err) { res.status(500).send(err.message); }
};

export const postTransactions = async (req, res) => {
  try {
    const { description, value, operation } = req.body;
    await db.collection('transactions').insertOne(
      { date: dayjs().format('DD/MM'), description, value, operation });
    res.sendStatus(201);
  } catch (err) { res.status(500).send(err.message); }
};

export const deleteTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
    res.sendStatus(204);

  } catch (err) { res.status(500).send(err.message); }

};

export const putTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) return res.status(422).send("A Descrição é Necessária!");
    const result = await db.collection('transactions').updateOne(
      { _id: new ObjectId(id) }, { $set: { description } }
    );
    if (result.matchedCount === 0) return res.status(404).send("Esse item não existe!");
    res.sendStatus(201);

  } catch (err) { res.status(500).send(err.message); }

};
