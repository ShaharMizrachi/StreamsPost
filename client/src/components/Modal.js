import React from "react";
import ReactDOM from 'react-dom';
import history from "../history";

// one we have onClick={()=>history.push('/')} every time we gonna push outside the button it is gonna go out but! 
//we want if we gonna push inside our window to stay there  and not to bubble up that why we gonna use also onClick={(event)=>event.stopPropagation()}

const Modal = props =>{
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visibal active">
            <div onClick={(event)=>event.stopPropagation()} className="ui standard modal visible active"> 
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;