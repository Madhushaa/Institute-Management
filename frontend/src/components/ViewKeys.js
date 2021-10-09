import React, { Component } from 'react';
import axios from 'axios';

/////////////////
export default class ViewKeys extends Component {
constructor(props){
  super(props);

  this.state={
    subjects:[]
  };
}

componentDidMount(){
  this.retrieveSubjects();
}

retrieveSubjects(){
  axios.get("http://localhost:8070/subjects").then(res =>{
    if(res.data.success){
      this.setState({
        subjects:res.data.existingSubjects
      });

      console.log(this.state.subjects)
    }
  })
}

onDelete = (id) =>{

  axios.delete(`http://localhost:8070/subject/delete/${id}`).then((res) =>{
    alert("Deleted Successfully");
    this.retrieveSubjects();
  })
}

filterData(subjects,searchKey){
  const result = subjects.filter((subject) =>
  subject.subjectName.toLowerCase().includes(searchKey)
  
  )

  this.setState({subjects:result})
}

handleSearchArea= (e) =>{

  const searchKey = e.currentTarget.value;

  axios.get("http://localhost:8070/subjects").then(res =>{
    if (res.data.success){
      this.filterData(res.data.existingSubjects,searchKey)
    }
  });

}

  render() {
    return (
      <div className="container">

        <div style={{marginTop:'30px', textAlign:'left'}}>
            <h1><b>Enrollment Keys</b></h1>
        </div>
          <div className="row">
           <div className="col-lg-9 mt-2 mb-2">

           <div className="col-lg-3 mt-2 mb-2">
           <input
             className="form-control"
             type="search"
             placeholder="Search here..."
             name="searchenrollkey"
             onChange={this.handleSearchArea}>               
             </input>
             </div>
           </div>
         </div>
          <table className="table table-hover"style={{marginTop:'40px',width:'100%'}}>
              <thead className="header__item">
                  <tr >
                  <th scope="col">#</th>
                    <th scope="col">Subject Name</th>
                    <th scope="col">Enrollment Key</th>
               
                    <th></th>
                  </tr>
              </thead>
              <tbody>
              {this.state.subjects.map((subjects,index) =>(
                    <tr key={index} >
                      <th scope="row">{index+1}</th>
                      <td className="fw-bolder">
                        <a href={`/subjectDetails/${subjects._id}`} style={{textDecoration:'none',color:'#1e6fa0',fontFamily:'Lucida Sans,sans-serif'}}>
                        {subjects.subjectName}
                        </a>
                        </td>
                      <td>{subjects.enrollmentKey}</td>
               
                    
                      <td>

<a className="btn btn-warning" href={`/subject/update/${subjects._id}`}>
   <i className="fas fa-edit"/> &nbsp;Edit </a> 
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a className="btn btn-danger" href="#" onClick={() => this.onDelete(subjects._id)}>
   <i className="fas fa-edit"/> &nbsp;Delete </a>
</td>                   
                    </tr>     
                    
                    ))}                    
              </tbody>
          </table>
      </div>      
    )
  }
}