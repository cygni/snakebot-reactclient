import { getToken } from '../api'
import { useState } from 'react';
import { useAppDispatch } from '../context/hooks';
import { setLoggedIn } from '../context/slices/tournamentSlice';
import { useNavigate } from 'react-router-dom';

function LoginView() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, SetErrorMessage] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        
        getToken( username, password )
        .then((response: {success: boolean, data: string}) => {
            if(response.success){
                console.log("Login success");
                localStorage.setItem("token", response.data);
                dispatch(setLoggedIn(true));
                SetErrorMessage('');
                navigate('/');
            }
            else{
                console.log("Login failed'");
                SetErrorMessage(response.data);
            }
        })

        setUserName('');
        setPassword('');
    }

  return (
    <section className="page clear-fix">
        <article>
            <h1>Log In</h1>
            <div className="text-content">
                <div className="box">
                    <form onSubmit={handleSubmit} > 
                    
                        <label htmlFor="username">Username</label>
                        <input
                        value={username}
                        onChange={event => setUserName(event.target.value)} type="text"
                        id="username" placeholder="your.name@cygni.se"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        id="password" type="password" placeholder="password"
                        />
                        <input type="submit" value="Log in" />
                    </form>
                    <span style={{ color: 'red' }}>
                        {errorMessage}
                    </span>
                </div>
            </div>
        </article>
    </section>
  )
}

export default LoginView