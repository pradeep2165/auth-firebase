import { useState } from "react";
import { auth } from "../firebase";
export default function MobileAuth(){
    const countryCode ="+91";
    const [phoneNumber, setPhoneNumbere] =useState(countryCode);
    const [expandForm, setExpandForm] = useState(false);

    const requestOTP = (e)=>{
        e.preventDefault();
        if(phoneNumber.length >= 12){
            setExpandForm(true);
        }
    }
    return(
        <div className="container">
            <from onSubmit={requestOTP}>
                    <h1>Sign in with phone number</h1>
                    <div className="mb-3">
                        <label htmlFor="phoneNumberInput" className="form-label">Phone number</label>
                        <input type="tel" className="form-control" id="phoneNumberInput" aria-describedby="phoneHelp" />
                        <div id="phoneNumberHelp" className="form-text">Please enter your phone number</div>
                    </div>
                    {expandForm === true ?
                    <>
                    <div className="mb-3">
                        <label htmlFor="otpInput" className="form-label">OTP</label>
                        <input type="number" className="form-control" id="otpInput"/>
                        <div id="otpHelp" className="form-text">Plese inter your phone number</div>
                    </div>
                    </>:null 
                }
                {expandForm === false ? <button className="btn btn-primary">Request OTP</button>:null}
                <div id="recaptcha-container"></div>
            </from>
        </div>
    );
}