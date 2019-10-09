import React, {useState} from 'react';
import axios from 'axios';
import {EThree} from '@virgilsecurity/e3kit';

function Login() {
    const [credentials, setCredentials] = useState({
        identity: '',
        password: ''
    })

    const submitLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/auth/login-patient', credentials)
            .then(results => {
                // console.log(results.data.virgilToken)

                async function getVirgilToken() {
                    const response = await axios.get('http://localhost:4000/virgil-jwt', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': results.data.token
                        }
                    })

                    return response.data.virgilToken
                }

                const ethreeStuff = EThree.initialize(getVirgilToken)
                console.log(ethreeStuff)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = e => {
        console.log(credentials) 
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='login-container'>
            <form onSubmit={submitLogin}>
                <input  
                    type='text'
                    name='identity'
                    placeholder='identity'
                    value={credentials.identity}
                    onChange={handleChange}
                />
                <input  
                    type='text'
                    name='password'
                    placeholder='password'
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button>Patient Login!</button>
            </form>
        </div>
    )
}

export default Login;