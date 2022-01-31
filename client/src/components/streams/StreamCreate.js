import React from "react";
import { connect } from "react-redux";
import {createStream} from '../../actions';
import StreamForm from "./StreamForm";





class StreamCreate extends React.Component{
    
    onSubmit=(formValues)=>{
        this.props.createStream(formValues);
    }


     
    //qustion how does it connect the button to the form itself in that way when i'm pushing submit ?****
     render() {
        return (
            <div>
                <h3>
                    Create a Stream
                </h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
          
        
    }
}



export default connect(null,{createStream}) (StreamCreate);