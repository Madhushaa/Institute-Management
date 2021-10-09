import React,{useState, useEffect,useRef} from "react";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print'
//import { useReactToPrint } from 'react-to-print';
import axios from "axios";

export default class ComponentToPrint extends React.PureComponent {
  constructor(props){
    super(props);

    this.state={
        payment:[]

    };
  }


  componentDidMount(){
    this.retrieveEnroll();
  }

  retrieveEnroll(){
    axios.get("http://localhost:8070/report").then(res =>{
        if(res.data.success){
            this.setState({
              payment:res.data.existingPayment
            });

            console.log(this.state.payment)
        }
    })
  }





  render(){
  return(
    <div>
        <h1 style={{textAlign:'center',marginTop:'30px'}}> Students Payments </h1>
            <br></br>
        <hr></hr>
        <table className="table table-striped" style={{marginLeft: '50px',width:'90%'}}>
        <thead>
            <tr>
                <th >Name</th>
                <th >NIC</th>
                <th >Email</th>
                <th >Subject</th>
                <th >Bank</th>
                <th >Amount</th>
                <th>Deposited_Date</th>

                
            </tr>
        </thead>               

                  <tbody>
                        {this.state.payment.map((payment,index) =>(
                    <tr  >
                        <td>{payment.name}</td>
                        <td>{payment.nic}</td>
                        <td>{payment.email}</td>
                        <td>{payment.subject}</td>
                        <td>{payment.bank}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.deposited_date}</td>
                 
                        
                    </tr>
                ))
                    
                }
        </tbody>
        
        </table>
    </div>
  )
}
}


export class Example extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint content={() => this.componentRef}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button className="btn btn-info" style={{ marginLeft:'85%',marginTop:'10px'}} onClick={handlePrint}>Generate PDF</button>

             
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}