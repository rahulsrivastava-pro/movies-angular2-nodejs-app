/**
* @swagger
* definitions:
*   Actor:
*     properties:
*       actor_id:
*         type: integer
*       name:
*         type: string
*       age:
*         type: integer
*       gender:
*         type: string
*       agent:
*         type: string
*       agency:
*         type: string
*   Actor2:
*     properties:
*       name:
*         type: string
*       age:
*         type: integer
*       gender:
*         type: string
*       agent:
*         type: string
*       agency:
*         type: string
*/

/**
* @swagger
* /api/actor:
*   get:
*     tags:
*       - Actor
*     description: Returns all Actors
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of Actors
*         schema:
*           $ref: '#/definitions/Actor'
*/
/**
 * @swagger
 * /api/actor/{id}:
 *   get:
 *     tags:
 *       - Actor
 *     description: Returns a single Actor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Actor Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single Actor
 *         schema:
 *           $ref: '#/definitions/Actor'
 *                  
 */

/**
 * @swagger
 * /api/actor:
 *   post:
 *     tags:
 *       - Actor
 *     description: Creates a new Actor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: actor
 *         description: Actor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Actor2'
 *     responses:
 *       201:
 *         description: Successfully created
 */

/**
 * @swagger
 * /api/actor/{id}:
 *   put:
 *     tags:
 *       - Actor
 *     description: Updates a Actor
 *     produces:
 *       - application/json
 *     parameters:
  *       - name: id
 *         description: Actor Id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: actor
 *         description: Actor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Actor2'
 *     responses:
 *       200:
 *         description: Successfully modified
 */

/**
 * @swagger
 * /api/actor/{id}:
 *   delete:
 *     tags:
 *       - Actor
 *     description: Deletes a Actor
 *     produces:
 *       - application/json
 *     parameters:
  *       - name: id
 *         description: Actor Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */