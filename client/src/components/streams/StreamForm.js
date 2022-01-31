import React from "react";
import { Field, reduxForm } from 'redux-form'





class StreamForm extends React.Component{
    renderError=(meta)=>{
        if(meta.touched && meta.error){
            return (
                <div className= "ui error message">
                    <div className="header">
                        {meta.error}
                    </div>
                </div>
            );
        }
   };
    // lable passe from Field because we passed in this prop that the field component doesn't know about, it's going to be
//passed into render input and we can receive that as an additional prop. on that first argument.
    renderInput=({input,label,meta})=>{ // object that return in case we not filling one or more from the filed correct send to compomemt from Filed 
       const errorMark=`field ${meta.error && meta.touched ? 'error' : ''}`;
       return (
            <div className={errorMark}>
                <label>{label} </label> 
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }

    

   // ask niv 
    onSubmit=(formValues)=>{
        console.log(formValues)
        this.props.onSubmit(formValues)
    }


     
  
     render() {
        //console.log(this.props);
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary" >submit</button>
            </form>
        );
    }
}

const validate= (formValues)=>{
    const error= {};

    if(!formValues.title){
        error.title='You must enter a title';
    }

    if(!formValues.description){
        error.description='You must enter a description';
    }
    //if the object is empy it is says all files are fine.
    return error;
};




export default reduxForm({
    form:'streamForm',
    validate:validate
}) (StreamForm);

