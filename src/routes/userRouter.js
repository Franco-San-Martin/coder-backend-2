const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const User = require('../models/User');

// Subir uno o varios documentos para un usuario
router.post('/:uid/documents', upload.array('documents'), async (req, res) => {
    const { uid } = req.params;

    try {
        const user = await User.findById(uid);
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.files.forEach((file) => {
            user.documents.push({
                name: file.originalname,
                reference: `/uploads/documents/${file.filename}`
            });
        });

        await user.save();
        res.json({ message: 'Documents uploaded and user updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading documents', error: err.message });
    }
});


/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Retrieve a single user
 *     description: Get a user by their unique ID.
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       404:
 *         description: User not found
 */
router.get('/:uid', async (req, res) => {
    // lógica de la ruta
});

module.exports = router;