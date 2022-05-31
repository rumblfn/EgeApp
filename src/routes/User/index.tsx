import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import profileImage from "../../images/plug.png"
import trash from "../../images/trash.png"
import { UserUserState } from '../../types/user';
import { AddArticleBox } from "../../components/addArticleBox";
import encodeImageFileAsURL from "../../components/static/encodeImageFileAsURL";
import { checkFileTypeAndSize } from "../../components/articleAction";
import { ArticleType } from "../../types/article";
import './style.css';

export const UserPage:FC = () => {
    const userData = useTypedSelector<UserUserState>(state => state.user.user);
    const [msg, setMsg] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [aboutUser, setAboutUser] = useState<string>(userData.status);
    const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(false);
    const [userImg, setUserImg] = useState<string>(userData.profileImg ? userData.profileImg : '');
    const [type, setType] = useState<ArticleType>('draft');

    const {setUserAbout, setUserImgStore, removeUserImgStore} = useActions();

    useEffect(() => {
        if (userData.login && !userImg.endsWith('.jpg')) {
            setUserImgStore(userData.login, userImg)
        }
    }, [userImg])

    async function handleEmail () {
        if (email) {
            const response = await axios.post('http://localhost:8888/user/verifyEmail', {
                email,
                login: userData.login
            })
            setMsg(response.data.msg)
        }
    }

    const saveUserAbout = () => {
        if (userData.login) {
            setUserAbout(userData.login, aboutUser)
        }
    }

    const removeUserImg = () => {
        if (userData.login) {
            setUserImg('')
            removeUserImgStore(userData.login)
        }
    }

    function handleUploadedFileImage (e: any) {
        if (!e.target.files.length) {
            return
        }
        const check = checkFileTypeAndSize(e, 'image');
        if (check) {
            encodeImageFileAsURL(e, setUserImg);
        }
    }

    return (
        <div className="container">
            <div className="profileTopBox">
                <div className="columnBoxes">
                    <div className="profileImageBox">
                        <img className="profileImage" src={
                            userImg.endsWith('.jpg') ? 
                                `http://localhost:8888/uploads/user_imgs/${userImg}` : userImg 
                            ? userImg : profileImage} 
                            alt="profileImage"
                        />
                        <div style={{display: 'flex', gap: 8}}>
                            <label className="profile-image-upload-button" htmlFor="file-upload">
                                <span className="text">Upload image</span>
                            </label>
                            <input type="file"
                                id="file-upload" 
                                style={{display: 'none'}} 
                                onChange={e => {handleUploadedFileImage(e)
                            }}/>
                            {
                                userData.profileImg ?
                                <button className="profile-image-remove-button" onClick={removeUserImg}>
                                    <span className="text">
                                        <img style={{width: 24, marginTop: 4}} src={trash} alt="remove"/>
                                    </span>
                                </button> : null
                            }
                        </div>
                    </div>
                    <AddArticleBox />
                </div>
                <div className="columnBoxes">
                    <div className="profileDescriptionBox">
                        <h3>{userData.login}</h3>
                        <p>Score points: <b>{userData.karma}</b></p>
                        {
                            userData.email ? 
                            <div>{userData.email}</div>
                            : <div style={{maxWidth: 500, margin: '24px 0'}}>
                                <h4 style={{margin: '0 0 0 24px'}}>Link your email</h4>
                                <p style={{color: 'red', margin: 0, marginLeft: 24}}>{msg}</p> 
                                <div style={{display: 'flex', alignItems: 'center',  margin: 16}}>
                                    <input type="email" className="auth-input"
                                        style={{margin: 0}}
                                        placeholder="type your email here"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <button 
                                        style={{
                                            margin: '0 0 0 1%', width: 'fit-content', 
                                            backgroundColor: 'var(--app-link-color1)',
                                            color: 'var(--app-color-theme)'
                                        }}
                                        className="auth-button"
                                        onClick={handleEmail}
                                    >
                                        send
                                    </button>
                                </div>
                            </div>
                        }
                        <div className="profileAboutBox">
                            <div style={{display: 'flex'}}>
                                <h4 style={{margin: '16px 0 16px 16px'}}>About</h4>
                                <button 
                                    style={{
                                        margin: 12, padding: '8px 12px', width: 'fit-content', 
                                        backgroundColor: 'var(--app-link-color1)',
                                        color: 'var(--app-color-theme)'
                                    }}
                                    className="auth-button"
                                    onClick={() => {
                                        if (aboutEditorMode) {
                                            setAboutUser(userData.status)
                                            setAboutEditorMode(false)
                                        } else {
                                            setAboutEditorMode(true)
                                        }
                                    }}
                                >{aboutEditorMode ? 'reset' : 'edit'}
                                </button>
                            </div>
                            <div>
                                <p style={{marginLeft: 24, marginTop: 0, wordBreak: 'break-all'}}>{aboutUser}</p>
                            </div>
                            {
                                aboutEditorMode ?
                                <div>
                                    <textarea
                                        className="auth-input" 
                                        style={{resize: 'none', minHeight: 150}}
                                        onChange={e => setAboutUser(e.target.value)}
                                        defaultValue={aboutUser}
                                    />
                                    <div style={{textAlign: 'end'}}>
                                        <button 
                                            style={{
                                                margin: 0, padding: '8px 12px', width: 'fit-content', 
                                                backgroundColor: 'var(--app-link-color1)',
                                                color: 'var(--app-color-theme)'
                                            }}
                                            className="auth-button"
                                            onClick={saveUserAbout}
                                        >
                                            save
                                        </button>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <div className="profile-content-box">
                        <h4 style={{margin: 0}}>Your posts</h4>
                        <div className="select-post-type-block">
                            <span onClick={() => {setType('draft')}} 
                                className={type === 'draft' ?
                                    "select-post-type-block__option select-post-type-block__option_selected"
                                    : "select-post-type-block__option"
                            }>Drafts
                            </span>
                            <span onClick={() => {setType('publish')}}
                                className={type === 'publish' ?
                                    "select-post-type-block__option select-post-type-block__option_selected"
                                    : "select-post-type-block__option"
                            }>Published
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}