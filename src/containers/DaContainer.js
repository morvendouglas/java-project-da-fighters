import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import DaList from '../components/DaList';
import DaForm from '../components/DaForm';
import Request from '../helpers/request';


const DaContainer = () => {
  const [das, setDas] = useState([]);

  const requestAll = function(){
    const request = new Request();
    const dasPromise = request.get('/das')

    Promise.all([dasPromise])
    .then((data) => {
        setDas(data[0]);
    })
  }

  useEffect(()=>{
    requestAll()
  }, [])


  const handlePost = function(da){
    const request = new Request();
    request.post("/api/das", da)
    .then(() => window.location='/das')
}

  return(
      <>
      <Switch>
      <Route exact path = "/das/new" render={() => {
        return <DaForm handlePost={handlePost}/>
      }}/>
      <Route render={() => {
        return <DaList das={das}/>
      }} />
      </Switch>
      </>
  )
}

export default DaContainer;