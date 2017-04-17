/**
* @swagger
* definitions:
*   Director:
*     properties:
*       director_id:
*         type: integer
*       name:
*         type: string
*       age:
*         type: integer
*       gender:
*         type: string
*   Director2:
*     properties:
*       name:
*         type: string
*       age:
*         type: integer
*       gender:
*         type: string
*/

/**
* @swagger
* /api/director:
*   get:
*     tags:
*       - Director
*     description: Returns all Directors
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of Directors
*         schema:
*           $ref: '#/definitions/Director'
*/
/**
 * @swagger
 * /api/director/{id}:
 *   get:
 *     tags:
 *       - Director
 *     description: Returns a single Director
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Director Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single Director
 *         schema:
 *           $ref: '#/definitions/Director'
 *                  
 */
 
/**
 * @swagger
 * /api/director:
 *   post:
 *     tags:
 *       - Director
 *     description: Creates a new Director
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: director
 *         description: Director object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Director2'
 *     responses:
 *       201:
 *         description: Successfully created
 */

/**
 * @swagger
 * /api/director/{id}:
 *   put:
 *     tags:
 *       - Director
 *     description: Updates a Director
 *     produces:
 *       - application/json
 *     parameters:
  *       - name: id
 *         description: Director Id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: director
 *         description: Director object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Director2'
 *     responses:
 *       200:
 *         description: Successfully modified
 */

/**
 * @swagger
 * /api/director/{id}:
 *   delete:
 *     tags:
 *       - Director
 *     description: Deletes a Director
 *     produces:
 *       - application/json
 *     parameters:
  *       - name: id
 *         description: Director Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */