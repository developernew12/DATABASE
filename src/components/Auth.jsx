import { signInWithPopup,signInWithCredential } from "firebase/auth";
import {auth,googleProvider} from "../config/firebase";
import logo from "../assets/logo 3.png";
const Auth = () => {

    const onLogin = async () => {
        try{
            const data = await signInWithPopup(auth,googleProvider);
            console.log(data.user);
            
        }
       catch{
          console.log("error");
       }
    };
  return (
    <>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column",gap: "20px"}}>
        <img src={logo} alt="" srcset="" width="130px"/>
        <h1>Grid - FireBase</h1>
        <button onClick={onLogin}>Login with Google</button>
      </div>
    </>
  );
};
export default Auth;
