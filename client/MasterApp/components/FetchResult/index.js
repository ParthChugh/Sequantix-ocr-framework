import React, { useEffect, useState } from 'react';
import { CSVDownload } from "react-csv";
import { Spinner } from 'react-bootstrap'
import { BASE_URL } from '../../../constants';
import '../FormOCR/styles.scss';
import SequantixLogo from '../../../assests/SqxBigHome.png';

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
  },[])
  return (
    <div className="center-page"> 
        <div className="logo-header"> 
          <img src={ SequantixLogo } />
          <div>
            CSV will be downloaded soon<br/>
          </div>
          
          { showSpinner ?
            <Spinner animation="border" variant="primary" />   
            : 
            <div>   
              <CSVDownload data={finalCSV.lists} />          
              
              <h2>Thank you for using Sequivision</h2>
            </div>
          }
        </div>
    </div> 
  )
}

export default FetchResult;