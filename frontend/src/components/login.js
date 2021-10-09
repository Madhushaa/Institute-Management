import axios from "axios";
import React from "react";

export function enrolll() {
    return (
        <div className="container">

            <div style={{ marginTop: '25px' }}>
                <div >
                    <h1><b>Enroll in Subjects</b></h1>
                </div>


            </div><hr></hr>


            <form onSubmit={(e)=> login(e)}>

                <div className="form-group">
                    <label for="email"> Email</label>
                    <input className="form-control" 
                        type="email"
                        id="email" /> &nbsp;&nbsp;&nbsp;&nbsp;

                </div>
                <div className="form-group">
                    <label for="password"> password</label>
                    <input className="form-control" 
                        type="password"
                        id="password" />


                </div>
                <button type="submit " className="btn btn-warning"  > submit</button>
            </form>

        </div>
    );

}

function login(e){
    e.preventDefault();
    let request={
        email:document.getElementById('email').value,
        password:document.getElementById('password').value,
    }
    axios.post("http://localhost:8070/login",request)
    .then(res=>{
        if(alert(res.data.success)==true){
        window.location.href = "viewEnroll"
        }
        
    }).catch(err =>{
        console.log(err);
    })
}