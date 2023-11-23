import React from 'react';
import './FormComponents.css'

export const Input = ({
    type,
    id,
    value,
    required,
    additionalClass = "",
    name,
    placeholder,
    onChange,
    manipulationFunction,

}) => {

    return (
        <input 
            type={type}
            id={id}
            name={name}
            value={value}
            required={required ? "required" : ""}
            className={`input-component ${additionalClass}`}
            placeholder={placeholder}
            onChange={manipulationFunction}
            autoComplete="off"
        />
    );

};

export const Label = ({
    htmlFor,
    labelText
}) => {
    return <label htmlFor={htmlFor}>{labelText}</label>;
};

export const Button = ( {id, name, type, textButton, manipulationFunction, additionalClass} ) => {
    return(
        <button
            id={id}
            name={name}
            type={type}
            className={`button-component ${additionalClass}`}
            onClick={manipulationFunction}
        >
            {textButton}
        </button>
    );
};

export const Select = ({
    required,
    id,
    name,
    options = [],
    manipulationFunction,
    additionalClass="",
    value=""
}) => {
    
    return(
        
        <select 
            name={name} 
            id={id}
            required={required}
            className={`input-component ${additionalClass}`}
            onChange={manipulationFunction}
            value={value}

        >
            <option value="">Selecione</option>
            {/* options.map(??) */}
            {options.map((o, i) => {
                return(
                  <option key={i} value={o.value}>{o.text}</option>  
                );
            })}
        </select>
    )
}