import React, { useEffect } from 'react';
require('./Hello.scss');

const Hello = (props) =>  {
  useEffect(() => {
    const url = "http://192.168.1.4:5000/getRandomData"
    async function getRandomData () {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(json => {
          console.log(json) 
        })
        .catch(() => {
        });
    } 
    getRandomData();
  },[]);

  return(
    <div>
      <h1>Hello, {props.name}!</h1>
    </div>
  ) 
}

export default Hello;
