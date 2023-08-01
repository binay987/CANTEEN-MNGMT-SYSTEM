import React, { useState } from 'react'

export default function LogIn() {

    const [credentials,setCredentials] = useState({username:'', password:''});

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    const host ="localhost:4000/api/fetch/user"
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
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
            </div>
        </>
    )
}
