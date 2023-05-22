const express = require ('express')
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const webServer = express();

webServer.use(express.json())
webServer.use(bodyParser.urlencoded({extended:true}))

//get all workouts
const getWorkouts = async(req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).send(workouts)
}

//get a single workout
const getWorkout = async(req,res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No workout'})
  }

  const workout = await Workout.findById(id)
  if (!workout){
    return res.statut(404).json({error: 'no workout'})
  }

  res.status(200).json(workout)
}


//create new workout
const createWorkout = async(req,res) => {
    const {title,load,reps} = req.body
    // const title = req.body.title;
    // const load = req.body.load;
    // const reps = req.body.load;


  //add doc to DB  
    try{
      const workout = await Workout.create({title,load,reps})
      res.status(200).json(workout)
    }catch(error){
      res.status(400).json({error: error.message})
    }   
}

//delete a workout
const deleteWorkout = async(req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No workout'})
      }
    
    const workout = await Workout.findOneAndDelete({_id: id})
        if (!workout){
            return res.statut(404).json({error: 'no workout'})
          }
        
        res.status(200).json(workout)          
}

//update a workout
const updateWorkout = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No workout'})
      }
    
    const workout = await Workout.findByIdAndUpdate({_id: id}, {
       ...req.body 
    })
    if (!workout){
        return res.statut(404).json({error: 'no workout'})
      }
      res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}