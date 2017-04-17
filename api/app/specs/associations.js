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
*   MovieActor:
*     properties:
*       actor_id:
*         type: integer
*       movie_id:
*         type: integer
*/

/**
 * @swagger
 * /api/getActorsInMovie/{id}:
 *   get:
 *     tags:
 *       - Associations
 *     description: Returns a list of Actors associated to Movie
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
 *         description: An array of Actors
 *         schema:
 *           $ref: '#/definitions/Actor'
 *                  
 */
 

/**
 * @swagger
 * /api/getMoviesByActor/{id}:
 *   get:
 *     tags:
 *       - Associations
 *     description: Returns a list of Movies associated to Actor
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
 *         description: An array of Movies
 *         schema:
 *           $ref: '#/definitions/Movie'
 *                  
 */

/**
 * @swagger
 * /api/associateMovieActor:
 *   post:
 *     tags:
 *       - Associations
 *     description: Creates a new Movie Actor association
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: movie-actor
 *         description: Movie Actor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/MovieActor'
 *     responses:
 *       201:
 *         description: Successfully created
 */

/**
 * @swagger
 * /api/movie/{movie_id}/{actor_id}:
 *   delete:
 *     tags:
 *       - Associations
 *     description: Deletes a Movie Actor association
 *     produces:
 *       - application/json
 *     parameters:
  *       - name: movie_id
 *         description: Movie Id
 *         in: path
 *         required: true
 *         type: integer
   *       - name: actor_id
 *         description: Actor Id
 *         in: path
 *         required: true
 *         type: integer

 *     responses:
 *       200:
 *         description: Successfully deleted
 */