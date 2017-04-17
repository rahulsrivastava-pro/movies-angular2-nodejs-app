/**
* @swagger
* definitions:
*   User:
*     properties:
*       name:
*         type: string
*       password:
*         type: string
*/
/**
 * @swagger
 * /api/authenticate:
 *   post:
 *     tags:
 *       - API Authentication
 *     description: Returns authentication token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User's object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Returns token
 */