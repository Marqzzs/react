import React from "react";
import "./Title.css";
//as props voce pode dar o nome que quiser, porem tome cuidado ao colocar palavras reservadas do javascript, e nao coloque no portifolio lol :)!
const Title = ({ titleText, color = "", potatoClass = "" }) => {
  return (
    <h1 className={`title ${potatoClass}`} style={{ color: color }}>
      {titleText}

      <hr
        className="title__underscore"
        style={color !== "" ? { borderColor: color } : {}}
      />
    </h1>
  );
};

export default Title;
