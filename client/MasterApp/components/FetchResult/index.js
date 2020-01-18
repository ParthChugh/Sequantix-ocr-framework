import React, { useEffect, useState } from 'react';
import { CSVDownload } from "react-csv";
import { Spinner } from 'react-bootstrap'
import { BASE_URL } from '../../../constants';
import '../FormOCR/styles.scss';

const FetchResult = (props) => {  
  const {location: {state: {detail}}} = props;
  const [finalCSV, updatedCSV] = useState([])
  const [showSpinner, updateShowSpinner] = useState(true)
  const fetchData = () => { 
    const url = `${BASE_URL}/getboundingbox_and_text?file_name=${detail.name}&total_pages=${detail.total_pages}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json().then((json) => {
        console.log(json);
        updatedCSV(json)
        updateShowSpinner(false)
      }))
      .catch(() => {
        
      });
  }

  useEffect(() => {
    fetchData();
  },[finalCSV])
  return (
    <div className="center-page">

     { showSpinner ?
      <Spinner animation="border" variant="primary" />   
       : 
       <div>
         <CSVDownload data={finalCSV.lists} /> 
         <h1> Thank You for using Sequantix OCR</h1>
       </div>
      
       }
    </div>    
  )
}

export default FetchResult;