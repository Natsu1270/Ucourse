import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginStart } from "../../redux/User/user.actions";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleFormSubmit = (event) => {
        event.preventDefault()
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        name === "username" ? setUsername(value) : setPassword(value)
    }

    return (
        <div className="login">
            <form onSubmit={handleFormSubmit} className="form">
                <label htmlFor="username" className="form-label">Username or Email</label>
                <input type="text" name="username" id="username" value={username}
                       onChange={handleInputChange}/>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" id="password" value={password}
                       onChange={handleInputChange}/>
                <button type="submit" onClick={()=>dispatch(loginStart({username, password}))}>Login</button>
            </form>
        </div>
    );
}

export default Login;