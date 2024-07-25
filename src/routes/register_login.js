import express from 'express';
import jwt from 'jsonwebtoken';
import sequelize from '../libs/db.js';
import { serialize } from 'cookie';
import configCookies from '../config_cookies.js';
import RegisterLogin from '../controllers/register_login_controller.js';
import middlewares from '../middlewares.js';
import { SECRET_JWT_KEY } from '../config.js';

//----------------------------

const router = express.Router();

//Component of scheme by segurity
/**
* @swagger
* components:
*   securitySchemes:
*     apiAuth:
*       type: apiKey
*       in: header
*       name: token
*/

//Component of scheme by object Phone and Capacity
/**
* @swagger
* components:
*   schemas:
*     phone:
*       type: object
*       properties:
*         imei:
*           type: string
*         imgUrl:
*           type: string
*         brand:
*           type: string
*         model:
*           type: string
*         color:
*           type: string
*         capacity:
*           $ref: '#/components/schemas/Capacity'
*         releaseDate:
*           type: string
*     Capacity:
*       type: object
*       properties:
*         rom:
*           type: integer
*           format: int32
*         ramMemory:
*           type: integer
*           format: int32
*         processor:
*           type: string
*/

//Component of scheme by object register
/**
* @swagger
* components:
*   schemas:
*     register:
*       type: object
*       properties:
*         name:
*           type: string
*         lastName:
*           type: string
*         email:
*            type: string
*         user:
*           type: string
*         password:
*           type: string
*/

// routes
router.post('/login', async (req, res) => {
  const { user, password } = req.body;
  try {
    const { error, data } = await RegisterLogin.login(user, password);

    if (error) {
      res.status(404).json({ message: error });
      return;
    }

    const token = jwt.sign({ data }, SECRET_JWT_KEY, { expiresIn: '1h' });


    const serialized = serialize('access_token', token, configCookies);
    res.setHeader('Set-Cookie', serialized)
    /*
     return res.json({ ...data, token });*/

    //res.cookie('access_token', serialized, configCookies)
    res.status(200).json({ error, data });

  } catch (error) {
    console.error(error)
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
*               type: string
*             password:
*               type: string
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
    const { error, data } = await RegisterLogin.logout(user.data);

    if (error) {
      res.status(404).send({ message: error });
      return;
    }

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
    const { error, data } = await RegisterLogin.register(register);

    if (error) {
      res.status(409).json({ message: error });
      return;
    }

    res.status(200).json({ error, data });
  } catch (error) {
    console.error(error)
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
const registerLogin = router;
export default registerLogin;