import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap'
import { BASE_URL } from '../../../constants';
import '../FormOCR/styles.scss';
import B1_1 from '../../../assests/B1_1.png';
import B1_2 from '../../../assests/B1_2.png';
import { useHistory } from "react-router-dom";
import B1_3 from '../../../assests/B1_3.png';
import MARRIOT_T2_1 from '../../../assests/marriot_2_1.png';
import MARRIOT_T2_2 from '../../../assests/marriot_2_2.png';
import OMNI_1 from '../../../assests/omni_1.png'
import OMNI_2 from '../../../assests/omni_2.png'

const FetchResult = (props) => {  
  let history = useHistory();
  const {location: {state}} = props;
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

  const showUploadScreen = () => {
    history.push({
      pathname: "/home",
      state: { 
        detail: {
          access_token: state.detail.access_token
        }  
      }
    });
  } 

  useEffect(() => {
    fetchData();
  },[])
  return (
    <div className="center-page"> 
      <div>
        {Object.keys(state.detail.file_names).includes('B1.pdf') ?
          <div className="container" style={{marginTop: 10}}>
            <img src={B1_1} />
            <img src={B1_2} />
            <img src={B1_3} />
          </div> : <div/>
        }
        {Object.keys(state.detail.file_names).includes('MARRIOT_T2_1.pdf') ?
          <div className="container">      
            <img src={MARRIOT_T2_1}/>
            <img src={MARRIOT_T2_2}/>
          </div> : <div/>
        }
        {Object.keys(state.detail.file_names).includes('OMNI_T2_1.pdf') || Object.keys(state.detail.file_names).includes('OMNI_T1_1.pdf')?
          <div className="container" style={{marginTop: 10}}>
            <img src={OMNI_2} />
            <img src={OMNI_1} />
          </div> : <div/>
        }
      </div>
      <div className="logo-header"> 
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
            <h2>Thank you</h2>
              <h2>Want to use for another file?</h2>        
              <button className="btn btn-secondary" onClick={showUploadScreen}>
                Click Me
              </button>
          </div>
        }
      </div>
    </div> 
  )
}

export default FetchResult;