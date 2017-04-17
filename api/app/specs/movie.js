/**
* @swagger
* definitions:
*   Movie:
*     properties:
*       movie_id:
*         type: integer
*       name:
*         type: string
*       description:
*         type: string
*       year:
*         type: integer
*       rating:
*         type: integer
*   Movie2:
*     properties:
*       name:
*         type: string
*       description:
*         type: string
*       year:
*         type: integer
*       rating:
*         type: integer
*/

/**
* @swagger
* /api/movie:
*   get:
*     tags:
*       - Movie
*     description: Returns all Movies
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of Movies
*         schema:
*           $ref: '#/definitions/Movie'
*/
/**
 * @swagger
 * /api/movie/{id}:
 *   get:
 *     tags:
 *       - Movie
 *     description: Returns a single Movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Movie Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single Movie
 *         schema:
 *           $ref: '#/definitions/Movie'
 *                  
 */
 
/**
 * @swagger
 * /api/movie:
 *   post:
 *     tags:
 *       - Movie
 *     description: Creates a new Movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: movie
 *         description: Movie object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Movie2'
 *     responses:
 *       201:
 *         description: Successfully created
 */

/**
 * @swagger
 * /api/movie/{id}:
 *   put:
 *     tags:
 *       - Movie
 *     description: Updates a Movie
 *     produces:
 *       - application/json
 *     parameters:
  *       - name: id
 *         description: Movie Id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: movie
 *         description: Movie object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Movie2'
 *     responses:
 *       200:
 *         description: Successfully modified
 */

/**
 * @swagger
 * /api/movie/{id}:
 *   delete:
 *     tags:
 *       - Movie
 *     description: Deletes a Movie
 *     produces:
 *       - application/json
 *     parameters:
  *       - name: id
 *         description: Movie Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */