import React, {useState} from 'react';
import axios from 'axios';
import {EThree} from '@virgilsecurity/e3kit';

function Register() {
    const [credentials, setCredentials] = useState({
        identity: '',
        password: '',
        email: '',
        coachId: 1,
        bio: ''
    })

    const submitRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/auth/register-patient', credentials)
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
            <form onSubmit={submitRegister}>
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
                <input  
                    type='text'
                    name='email'
                    placeholder='email'
                    value={credentials.email}
                    onChange={handleChange}
                />
                <input  
                    type='text'
                    name='bio'
                    placeholder='bio'
                    value={credentials.bio}
                    onChange={handleChange}
                />
                <button>Patient Register!</button>
            </form>
        </div>
    )
}

export default Register;