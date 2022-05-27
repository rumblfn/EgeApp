import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from 'use-debounce';
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./style.css";

export const AuthPage = () => {
    const navigate = useNavigate();
    const isUserAuthed = useTypedSelector<any>(state => state.user.user.statusUser);

    const {setUser} = useActions();
    const [loginValue, setLoginValue] = useState<string>("");
    const [tryedTologin, setTryedTologin] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const [loginValueDebounced] = useDebounce(loginValue, 500);
    const [passwordDebounced] = useDebounce(password, 500);

    const [loginIsFree, setLoginIsFree] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [register, setRegister] = useState(false);

    const [registerIsLoading, setRegisterIsLoading] = useState(false);

    async function checkLoginOnServer(login: string) {
        return await axios.get(`http://192.168.1.61:8888/user/checkLogin/?login=${login}`)
    }

    async function signUp() {
        return await axios.post(`http://192.168.1.61:8888/auth/register`, {
            login: loginValue,
            password: password
        })
    }

    useEffect(() => {
        if (isUserAuthed && tryedTologin) {
            navigate('/profile')
        }
    }, [isUserAuthed, tryedTologin])

    useEffect(() => {
        if (register) {
            checkLoginOnServer(loginValueDebounced)
                .then(res => setLoginIsFree(res.data['check']))
            
            let correct = true

            if (loginValueDebounced.length < 5) {
                setError("login must contain at least 5 characters")
                correct = false
            }

            if (passwordDebounced.length < 8) {
                setError("password must contain at least 8 characters")
                correct = false
            }

            if (correct) {
                setError("")
            }

        } else {
            setLoginIsFree(true)
            setError("")
        }
    }, [register, loginValueDebounced, passwordDebounced])

    const handleAuth = () => {
        if (register) {
            if (loginValue.length >= 5 && password.length >= 8) {
                setRegisterIsLoading(true)
                signUp().then(res => {
                    setRegisterIsLoading(false)
                    if (res.data.status) {
                        setRegister(false)
                    }
                })
            }
        } else {
            if (loginValue && password) {
                setUser(loginValue, password)
                setTryedTologin(true)
            } else {
                setError("fields can not be empty")
            }
        }
    }

    return (
        <div className="container">
            <div style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: 500, margin: '64px auto'}}>
                    <h2 style={{margin: '10px 0', color: 'var(--app-link-color1)'}}>
                        {register ? "Registration" : "Authorization"}
                    </h2>
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
                    <button onClick={handleAuth} className="auth-button"
                        style={{backgroundColor: registerIsLoading ? "var(--app-link-color2)" : "var(--app-color-theme)"}}
                    >
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
                    {
                        !loginIsFree &&
                            <div className="error-msg">
                                Login exist
                            </div>
                    }
                    {
                        error &&
                            <div className="error-msg">
                                {error}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}