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
    Object.values(updatedFiles).forEach(element => {
      const data = new FormData()      
      data.append('file', element)
      fetch(url, {
        method: 'POST', 
        body: data
      })
        .then((response) => response.json().then((json) => {
          updateResponse(json);
          uploadedFiles[element.name] = true;
          updateShowDetectButton(true);
          updatedFilesUploaded(uploadedFiles);          
          updateFetchingObject(false)
        }))
        .catch(() => {
      });    
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
    props.history.push({
      pathname: "/success",
      state: { detail: responseJson }
    });
  }

  return (
    <div>
      
      <div className="center-page"> 
        <div className="logo-header"> 
          <img src={ SequantixLogo } />
        </div>
        <div className="home-container">
        <h1>
          Sequantix OCR 
        </h1>
          <div>
            <form  className="form-center" onSubmit={handleSubmit(onSubmit)}>  
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
            { showCheckBox(filesUploaded) }
            { fetchingObject ? <Spinner animation="border" variant="primary"/> : "" }  
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
