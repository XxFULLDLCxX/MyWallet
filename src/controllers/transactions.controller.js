import { db } from '../database/database.connection.js';
import dayjs from 'dayjs';

export const getTransactions = async (req, res) => {
  try {
    const transactions = await db.collection('transactions').find().toArray();
    res.send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postTransactions = async (req, res) => {
  try {
    const { valor, description, operation } = req.body;
    const transactions = await db.collection('transactions').insertOne({ date: dayjs().format('DD/MM'), valor, description, operation });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const output = async (req, res) => {
  try {
    const transactions = await db.collection('transactions').find().toArray();
    res.send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

