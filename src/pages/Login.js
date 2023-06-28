import { useState } from "react";

import { useLogin } from "../hooks/useLogin";

import './LoginSignup.css';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = useLogin();



    const handleSubmit = async (eventObj) => {
        eventObj.preventDefault();

        if (!email || !password) {
            alert('Please provide values for all input fields');
            return;
        }

        const error = await login(email, password);

        if (error) {
            alert(error);
            return;
        }
    }


    return (
        <div className="login-signup-form-container">
            <form onSubmit={handleSubmit}>
                
                <p>Login</p>
    
                <div>
                    <p className="email-p">Email</p>
                    <input onChange={(eventObj) => setEmail((eventObj.target.value).toLowerCase())} value={email} placeholder='Email' />                    
                </div>
    
                <div>
                    <p className="password-p">Password</p>
                    <input type='password' onChange={(eventObj) => setPassword(eventObj.target.value)} value={password} placeholder='Password' />                    
                </div>
    
                <button className="login-signup-button">Login</button>
    
            </form>    
        </div>
    );
}
 
export default Login;