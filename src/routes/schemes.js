
//Component of scheme by segurity
/**
* @swagger
* components:
*   securitySchemes:
*     apiAuth:
*       type: apiKey
*       in: header
*       name: token
*/

//Component of scheme by object Phone and Capacity
/**
* @swagger
* components:
*   schemas:
*     phone:
*       type: object
*       properties:
*         imei:
*           type: string
*         imgUrl:
*           type: string
*         brand:
*           type: string
*         model:
*           type: string
*         color:
*           type: string
*         capacity:
*           $ref: '#/components/schemas/Capacity'
*         releaseDate:
*           type: string
*         isRemoved:
*           type: boolean
*     Capacity:
*       type: object
*       properties:
*         rom:
*           type: integer
*           format: int32
*         ramMemory:
*           type: integer
*           format: int32
*         processor:
*           type: string
*/

//Component of scheme by object register
/**
* @swagger
* components:
*   schemas:
*     register:
*       type: object
*       properties:
*         name:
*           type: string
*         lastName:
*           type: string
*         email:
*            type: string
*         user:
*           type: string
*         password:
*           type: string
*/
