const express = require ('express')
const cors = require('cors')
const webServer = express();

 const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
 } = require ('../controllers/workoutController')

 webServer.use(cors());
//  webServer.use(express.json())
 

const router = express.Router()

//GET all Info or all id
router.get('/', getWorkouts)

//GET single id
router.get('/:id', getWorkout)

//POST 
router.post('/',createWorkout)

//DELETE
router.delete('/:id',deleteWorkout)

//UPDATE
router.patch('/:id',updateWorkout)





module.exports = router