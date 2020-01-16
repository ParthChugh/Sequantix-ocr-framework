import React, {  useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import {BASE_URL} from '../../../constants'
import {Button} from 'react-bootstrap';
import ShowCheckBox from './showCheckBox';
import './styles.scss';

const HelloForm =  (props) =>  {  
  const { register, handleSubmit, errors } = useForm()
  const [fileName, setFileName] = useState('');
  const [responseJson, updateResponse] = useState({});

  const [showDetectButton, updateShowDetectButton] = useState(false);
  const [filesUploaded, updatedFilesUploaded] = useState({});

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
        <h3>COMPATABLE WITH PDF (MULTIPLE PAGES SUPPORTED)</h3>
        <form className="form-center" onSubmit={handleSubmit(onSubmit)}>  
          {errors.upload && errors.upload.type === 'required' && <div>file missing</div>}
          <label htmlFor="upload">Upload File</label>
          <input
            className="draggable-container" 
            type="file" 
            name="upload" 
            id='upload'
            multiple 
            ref={register({
              required: true,
            })}
          />
          {fileName && <div>Uploaded file name is {fileName}</div>}
          <button type="submit">submit</button>
        </form>
        {
          showCheckBox(filesUploaded)
        }
        {showDetectButton &&
          <Button
            variant="primary"
            onClick={ handleClick }
          >
            Detect Text
          </Button>
        }
      </div>
    </div>
  );
    
  
};

export default HelloForm;
