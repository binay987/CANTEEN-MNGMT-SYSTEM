import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const navigate = useNavigate();
    const [credentials,setCredentials] = useState({username:'', password:''});
    const [viewError, setViewError] = useState(null)

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();  // no refresh of page
        axios.post('http://localhost:5000/api/signin', {Id:credentials.username, Password: credentials.password})
        .then(function(response){
            if(response.data.success) {
                if(response.data.isAdmin){
                    navigate('/admin')
                }
                else {
                    localStorage.setItem('name',response.data.name)
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('balance',response.data.balance)
                    navigate('/user')
                }
            }
            else{
                setViewError('User Id or password incorrect')
            }
        })
        .catch(function(error){
            setViewError('Login Failed')
        })

        
    }
    return (
        <>
            <div classCampus ID="container">
                <h1 className='text-center m-3'>Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div class="mb-3 mt-3">
                        <label for="campus id" class="form-label fw-bold">Campus ID:</label>
                        <input type="campus id" class="form-control" name="username" placeholder="Enter campus id e.g:0777BEI55" onChange={onChange} value={credentials.username} />
                    </div>
                    <div class="mb-3">
                        <label for="pwd" class="form-label fw-bold">Password:</label>
                        <input type="password" class="form-control" name="password" placeholder="Enter password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className='text-center'>
                    <button type="submit" class="btn btn-primary mt-3">Sign in</button>
                    </div>
                    {/* Username: {credentials.username}<br/>
                    Password: {credentials.password} */}
                </form>
                <h4 className='text-center text-danger'>{viewError}</h4>
            </div>
        </>
    )
}
