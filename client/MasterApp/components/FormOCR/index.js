import React, {  useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import {BASE_URL} from '../../../constants'
import {Button, Spinner} from 'react-bootstrap';
import ShowCheckBox from './showCheckBox';
import SequantixLogo from '../../../assests/SqxBigHome.png';
import './styles.scss';

const HelloForm =  (props) =>  {  
  const { register, handleSubmit, errors } = useForm()
  const [fileName, setFileName] = useState('');
  const [responseJson, updateResponse] = useState({});
  const [showDetectButton, updateShowDetectButton] = useState(false);
  const [filesUploaded, updatedFilesUploaded] = useState({});
  const [fetchingObject, updateFetchingObject] = useState(false)

  const updateLoader = () => updateFetchingObject(true);
  const successCallback = (updatedFiles) => {    
    const url = `${BASE_URL}/success`
    const uploadedFiles = {}
    Object.values(document.getElementById('upload').files).forEach((el) => {
      return uploadedFiles[el.name] = false
    })
    const formData = new FormData();
    for(let x=0;x<updatedFiles.length;x++) {
      formData.append('file'+x, updatedFiles[x]);	
    }
    fetch(url, {
      method: 'POST', 
      body: formData,
    })
      .then((response) => response.json().then((json) => {
        updateShowDetectButton(true);
        updateFetchingObject(false)
        updateResponse(json);
        updatedFilesUploaded(uploadedFiles);          
      }))
      .catch(() => {
    });    
  } 

  const showCheckBox =  (files) => {
    return(
      <ShowCheckBox
        files={files}
      />
    )
  }

  const onSubmit = (data) => {
    let uploadedFiles = {};
    Object.values(document.getElementById('upload').files).forEach((el) => {
      return uploadedFiles[el.name] = false
    })
    setFileName(Object.values(document.getElementById('upload').files).map((el)=> el.name));
    updatedFilesUploaded(uploadedFiles) 
    successCallback(document.getElementById('upload').files);
    updateLoader()
  } 

  const handleClick = () => {
    if(typeof props.location.state !== 'undefined') {
      responseJson["access_token"] = props.location.state.detail.access_token
      props.history.push({
        pathname: "/success",
        state: { detail: responseJson }
      });
    }
    else {
      window.location.href = BASE_URL;
    }
   
  }

  return (
    <div>
      <div className="center-page "> 
        <div className="home-container container">
          <h1 className="font-weight-eurostile">
            Upload files here
          </h1>
          <div>
            { (fetchingObject) ? 
            <div className="spinner-center">
              { showCheckBox(filesUploaded) }            
              <Spinner animation="border" variant="primary"/>
            </div>
          : !showDetectButton &&
          <form className="form-center" onSubmit={handleSubmit(onSubmit)}>  
            {errors.upload && errors.upload.type === 'required' && <h4>Please upload some file</h4>}          
            <input
              className="draggable-container"
              type="file" 
              name="upload"
              id="upload"
              multiple 
              ref={register({
                required: true,
              })}
            />             
            {fileName && <div>Uploaded file name is {fileName}</div>}
            <Button variant="outline-dark" type="submit">Submit</Button>
          </form>
          }
            {
              showDetectButton && (
                <Button 
                  variant="outline-dark"  
                  onClick={ handleClick }
                >
                  Detect Text
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
    
  
};

export default HelloForm;
