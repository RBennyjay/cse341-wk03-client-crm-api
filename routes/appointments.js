const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointments');



/**
 * @swagger
 * tags:
 *   - name: Appointments
 *     description: API for managing appointments
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - clientName
 *         - clientEmail
 *         - date
 *         - duration
 *         - location
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id
 *         clientName:
 *           type: string
 *         clientEmail:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-07-21T15:30:00Z"
 *         duration:
 *           type: number
 *         location:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Scheduled, Completed, Cancelled]
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-21T15:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-21T15:30:00Z"
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
 */

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment found
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment updated
 *       404:
 *         description: Not found
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted
 *       404:
 *         description: Not found
 */

router.get('/', controller.getAllAppointments);
router.get('/:id', controller.getAppointmentById);
router.post('/', controller.createAppointment);
router.put('/:id', controller.updateAppointment);
router.delete('/:id', controller.deleteAppointment);

module.exports = router;
