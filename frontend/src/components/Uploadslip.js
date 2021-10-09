import React, { useState } from "react";
import axios from "axios";
import Image from "../paymentimages/payment.png"
import '../payment.css';
//import "react-datepicker/dist/react-datepicker.css";
import validator from 'validator'
//import 'react-datetime/css/react-datetime.css';
import background from "../paymentimages/123.jpg"



const Uploadslip = () => {

  const [emailError, setEmailError] = useState("");
  const [nicError, setNicError] = useState("");
  const [file_path, setFile_path] = useState(null);
  const [state, setState] = useState({
    name: '',
    nic: '',
    email: '',
    subject: '',
    bank: '',
    amount: '',
    deposited_date: ''
  });

  const inputOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email!!!')
    }
  }

  const validateNic = (e) => {
    var nic = e.target.value

    if (!nicValidation(nic)) {
      setNicError('')
    } else {
      setNicError('Invalid NIC!!!')
    }
  }


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { name, nic, email, subject, bank, amount, deposited_date } = state;
    const formData = new FormData();

    formData.append('file_path', file_path);
    formData.append('name', name);
    formData.append('nic', nic);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('bank', bank);
    formData.append('amount', amount);
    formData.append('deposited_date', deposited_date);

    const config = {
      headers: {
        'content-type': 'multipart/forem-data',
      }
    };


    axios.post('http://localhost:8070/file/uploadslip', formData, config).then((response) => {
      alert('Payement Details submitted successfully..')

    }).catch((err) => {
      alert('Please attach only JPG,PNG or SVS format image!! ');

    })

  };

  const handleInputChange = (e) => {
    setFile_path(e.target.files[0])
  }


  const nicValidation = (nic) => {
    if (nic.length == 10 || nic.length == 12) {
      if (nic.length == 10) {
        // last letter should V
        const lastLetter = nic[nic.length - 1];
        const numbers = nic.slice(0, nic.length - 1);
        console.log(numbers, !isNaN(numbers))
        if ((lastLetter === 'V' || lastLetter === 'v') && !isNaN(numbers)) return false;

        return true;
      }

      // if length 12
      else if (nic.length == 12) {
        // only digits
        if (!isNaN(nic)) return false;

        return true;
      }
    }
    else {
      return true;
    }
  };

  function datelimit() {
    var todayDate = new Date();
    var month = todayDate.getMonth() + 1; // current month
    var year = todayDate.getUTCFullYear();// current year
    var tdate = todayDate.getDate();// current date

    if (month < 10) {
      month = "0" + month
    }
    if (tdate < 10) {
      tdate = "0" + tdate
    }
    var maxDate = year + "-" + month + "-" + tdate;
    document.getElementById("demo").setAttribute("max", maxDate);
    console.log(maxDate)
  }



  return (
    
    <div style={{backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', backgroundSize:'cover',backgroundPosition:'center',backgroundAttachment:'fixed'}}>
      
      <div class="row">
        <div class="column">
          <img src={Image} alt="Image" width='100%' />
        </div>

        <h1 style={{ textAlign: 'center', marginTop: '50px', textSizeAdjust: '48dp' }}>Payment Details </h1>

      </div>


      <div className="container">

        <form style={{ backgroundColor: '#e3e1e1', padding: '30px 30px', width: '800px', marginLeft: '160px' }} 
          onSubmit={handleOnSubmit} novalidate>
          
          <div className="form-group">
            <label htmlFor="name"><b>Name</b></label>
            <input className="form-control" type="text" name='name' placeholder="Enter name.." 
            onChange={inputOnChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="nic"><b>NIC Number</b></label>
            <input className="form-control" type="text" name='nic' placeholder="Enter NIC number.." 
              onInput={validateNic} 
              onChange={inputOnChange} required />

            <span style={{fontWeight: 'bold',color: 'red'}}> {nicError} </span>
          </div>

          <div className="form-group">
            <label htmlFor="email"><b>Email</b></label>
            <input className="form-control" type="email" name='email' placeholder="Enter email (ex:- name@example.com)"
              onInput={validateEmail}
              onChange={inputOnChange} required />

            <span style={{fontWeight: 'bold',color: 'red'}}> {emailError} </span>
          </div>

          <div className="form-group">
            <label htmlFor="subject"><b>Subject</b></label>
            <select className="form-control" name="subject" style={{width:'50%'}} onChange={inputOnChange} required  >
              <option Value="">Choose a Subject</option>
              <option value="Combined Maths"> Combined Maths</option>
              <option value="Biology" > Biology</option>
              <option value="Physics" > Physics</option>
              <option value="Chemestry" > Chemestry</option>
              <option value="Economics" > Economics</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="file_path" class="form-label">
              <b>Upload your bank deposite slip </b> 
              (maximum file size: 1MB, Attach only JPG,PNG or SVS format)
            </label>
            <input className="form-control" type='file' name='file_path' onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="bank"> <b>Bank</b> </label>
            <input className="form-control" type="text" name='bank' placeholder="Enter bank"
              onChange={inputOnChange} required />
          </div>

          <div className="row g-3">
          <div className="col">
            <label htmlFor="amount"> <b>Amount</b> </label>
            <input className="form-control" type="number" name='amount' placeholder="Enter amount"
              onChange={inputOnChange}  required />
          </div>

          <div className="col">
            <label htmlFor="deposited_date"> <b>Deposited date</b> </label>
            <input className="form-control" type="date" id='demo' name='deposited_date' placeholder="Enter deposited date" 
              onSelect={datelimit}
              onChange={inputOnChange} required />
          </div>
          </div>
          <br></br>

          <button className="btn btn-primary" type='submit'> Submit </button>

        </form>

      </div>
      <br></br>

    </div>


  )
};

export default Uploadslip;