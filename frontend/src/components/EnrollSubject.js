import React, { Component } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../paymentimages/444.jpg"
import Image from "../paymentimages/download.png"


export default class ViewEnrollSub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: []

    };
  }


  componentDidMount() {
    this.retrieveSubjects();

  }

  retrieveSubjects() {
    axios.get("http://localhost:8070/subjects").then(res => {
      if (res.data.success) {
        this.setState({
          subjects: res.data.existingSubjects
        });

        console.log(this.state.subjects)
      }
    })
  }







  filterData(subjects, searchKey) {
    const result = subjects.filter((subject) =>
      subject.subjectName.toLowerCase().includes(searchKey)

    )

    this.setState({ subjects: result })
  }


  handleSearchArea = (e) => {

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8070/subjects").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingSubjects, searchKey)
      }
    });

  }


  render() {
    return (
      <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className='container' >
               
          <div class="row">
            <div class="column1">
              <img src={Image} alt="Image" width='100%' />
            </div>

            <div>
              <h1> <b>Enroll in Subjects</b> </h1>
            </div>
          </div>

          <div className="col-lg-3 mt-2 mb-2" style={{ marginLeft: '750px', width: '250px' }}>
            <input className="form-control"
              type="search"
              placeholder="Search"
              name="searchenroll"
              onChange={this.handleSearchArea}>
            </input>
          </div>
          <hr></hr>



          <table className="table" style={{ backgroundColor: '#f2f2f2', width: '85%', marginLeft: '75px' }}>
            <tbody>
              {this.state.subjects.map((subjects, index) => (
                <tr>
                  <th scope="row">{index + 1} </th>
                  <td style={{ fontSize: '20px' }}> <i>{subjects.subjectName}</i></td>
                  <td> <div className="input-group">
                    <input className="form-control" style={{ width: '35px' }}
                      type="text"
                      placeholder="Enter Enrollment key"
                      name="enrollment_key" required /> &nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to="/login" className="btn btn-warning" >
                      <i className="fas fa-edit" /> &nbsp;Enroll Me </Link>
                  </div>
                  </td>


                  {/*}   <td>

                                <a className="btn btn-warning" href={`/enrollKey/update/${enrollKey._id}`}>
                                    <i className="fas fa-edit"/> &nbsp;Edit </a> 
                                    &nbsp;
                                    <a className="btn btn-warning" href="#" onClick={() => this.onDelete(enrollKey._id)}>
                                    <i className="fas fa-edit"/> &nbsp;Delete </a>
                        </td> */}

                </tr>


              ))}
            </tbody>


          </table>

        </div>
      </div>
    )
  }
}