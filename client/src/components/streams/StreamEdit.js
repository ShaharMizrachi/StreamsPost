import _ from 'lodash'; // going to use a function from lodash to basically just pick out the values or the properties from that stream object that we care about and that we actually want to pass down as initial values
import React from "react";
import { connect } from "react-redux";
import {fetchStream, editStream} from '../../actions';
import StreamForm from "./StreamForm";




class StreamEdit extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    //our callBack for StramForm 
    onSubmit =(formValues)=>{
        console.log(formValues);
        this.props.editStream(this.props.match.params.id,formValues);
    };
    
    render(){
        if(!this.props.stream.title){
            return <div>NO title was Entered</div>;
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm initialValues={_.pick(this.props.stream, 'title','description')} onSubmit={this.onSubmit} />
            </div>
        );

    }



}


const mapStateToProps= (state, ownProps) =>{ //ownProps that is a referace for the props inside our StreamEdit component
    
    return {stream:state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps,{fetchStream, editStream}) (StreamEdit);