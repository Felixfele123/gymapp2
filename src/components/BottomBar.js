
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
  buttom: {
      width: "100%",
      textAlign: 'center',
      height: "56px",
      margin: 0,
      padding: 0,
  },
  appBar: {
    height: "auto",
    top: 'auto',
    bottom: 0,
    margin: 0,
    paddingBottom: "30px",
  },
  toolbar: {
    height: "40px",
    textAlign: 'center', 
    margin: 0,
    padding: 0,
  }
}));

const BottomBar = ({putWorkouts, newWorkoutList, setActiveWorkout, workouts, setWorkouts, newWorkout}) => {
  const classes = useStyles();
  const history = useHistory();
  const [status, setStatus] = useState("start workout");
  const handleClick = () => {
    if (history.location.pathname === '/newWorkout'){
      history.push("/ActiveWorkout");
      setStatus("end workout") 
    }else if (history.location.pathname === '/ActiveWorkout'){
      newWorkout.active = false
      newWorkout = {...newWorkout, 
        finishedDate: new Date().toJSON().slice(0,10).replace(/-/g,'')
      }
      console.log(newWorkout)
      workouts.push(newWorkout)
      history.push("/");  
      setStatus("start workout") 
      putWorkouts()  
    }else{
      history.push("/newWorkout");  
      setStatus("next")   
    }
  };
  return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Button onClick={handleClick} className={classes.buttom} color="inherit">
          <Typography variant="subtitle1" style={{marginTop: "10px"}}>
            {status}
          </Typography>
          </Button>
        </Toolbar>
      </AppBar> 
  );
}

export default BottomBar