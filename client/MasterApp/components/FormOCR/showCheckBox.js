import React from 'react'
import PropTypes from 'prop-types';
import { guid } from '../../common/globalFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import './styles.scss';

const ShowCheckBox = (props) => {
    ShowCheckBox.propTypes = {
        files: PropTypes.object,
    };

    const {files} = props;

    return Object.keys(files).map((el) => (
        <div className="upload-data" key={guid()}>
            <h4 style={{color: "white"}}>{el}</h4>
            <FontAwesomeIcon icon={faCheckSquare} /> 
        </div>
    ))
}

export default ShowCheckBox