const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
  } = require('../controllers/contacts');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         phone:
 *           type: string
 *           example: "+1-234-567-8901"
 *         company:
 *           type: string
 *           example: Acme Inc.
 *         notes:
 *           type: string
 *           example: Important client from NY.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["client", "important"]
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts (optionally filter by company or tags)
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         description: Partial match for company name
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Partial match for any tag (comma-separated for multiple)
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/', getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the contact
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 */
router.get('/:id', getSingle);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().isString(),
    body('tags').optional().isArray(),
  ],
  createContact
);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 */
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().isString(),
    body('tags').optional().isArray(),
  ],
  updateContact
);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', deleteContact);



module.exports = router;
