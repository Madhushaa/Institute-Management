import React, {Component} from "react";
import axios from 'axios';


export default class UpdateKeys extends Component {

    constructor(props){
        super(props)
        this.state={
            subjectName:"",
            enrollmentKey:""

        }
    }

    handleInputChange = (e) =>{
        const{name,value} = e.target;

        this.setState({
            ...this.state,  
            [name]:value
        })
    }

    onSubmit = (e) =>{
        
        e.preventDefault();
        const id = this.props.match.params.id;
        const{subjectName,enrollmentKey} = this.state;

        const data={
            subjectName:subjectName,
            enrollmentKey:enrollmentKey
        }
        console.log(data)

        axios.put(`http://localhost:8070/subject/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Subject profile updated sucesssfully")
                this.setState({
                        subjectName:"",
                        enrollmentKey:""
                    });
            }
        })
    }


    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/subject/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({                
                    subjectName:res.data.subject.subjectName,
                    enrollmentKey:res.data.subject.enrollmentKey,
                });
                console.log(this.state.subject);
            }
        });
    }

    


    render(){ 
        return(
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb=3 font-weight-normal">Update Enrollment Key</h1>
   
                    <form className="needs-validation" noValidate>
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <p style={{marginBottom:'5px'}} >SubjectName</p>
                            <input type="text" className="form-control" name="subjectName" placeholder="Enter subjectName"
                            value={this.state.subjectName} onChange={this.handleInputChange} readOnly/>
                
                        </div>

                        

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>Enrollment Key</p>
                    <input type="String" className="form-control" name="enrollmentKey" placeholder="Enter aboutClass"
                        value={this.state.enrollmentKey} onChange={this.handleInputChange}/>
                </div>

          

                        <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                            <i className="far fa-check-square"></i> &nbsp;Update
                        </button>

                    </form>
               
            </div>  
        )
    }

}