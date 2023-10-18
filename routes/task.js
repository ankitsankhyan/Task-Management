const express = require('express');
const router = express.Router();
const task = require('../controller/tasks');
const { isAuth } = require('../Middleware/auth');
router.post('/create', isAuth, task.createTask);
router.put('/update/:id', isAuth, task.updateTask);
router.delete('/delete/:id', isAuth, task.deleteTask);
router.put('/status/:id', isAuth, task.updateStatus);

module.exports = router;
/**
 * @swagger
 * /api/task/create:
 *   post:
 *     tags:
 *       - task
 *     summary: Create a new task
 *     description: Endpoint to create a new task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreate'
 *     responses:
 *       '201':
 *         description: Task created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 * 
 * /api/task/update/{id}:
 *   put:
 *     tags:
 *       - task
 *     summary: Update a task by ID
 *     description: Endpoint to update a task by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       '200':
 *         description: Task updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Server error
 * 
 * /api/task/delete/{id}:
 *   delete:
 *     tags:
 *       - task
 *     summary: Delete a task by ID
 *     description: Endpoint to delete a task by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Task deleted successfully
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Server error
 * 
 * /api/task/status/{id}:
 *   put:
 *     tags:
 *       - task
 *     summary: Update the status of a task by ID
 *     description: Endpoint to update the status of a task by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskStatusUpdate'
 *     responses:
 *       '200':
 *         description: Task status updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Server error
 *
 * components:
 *   schemas:
 *     TaskCreate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the item.
 *         description:
 *           type: string
 *           description: A description of the item.
 *         timeString:
 *           type: string
 *           format: "HH:MM"
 *           description: Time in the form of 24 hours (00:00 -> 23:59)
 *         dateString:
 *           type: string
 *           format: "DD/MM/YYYY"
 *           description: Date string in the form of DD/MM/YYYY
 *       required:
 *         - title
 *         - description
 *         - timeString
 *         - dateString
 *     TaskUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the item.
 *         description:
 *           type: string
 *           description: A description of the item.
 *         timeString:
 *           type: string
 *           format: "HH:MM"
 *           description: Time in the form of 24 hours (00:00 -> 23:59)
 *         dateString:
 *           type: string
 *           format: "DD/MM/YYYY"
 *           description: Date string in the form of DD/MM/YYYY
 *       required:
 *         - title
 *         - description
 *         - timeString
 *         - dateString
 *     TaskStatusUpdate:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of the item.
 *       required:
 *         - status
 */
