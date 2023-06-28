import { useState } from "react";

import { useSignup } from "../hooks/useSignup";

import './LoginSignup.css';



const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = useSignup();



    const handleSubmit = async (eventObj) => {
        eventObj.preventDefault();

        if (!email || !password) {
            alert('Please provide values for all input fields')
            return;
        }

        const error = await signup(email, password); 

        if (error) {
            alert(error);
            return;
        }

        alert('You have successfully been signed up');
        
        setEmail('');
        setPassword('')
    }


    return (
        <div className="login-signup-form-container">
            <form onSubmit={handleSubmit}>
                
                <p>Sign up</p>
    
                <div>
                    <p className="email-p">Email</p>
                    <input onChange={(eventObj) => setEmail((eventObj.target.value).toLowerCase())} value={email} placeholder='Email' />                    
                </div>
    
                <div>
                    <p className="password-p">Password</p>
                    <input type='password' onChange={(eventObj) => setPassword(eventObj.target.value)} value={password} placeholder='Password' />                    
                </div>
    
                <button className="login-signup-button">Sign up</button>
    
            </form>    
        </div>
    );
}
 
export default Signup;