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
  const [token, setToken] = useState("");

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

  const verifyOTP = async () => {
    try {
      const authCredential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const userCredential = await signInWithCredential(auth, authCredential);
      console.log(userCredential._tokenResponse.idToken);
      // https://fifty-fin-auth-n77ca4jn5a-el.a.run.app/api/v1/user/email/iamchiragchopra@gmail.com
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const userDetails = () => {
    fetch("http://34.100.172.255/user/email/abc@example.com", {
      method: "GET",
      // mode: "cors",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <button onClick={userDetails}>Fetch User </button>
    </div>
  );
}

export default App;
