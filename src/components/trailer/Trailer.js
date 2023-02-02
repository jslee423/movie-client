import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './Trailer.css';

const Trailer = () => {
    let params = useParams();
    const key = params.ytTrailerId;

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className='react-player-container'>
            {(key != null)
                ? <ReactPlayer
                    controls={true}
                    playing={true}
                    url={`https://www.youtube.com/watch?v=${key}`}
                    width = '100%'
                    height = '100%'
                /> 
                : null}
            <div className='close-player-button-container' onClick={goBack} >
                <FontAwesomeIcon icon={faXmark} className="close-button-icon" />
            </div>
        </div>
    )
}

export default Trailer