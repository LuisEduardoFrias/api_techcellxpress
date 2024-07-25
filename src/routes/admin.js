import express from 'express';
import jwt from 'jsonwebtoken';

import Admin from '../controllers/admin_controller.js';
import middlewares from '../middlewares.js';
import configCookies from '../config_cookies.js';
import { SECRET_JWT_KEY } from '../config.js';
//----------------------------

const router = express.Router();

// routes
router.use(middlewares);
//
router.post('/load_products', async (req, res) => {
  const phone = req.body;

  try {
    const { error, data } = await Admin.loadProducts(phone);

    if (error) {
      res.status(400).send({ message: result });
      return;
    }

    res.status(200).send(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /admin/load_products:
*   post:
*     summary: Endpoint to load products for admin.
*     security:
*       - apiAuth: []
*     tags: 
*       - admin
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/phone'
*             minItems: 50
*     responses:
*       200:
*         description: Success.
*       400:
*         description: Bad request.
*       500:
*         description: Internal server error.

*/
/*
router.delete('/removeAll', async (req, res) => {
  try {
    const { error, data } = await Admin.removeAll();

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    res.status(200).json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
*/
/**
* @swagger
* /admin/removeAll:
*   delete:
*     summary: Endpoint to remove all products for admin.
*     security:
*       - apiAuth: []
*     tags: 
*       - admin
*     responses:
*       200:
*         description: Success.
*       400:
*         description: Bad request.
*       500:
*         description: Internal server error.
*/
//
const phoneProduct = router;
export default phoneProduct;