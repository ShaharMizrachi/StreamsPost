import React from "react";
import { connect } from "react-redux";
import {fetchStream} from '../../actions';


class StreamEdit extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    
    render(props){
        if(!this.props.stream.title){
            return <div>NO title was Entered</div>;
        }
        return <div>{this.props.stream.title}</div>;

    }



}


const mapStateToProps= (state, ownProps) =>{ //oenProps that is a referace for the props inside our StreamEdit component
    
    return {stream:state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps,{fetchStream}) (StreamEdit);