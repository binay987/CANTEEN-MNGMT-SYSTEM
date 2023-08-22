import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [credentials, setCredentials] = useState({ id: '', name: '', department: '', batch: '', password: '' });
    const navigate = useNavigate()
    const [viewError, setViewError] = useState(null)

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSignUpSubmit = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/signup', { Id: credentials.id, Name: credentials.name, Department: credentials.department, Batch: credentials.batch, Password: credentials.password })
            .then(function (response) {
                if (response.data.success) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('id', response.data.Id)
                    localStorage.setItem('name', response.data.Name)
                    localStorage.setItem('balance', response.data.Balance)
                    localStorage.setItem('isAdmin', response.data.isAdmin)
                    navigate('/user')
                }
                else {
                    setViewError(response.data.message)
                }
            })
            .catch(function (error) {
                setViewError('Server error')
            })
    }
    return (
        <>
            <div classCampus ID="container">
                <h1 className='text-center m-3'>Login</h1>
                <form onSubmit={handleSignUpSubmit}>
                    <div class="mb-3 mt-3">
                        <label for="campus id" class="form-label fw-bold">Campus ID:</label>
                        <input type="campus id" class="form-control" name="id" placeholder="Enter campus id e.g:0777BEI55" onChange={onChange} value={credentials.id} />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="campus id" class="form-label fw-bold">Name:</label>
                        <input type="campus id" class="form-control" name="name" placeholder="Enter your Name" onChange={onChange} value={credentials.name} />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="campus id" class="form-label fw-bold">Department:</label>
                        <input type="campus id" class="form-control" name="department" placeholder="Enter your Department" onChange={onChange} value={credentials.department} />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="campus id" class="form-label fw-bold">Batch:</label>
                        <input type="campus id" class="form-control" name="batch" placeholder="Enter Batch" onChange={onChange} value={credentials.batch} />
                    </div>
                    <div class="mb-3">
                        <label for="pwd" class="form-label fw-bold">Password:</label>
                        <input type="password" class="form-control" name="password" placeholder="Enter password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className='text-center'>
                        <button type="submit" class="btn btn-primary mt-3">Sign up</button>
                    </div>
                    {/* Username: {credentials.username}<br/>
                    Password: {credentials.password} */}
                </form>
                <h4 className='text-center text-danger'>{viewError}</h4>
            </div>
        </>
    )
}
