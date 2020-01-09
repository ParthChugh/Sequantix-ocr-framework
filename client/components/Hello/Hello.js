import React, { useEffect, createRef } from 'react';
require('./Hello.scss');

const Hello = (props) =>  {
  const url = "http://localhost:5000/getRandomData"
  // useEffect(() => {
    

  // },[]);

  const fileInput = createRef();
  
  const successCallback = (updatedFile) => {    
    const url = "http://localhost:5000/success"
    console.log(url);
    debugger;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: updatedFile
    })
      .then(json => {
        debugger;
        console.log(json) 
      })
      .catch(() => {
        debugger;
        console.log('yahan aaya mm');
        console.log('-------');
      });
  } 
  
  const handleSubmit = () => {
    if(fileInput.current.value !== "") {
      successCallback(fileInput.current);
    }
  }

  return(
    <div>   
      <div className="center-page">
        <h2>CLUSTERING BASED OCR</h2>
        <h3 >COMPATABLE WITH PDF (MULTIPLE PAGES SUPPORTED)</h3>
        <form className="form-center" onSubmit={() => handleSubmit()}>
          <div className="margin-10">
            <label>
              Upload file:
              <input id="file" type="file" ref={fileInput} multiple /> 
            </label>        
          </div>
          <button>Send data!</button>
        </form>  
      
      </div>
      
      
    </div>
  ) 
}

export default Hello;
