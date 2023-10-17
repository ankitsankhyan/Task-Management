const express = require('express');
const route = express.Router();
const user = require('../controller/user.js');

route.post('/signup', user.userSignup);
route.post('/login', user.login);
module.exports = route;
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - user
 *     summary: Login user and return confirmation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: Successfully logged in the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authtoken:
 *                   type: string
 *                   description: JWT Token
 *       '400':
 *         description: Invalid Credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error Message
 *                   example: "Invalid Credentials"
 *       '500':
 *         description: Could not login the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error Message
 *                   example: "Email address could not be verified"
 *
 * /api/user/signup:
 *   post:
 *     tags:
 *       - user
 *     summary: Signup user and return confirmation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Successfully created the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Successfully created the user
 *                   example: User created successfully
 *       '500':
 *         description: Could not create the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error Message
 *                   example: "Email address could not be verified"
 *       '409':
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error Message
 *                   example: "User already exists"
 *
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: ankitsankhyan04@gmail.com
 *         password:
 *           type: string
 *           example: "123456"
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John
 *         email:
 *           type: string
 *           example: ankitsankhyan04@gmail.com
 *         password:
 *           type: string
 *           example: "123456"
 */

