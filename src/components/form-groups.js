import React from 'react'

// componente de classe funcional recebe parametros na declaração da classe
// props
function FormGroup(props){
    return (
        <div className="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup