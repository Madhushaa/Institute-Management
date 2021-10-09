import Header from './components/Header';
import Footer from './components/Footer';
import React,{Component} from 'react';
import axios from 'axios';
import {BrowserRouter, BrowserRouter as Router,Route} from "react-router-dom"
import AddEnroll from './components/AddEnroll';
import UpdateEnroll from './components/UpdateEnroll';
import ViewEnroll from './components/ViewEnroll';
import ViewEnrollSub from './components/EnrollSubject';
import Uploadslip, { Name } from './components/Uploadslip';
import addsubject from './components/addsubject';
import ViewKeys from './components/ViewKeys';
import UpdateKeys from './components/UpdateKeys';
import ViewUpload from './components/ViewUpload';
import ComponentToPrint, { Example } from './components/PayementReport';
import { enrolll } from './components/login';










///////////


function App1() {
  return (
      <Router>
        <div>
            <Header/>
            <Route path="/viewEnroll" exact component={ViewEnroll}/>   {/* ADMIN*/}
            <Route path="/enroll/add" exact component={AddEnroll}/>   {/* ADMIN*/}

            <Route path="/Update/:id" exact component={UpdateEnroll}/>  {/* ADMIN*/}
            <Route path="/enrollmentKeys" exact component={ViewKeys}/>

            <Route path="/subject/add" exact component={addsubject}/> 


            <Route path="/subject/update/:id" exact component={UpdateKeys}/>
     

            <Route path="/enrollSub" exact component={ViewEnrollSub}/>

            <Route path = "/uploadslip" exact component={Uploadslip}/>

            <Route path="/getPayments" exact component={ViewUpload}/>   {/* ADMIN*/}    

          <Route path="/paymentReport" exact component={ComponentToPrint,Example}/>  
          <Route path="/login" exact component={enrolll}/>  

          <Footer></Footer>
    


         

        </div>
    </Router>
  );
}

export default App1; 




