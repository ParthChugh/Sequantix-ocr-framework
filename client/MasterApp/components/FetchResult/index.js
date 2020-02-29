import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap'
import { BASE_URL } from '../../../constants';
import '../FormOCR/styles.scss';

const FetchResult = (props) => {  
  const {location: {state}} = props;
  const data = {}
  const [showSpinner, updateShowSpinner] = useState(true)
  const [url, updateURL] = useState("")
  const fetchData = () => { 
    if(typeof state !== 'undefined') {
      let data = ''
      state.detail['response'].forEach((el,index)=> {
        const newData = el['total_pages']
        const name = el['name']
        data = data + `total_pages_${index}=${newData}` + "&" + `name_${index}=${name}`+ "&"
      })
      const url = `${BASE_URL}/update_bounding_box?${data}&total_pages=${state.detail['response'].length}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': state.detail.access_token,
        }
      })
        .then((response) => response.json().then((json) => {
          const getCSVurl = `${BASE_URL}/getcsv?file_name=${json.file_name}`;
          fetch(getCSVurl).then(()=> console.log('Downloaded'));
          updateURL(getCSVurl);
          updateShowSpinner(false)
        }))
        .catch(() => {
          
        });
    } else {
      window.location.href = BASE_URL;
    }
    
  }

  useEffect(() => {
    fetchData();
  },[])
  return (
    <div className="center-page"> 
        <div className="logo-header" style={{marginTop: 200}}> 
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