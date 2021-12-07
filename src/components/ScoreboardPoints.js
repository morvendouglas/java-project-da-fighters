import React from 'react';
import CountUp from 'react-countup';
import '../Scoreboard.css'

const ScoreboardPoints = ({ da }) => {


  return (
   
    <div className="daPoints">
      <CountUp
        className="countUpGreen"
        start={0}
        end={da.points}
        duration="1"
        />
    </div>

  )
}

export default ScoreboardPoints;