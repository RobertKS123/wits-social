import React, {useState} from 'react'
import Validation from './Validation'; 

const Signup = () => {

    const [values, setVlaues] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [success,setSuccess] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setVlaues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <div>
                    <h1>Account Created!</h1>
                    <br />
                    <p>
                        {/* This is where the user will be directed after signup */}
                        <a href='#'>Continue to Wits-Social</a> 
                    </p>
                </div>
            ) : (
            <div className='container'>
                <div className='app-wrapper'>
                    <h2 className='title'>Create Account</h2>
                </div>
                <form className='form-wrapper'>
                    <div className='name'>
                        <label className='lable'>UserName</label>
                        <input 
                            className='input' 
                            type='text' 
                            name='username' 
                            value={values.username}
                            onChange={handleChange}
                            required
                        />
                        {errors.username && <p className='errormessage'>{errors.username}</p>}
                    </div>
                    <div className='name'>
                        <label className='lable'>Email Adress</label>
                        <input 
                            className='input' 
                            type='email' 
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className='errormessage'>{errors.email}</p>}
                    </div>
                    <div className='name'>
                        <label className='lable'>Password</label>
                        <input 
                            className='input' 
                            type='password' 
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className='errormessage'>{errors.password}</p>}
                    </div>
                    <div>
                        <button className='submit' onClick={handleFormSubmit}>Signup</button>
                    </div>
                </form>
            </div>
            )}
        </>
    )
}

export default Signup