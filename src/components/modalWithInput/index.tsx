import { FC } from "react";
import { ArticleType } from "../../types/article";
import './style.css';

interface ModalWithInputProps {
    setActive: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    type: ArticleType;
    setTitle: (value: string) => void;
}

export const ModalWithInput:FC<ModalWithInputProps> = ({setActive, setSubmitted, type, setTitle}) => {
    return (
        <div className='modal' onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div>
                    <h4 style={{margin: 0}}>Title for article</h4>
                    <input type="text" className="auth-input" 
                        style={{marginTop: 10}}
                        placeholder="type title"
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="modal__submit">
                    <button onClick={() => {
                        setActive(false);
                        setSubmitted(true);
                    }} 
                        className="profile-image-upload-button article-publish-button">
                        <span className="text">{type === 'draft' ? 'To drafts' : 'Publish'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}