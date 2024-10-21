/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Operaciones relacionadas con adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crea una nueva solicitud de adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       description: Información de la adopción
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - petId
 *               - adopterId
 *             properties:
 *               petId:
 *                 type: string
 *                 description: ID de la mascota a adoptar
 *               adopterId:
 *                 type: string
 *                 description: ID del usuario que quiere adoptar
 *     responses:
 *       201:
 *         description: Solicitud de adopción creada exitosamente
 *       400:
 *         description: Error al crear la solicitud
 */
router.post('/', (req, res) => {
    // Lógica para crear una adopción
});