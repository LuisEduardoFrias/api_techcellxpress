import express from 'express';
import jwt from 'jsonwebtoken';

import PhoneProduct from '../controllers/phone_product_controller.js';
import middlewares from '../middlewares.js';
import configCookies from '../config_cookies.js';
import { SECRET_JWT_KEY } from '../config.js';
//----------------------------

const router = express.Router();

// routes
router.use(middlewares);
//
router.get('/', async (req, res) => {
  try {
    const { error, data } = await PhoneProduct.read();

    res.status(error ? 404 : 200).json({ error, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /product:
*   get:
*     summary: Get all phones.
*     security:
*       - apiAuth: []
*     tags:
*       - product
*     responses:
*       200:
*         description: Success.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   imgUrl:
*                     type: string
*                   brand:
*                     type: string
*                   model:
*                     type: string
*                   color:
*                     type: string
*       404:
*         description: Not found.
*       500:
*         description: Internal server error.
*/
router.get('/search/:search', async (req, res) => {
  try {
    const { search } = req.params;
    const { error, data } = await PhoneProduct.read();

    let filterData = [];
    if (data) {
      filterData = data.filter(e => e.brand === search);
    }

    res.status(error ? 404 : 200).json({ error, filterData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /product:
*   get:
*     summary: Get all phones.
*     security:
*       - apiAuth: []
*     tags:
*       - product
*     responses:
*       200:
*         description: Success.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   imgUrl:
*                     type: string
*                   brand:
*                     type: string
*                   model:
*                     type: string
*                   color:
*                     type: string
*       404:
*         description: Not found.
*       500:
*         description: Internal server error.
*/
//
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error, data } = await PhoneProduct.readById(id);

    res.status(error ? 404 : 200).json({ error, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /product/{id}:
*   get:
*     summary: Get a phone by ID.
*     security:
*       - apiAuth: []
*     tags:
*       - product
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID of the phone to get
*         schema:
*           type: string
*     responses:
*       200:
*         description: Success.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/phone'
*       404:
*         description: Not found.
*       500:
*         description: Internal server error.
*/
//
router.post('/', async (req, res) => {
  const phone = req.body;

  try {
    const { error, data } = await PhoneProduct.create(phone);

    if (!data && !error) {
      res.status(409).send({ message: 'Conflict post' });
      return;
    }

    res.status(error ? 404 : 200).send({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /product:
*   post:
*     summary: Create a new phone.
*     security:
*       - apiAuth: []
*     tags:
*       - product
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/phone'
*     responses:
*       200:
*         description: Success.
*       404:
*         description: Not found.
*       500:
*         description: Internal server error.
*/
//
router.put('/:id', async (req, res) => {
  const phone = req.body;
  const { id } = req.params;

  try {
    const { error, data } = await PhoneProduct.update(id, phone);

    res.status(error ? 404 : 200).json({ error, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /product/{id}:
*   put:
*     summary: Update a phone by ID.
*     security:
*       - apiAuth: []
*     tags:
*       - product
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID of the phone to update
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/phone'
*     responses:
*       200:
*         description: Success.
*       404:
*         description: Not found.
*       500:
*         description: Internal server error.
*/
//
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error, data } = await PhoneProduct.remove(id);

    res.status(error ? 404 : 200).json({ error, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /product/{id}:
*   delete:
*     summary: Delete a phone by ID.
*     security:
*       - apiAuth: []
*     tags:
*       - product
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID of the phone to delete
*         schema:
*           type: string
*     responses:
*       200:
*         description: Success.
*       404:
*         description: Not found.
*       500:
*         description: Internal server error.
*/

const phoneProduct = router;
export default phoneProduct;