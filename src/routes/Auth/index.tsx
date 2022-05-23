import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from 'use-debounce';

export const AuthPage = () => {
    const [loginValue, setLoginValue] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginValueDebounced] = useDebounce(loginValue, 500);

    const [loginIsFree, setLoginIsFree] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [register, setRegister] = useState(false);

    async function checkLoginOnServer(login: string) {
        return await axios.get(`http://192.168.1.61:8888/user/checkLogin/?login=${login}`)
    }

    useEffect(() => {
        if (loginValue.length < 5) {
            setError("the login must contain at least 5 characters")
        }
    }, [loginValue])

    useEffect(() => {
        if (password.length < 8) {
            setError("the password must contain at least 8 characters")
        }
    }, [password])

    useEffect(() => {
        checkLoginOnServer(loginValueDebounced)
            .then(res => setLoginIsFree(res.data['check']))
    }, [loginValueDebounced])

    const handleAuth = () => {
        if (!error) {
            
        }
    }

    return (
        <div className="container">
            <div style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: 500, margin: '64px auto'}}>
                    <input type="text" className="auth-input" 
                        value={loginValue} 
                        placeholder={register ? "type your new login" : "type your email or login"}
                        onChange={e => setLoginValue(e.target.value)}
                    />
                    <input type="password" className="auth-input" 
                        value={password}  
                        placeholder={register ? "and here, type your new password" : "password"}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button onClick={handleAuth} className="auth-button">
                        {
                            register ? "Sign up" : "Log in"
                        }
                    </button>
                {
                    register ? 
                        <p style={{fontSize: 18}}>
                            <span style={{marginRight: 12}}>
                                Already have an account?
                            </span>
                            <span onClick={() => setRegister(false)} style={{margin: 0, padding: 0, fontSize: 18}} 
                                className="link-with-hover link-with-hover1">
                                    Log In
                            </span>
                        </p> 
                        :<p style={{fontSize: 18}}>
                            <span style={{marginRight: 12}}>
                                Don't have an account?
                            </span>
                            <span onClick={() => setRegister(true)} style={{margin: 0, padding: 0, fontSize: 18}} 
                                className="link-with-hover link-with-hover1">
                                    Sign up
                            </span>
                        </p>
                }
                </div>
            </div>
        </div>
    )
}