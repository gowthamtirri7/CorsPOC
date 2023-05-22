import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebase";

// const firebaseApp = initializeApp(firebaseConfig); // Initialize your firebase app

function App() {
  const recaptchaVerifier = useRef(null);
  const phoneProvider = useRef(null);
  // const auth = getAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    phoneProvider.current = new PhoneAuthProvider(auth);
    recaptchaVerifier.current = new RecaptchaVerifier("recaptcha", {}, auth);
  }, []);

  const verifyPhoneNumber = async () => {
    try {
      const tempVerificationId = await phoneProvider.current.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(tempVerificationId);
      console.log("Verification ID:", tempVerificationId);
      // Continue with the verification process, prompt for OTP, etc.
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  const verifyOTP = () => {
    try {
      // const authCredential = PhoneAuthProvider.credential(
      //   verificationId,
      //   verificationCode
      // );
      // const userCredential = await signInWithCredential(auth, authCredential);
      // console.log(userCredential.user.email);
      // https://fifty-fin-auth-n77ca4jn5a-el.a.run.app/api/v1/user/email/iamchiragchopra@gmail.com
      fetch(
        "https://fifty-fin-auth-n77ca4jn5a-el.a.run.app/api/v1/user/email/iamchiragchopra@gmail.com",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjI2MzY4YTNkMWExNDg1YmNhNTJiNGY4M2JkYjQ5YjY0ZWM2MmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlmdHktZmluLWRldi0xIiwiYXVkIjoiZmlmdHktZmluLWRldi0xIiwiYXV0aF90aW1lIjoxNjg0MzkyNzEzLCJ1c2VyX2lkIjoiWnZkem5VYkpHemFlMEJjTkhBZjEwaVdGWUZsMiIsInN1YiI6Ilp2ZHpuVWJKR3phZTBCY05IQWYxMGlXRllGbDIiLCJpYXQiOjE2ODQzOTI3MTMsImV4cCI6MTY4NDM5NjMxMywicGhvbmVfbnVtYmVyIjoiKzkxOTE4MjM5NjUwOSIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxOTE4MjM5NjUwOSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.RnjJlT6UNK8cCDrHWN6ynMy3dZUjBR3k3r-YUV1TLWOAwp1JsvsSeGLyfrbPZGF7wmuBCx80WTMf68EnG_rphD1mw10LuLMGXzSK-RP23lgSjvKdBnNXq8KPZIvOXcsFkHr1QMAOuWtk4MwqjNBWvK0yYEkPOLpJMYeZv7nLK_yQb5KPAszUg6Pi5MHLmluA7WRDd5JF2D6SeJqbzktsYTN7iWUrCB1oxLwfLNTCw9Fwp4Bf4SuF-3X2rVpKym08-waFnQzDYU4IlHSX5jY_iUl9a-VF0HRIDnUy-JN_aclj3x3UfNio-NPz5FhMbGLcskH-5UMDHlwP1W3B8v7pTw`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Login with OTP</h1>
      <div id="recaptcha"></div>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter Phone Number"
      />
      <button onClick={verifyPhoneNumber}>Send OTP</button>
      <br />
      <br />
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={verifyOTP}>Verify OTP</button>
    </div>
  );
}

export default App;
