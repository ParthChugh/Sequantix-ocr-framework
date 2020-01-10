import React, { useEffect, createRef } from 'react';
import { Link } from 'react-router-dom'


const Hello = (props) =>  {
  const fileInput = createRef();
  
  const successCallback = (updatedFile) => {    
    const url = "http://localhost:5000/success"
    // const data = new FormData()    
    // for (const file of event.target.files) {
    //   data.append('files[]', file, file.name);
    // }
    const data = new FormData()
    data.append('file', event.target.files[0])
    console.log(data);
    fetch(url, {
      method: 'POST', 
      body: data
    })
      .then(json => {
        console.log(json) 
      })
      .catch(() => {
    });
    
  } 
  
  const handleSubmit = () => {
    if(fileInput.current.value !== "") {
      successCallback(fileInput.current.files[0]);
    }
  }

  return(
    <div>   
      <div className="center-page">
        <h2>CLUSTERING BASED OCR</h2>
        <h3 >COMPATABLE WITH PDF (MULTIPLE PAGES SUPPORTED)</h3>
        <form className="form-center" onSubmit={ handleSubmit }>
          <div className="margin-10">
            <label>
              Upload file:
              <input type="file" name="file" id='file' ref={fileInput} multiple/>
            </label>        
          </div>
          <button type="submit">Send data!</button>
        </form> 
        <Link to="/login">Login</Link>
      </div>
    </div>
  ) 
}

export default Hello;
