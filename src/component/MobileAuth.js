import { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
export default function MobileAuth(){
    const countryCode ="+91";
    const [phoneNumber, setPhoneNumbere] =useState(countryCode);
    const [expandForm, setExpandForm] = useState(false);

    const generateRecaptcha =()=>{
        //recaptcha-container is the id defined in div
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.                  
            }
          }, auth);
    }
    const requestOTP = (e)=>{
        e.preventDefault();
        console.log(phoneNumber.length);
        if(phoneNumber.length >= 12){
            setExpandForm(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
              }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log(error);
              });
        }
    }
    return(
        <div className="container">
            <form onSubmit={requestOTP}>
                    <h1>Sign in with phone number</h1>
                    <div className="mb-3">
                        <label htmlFor="phoneNumberInput" className="form-label">Phone number</label>
                        <input type="tel" className="form-control" id="phoneNumberInput" aria-describedby="phoneHelp" value={phoneNumber} onChange={(e)=>setPhoneNumbere(e.target.value)}/>
                        <div id="phoneNumberHelp" className="form-text">Please enter your phone number</div>
                    </div>
                    {expandForm === true ?
                    <>
                    <div className="mb-3">
                        <label htmlFor="otpInput" className="form-label">OTP</label>
                        <input type="number" className="form-control" id="otpInput"/>
                        <div id="otpHelp" className="form-text">Plese enter otp that sent to your phone number</div>
                    </div>
                    </>:null 
                }
                {expandForm === false ? <button type="submit" className="btn btn-primary">Request OTP</button>:null}
                <div id="recaptcha-container"></div>
            </form>
        </div>
    );
}