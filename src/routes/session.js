import express from 'express';
import jwt from 'jsonwebtoken';
import sequelize from '../libs/db.js';
import { serialize } from 'cookie';
import configCookies from '../config_cookies.js';
import Session_ from '../controllers/session_controller.js';
import middlewares from '../middlewares.js';
import { SECRET_JWT_KEY, ORIGIN } from '../config.js';

//----------------------------

const router = express.Router();

// routes
router.post('/login', async (req, res) => {
  const { user, password } = req.body;
  
  try {
    const { error, data } = await Session_.login(user, password);

    if (error) {
      res.status(404).json({ error });
      return;
    }

    const token = jwt.sign({ data }, SECRET_JWT_KEY, { expiresIn: '1h' });

    res.cookie('access_token', token, configCookies);

    // res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.status(200).json({ error, data });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /login:
*   post:
*     summary: Endpoint to log in.
*     tags: 
*       - session
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user:
*                 type: string
*               password:
*                 type: string
*       cookies:
*         access_token:
*           description: Token de acceso
*           schema:
*             type: string
*           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibm90IGZvdW5kIn0.1wG3L5JW8wOeMfztk1X7hg'
*     responses:
*       200:
*         description: Success.
*       404:
*         description: Not found.
*       500:
*         description: Internal server error.
*/
//
router.post('/logout', middlewares, async (req, res) => {
  const { user } = req.session;

  try {
    const { error, data } = await Session_.logout(user.data);

    if (error) {
      res.status(404).send({ error });
      return;
    }

    console.log('Logout');
    res.cookie('access_token', null, { ...configCookies, maxAge: 0 }).status(200).send({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /logout:
*   post:
*     summary: Endpoint for logging out.
*     security:
*       - apiAuth: []
*     tags: 
*       - session
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user:
*                 type: object
*                 properties:
*                   id:
*                     type: string
*                   user:
*                     type: string
*                   email:
*                     type: string
*     responses:
*       200:
*         description: Success.
*       404:
*         description: Not found.
*       500:
*         description: Internal server error.
*/
//
router.post('/register', async (req, res) => {
  const register = req.body;

  try {
    const { error, data } = await Session_.register(register);

    if (error) {
      res.status(409).json({ error });
      return;
    }
    //  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.status(200).json({ error, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error.", data: null });
  }
});
/**
* @swagger
* /register:
*   post:
*     summary: Endpoint to register a new user.
*     tags: 
*       - session
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/register'
*     responses:
*       200:
*         description: Success.
*       409:
*         description: Conflict error.
*       500:
*         description: Internal server error.
*/
//

const Session = router;
export default Session;