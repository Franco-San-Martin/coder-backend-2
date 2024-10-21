/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Operaciones relacionadas con las mascotas
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtiene todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de todas las mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la mascota
 *                   name:
 *                     type: string
 *                     description: Nombre de la mascota
 *                   type:
 *                     type: string
 *                     description: Tipo de animal
 */
router.get('/', (req, res) => {
    // Lógica para obtener todas las mascotas
});