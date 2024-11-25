import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputPage from './InputPage'
import DisplayPage from "./DisplayPage";
import Auth from "./components/Auth";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/firebase';
function App() {
  const [user, setUser] = useState(null);
  const [details,setDetails] = useState([]);
 
  const handleSave = (newDetails) => {
    const updatedDetails = [...details,newDetails];
    setDetails(updatedDetails);
    localStorage.setItem("details",JSON.stringify(updatedDetails));
  }
  
  useEffect(() => {
    const savedDetails = localStorage.getItem("details");
    if(savedDetails){
      setDetails(JSON.parse(savedDetails));
    }
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => subscribe();
  },[]);
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  }
  return (
    <Router>
      {user ? (
        <>
          <nav style={{position:"fixed"}}>
            <ul style={{ listStyle: 'none',}}>
              <div className='navBar'>
                <li>
                  <Link to="/">Input Information</Link>
                </li>
                <li>
                  <Link to="/DisplayPage">Fetch Information</Link>
                </li>
             
             
                
                  <button className='li' onClick={handleLogout} style={{cursor: 'pointer',fontSize: "small" }}>
                    Logout
                  </button>
                
              </div>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<InputPage onSave={handleSave}  details={details}/>} />
            <Route path="/DisplayPage" element={<DisplayPage data={details} />} />
          </Routes>
        </>
      ) : (
        <Auth />
      )}
    </Router>
  );
}

export default App
