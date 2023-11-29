import React from "react";
import "./ImageIllustrator.css";
import tipoEventoImage from "../../assets/images/tipo-evento.svg";
import eventoImage from "../../assets/images/evento.svg";
import defaultImage from "../../assets/images/default-image.jpeg";
import loginImage from "../../assets/images/login.svg";
//import tipoEventoImage from '../../assets/images/tipo-evento.svg'

const ImageIllustrator = ({ altText, imageName, additionalClass }) => {
  let imageResource;

  switch (imageName) {
    case "tipoEvento":
      imageResource = tipoEventoImage;
      break;
    case "evento":
      imageResource = eventoImage;
      break;
    case "login":
      imageResource = loginImage;
      break;
    // case 'tipoEvento':
    //     imageResource = tipoEventoImage
    //     break;

    default:
      imageResource = defaultImage;
      break;
  }

  return (
    <figure className="illustrator-box">
      <img
        src={imageResource}
        alt={altText}
        className={`illustrator-box__image ${additionalClass}`}
      />
    </figure>
  );
};

export default ImageIllustrator;
