import React from "react";
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';
import flv from 'flv.js'
;

class StreamShow extends React.Component{
    
    constructor(props){
        super(props);
        this.videoRef=React.createRef();
    }
    
    componentDidMount(){
        
        console.log(this.props);
        const id =this.props.match.params.id
        this.props.fetchStream(id);
        this.buildPlayer();

    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        this.player.destroy();
    }

    buildPlayer(){
        if(this.player || !this.props.stream ){ // if we dont build a player or do not have a stream
            return ;
        }
        const id =this.props.match.params.id
        this.player =flv.createPlayer({
            type:'flv',
            url:`http://localhost:8000/live/${id}.flv`
        }); 
    
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }




    render(){
        if(!this.props.stream){
            return <div>Loading...</div>;
        }  


        const {title, description} =this.props.stream;
        return (
                <div>
                    <video ref={this.videoRef} style={{width:'100%'}} controls={true}/>
                    <h1>{title}</h1>
                    <h5>{description}</h5>
                </div>
            );
    }
}


const mapStateToProps=(state,ownProps)=>{
    return {stream:state.streams[ownProps.match.params.id]};
}



export default connect(mapStateToProps,{fetchStream}) (StreamShow);


{/* <script src="https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js"></script>
<video id="videoElement"></video>
<script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://localhost:8000/live/STREAM_NAME.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script> */}