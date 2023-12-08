import React from 'react';
import './ImageIlustrator.css'
import defaultImage from "../../assets/images/default-image.jpeg"

const ImageIlustrator = ({ alteText, imageRender = defaultImage,  additionalClass = "" }) => {



    return (
        <figure className='illustrator-brox'>
            <img
                src={imageRender}
                alt={alteText}
                className={`illustrator-box__image ${additionalClass}`}
            />
        </figure>
    );
};

export default ImageIlustrator;