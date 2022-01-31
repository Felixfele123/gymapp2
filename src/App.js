import React, { useState, useEffect }  from "react";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import NewWorkout from './components/NewWorkout'
import axios from 'axios'
import TopBar from "./components/TopBar"
import BottomBar from "./components/BottomBar"
import ActiveWorkout from "./components/ActiveWorkout"
import { useCallback } from 'react'

export default function ComplexGrid() {
  const [workouts, setWorkouts] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({});
  const [newWorkoutList, setNewWorkoutList] = useState([]);
  const [AppStatus, setAppStatus] = useState(false);
  const [status, setStatus] = useState("start workout");

  const putWorkouts = useCallback(async() => {
    setAppStatus(false)
      await axios({
        method: 'put',
        url: 'https://api-mygym.herokuapp.com/schema/5ff0601c4542a80429c9c2f4',
        withCredentials: true,
        data: {
          workouts: workouts
        }
      });
  }, [workouts])

  useEffect(() => {
    fetchWorkouts()
    fetchWorkoutsList()
  }, []);
  useEffect(() => {
    setAppStatus(true)
  }, [workouts]);



const fetchWorkouts = async () => {
    const data = await axios({
        method: 'get',
        url: 'https://api-mygym.herokuapp.com/schema',
        withCredentials: true,
      });
  const workouts = data.data
  setWorkouts(workouts[0].workouts)
  }

  const fetchWorkoutsList = async () => {
    const data = await axios({
        method: 'get',
        url: 'https://api-mygym.herokuapp.com/workout',
        withCredentials: true
      });
    const workouts = data.data
  setNewWorkoutList(workouts)
  }
  return (
    <Router> 
      <div className="App">
        <TopBar activeWorkout={activeWorkout} setActiveWorkout={setActiveWorkout} putWorkouts={putWorkouts} AppStatus={AppStatus}/>
          <section id="game">
            <div id="tic">
                <canvas id="canvas1" width="75" height="75"></canvas>
                <canvas id="canvas2" width="75" height="75"></canvas>
                <canvas id="canvas3" width="75" height="75"></canvas><br/>
                
                <canvas id="canvas4" width="75" height="75"></canvas>
                <canvas id="canvas5" width="75" height="75"></canvas>
                <canvas id="canvas6" width="75" height="75"></canvas><br/>
                
                <canvas id="canvas7" width="75" height="75"></canvas>
                <canvas id="canvas8" width="75" height="75"></canvas>
                <canvas id="canvas9" width="75" height="75"></canvas>
                
            </div>
            <div id="rules">
                <h2>Rules</h2>
                <p>Each player has to take turns</p>
                <p>The player who fills 3 consecutive rows first wins</p>
            <center><button id="new">NEW GAME</button></center>

            </div>

          </section>
      </div>
    </Router>
  );
}