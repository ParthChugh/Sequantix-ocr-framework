import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap'
import { BASE_URL } from '../../../constants';
import '../FormOCR/styles.scss';
import SequantixLogo from '../../../assests/SqxBigHome.png';

const FetchResult = (props) => {  
  const {location: {state: {detail}}} = props;
  const [showSpinner, updateShowSpinner] = useState(true)
  const [url, updateURL] = useState("")
  debugger;
  const fetchData = () => { 
    const url = `${BASE_URL}/update_bounding_box?file_name=${detail.name}&total_pages=${detail.total_pages}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': detail.access_token
      },
    })
      .then((response) => response.json().then((json) => {
        const getCSVurl = `${BASE_URL}/getcsv?file_name=${json.file_name}`;
        fetch(getCSVurl).then(()=> console.log('Downloaded'));
        updateURL(getCSVurl);
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
          { 
            showSpinner ?
            <Spinner animation="border" variant="primary" />   
            : 
            <div>
              <div >
                <a href={url} target="_blank">Download csv</a>  
              </div>   
              <h2>Thank you for using Sequivision</h2>
            </div>
          }
        </div>
    </div> 
  )
}

export default FetchResult;