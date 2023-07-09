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
