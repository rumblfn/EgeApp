import { FC, useState, useRef } from "react";
import { checkFileTypeAndSize } from "../static/checkFileTypeAndSize";
import encodeImageFileAsURL from "../static/encodeImageFileAsURL";

interface QuoteArticleProps {
    removeAction: () => void;
    content: string;
    handleText: (value: string) => void;
}

export const ImageArticle:FC<QuoteArticleProps> = ({
    removeAction, content, handleText
}) => {
    const [imageData, setImageData] = useState<string | boolean>(content);
    const imageUploadedRef = useRef(null);

    const handleUploadedFileImage = (e: any) => {
        if (!e.target.files.length) {
            return
        }
        const check = checkFileTypeAndSize(e, 'image');
        if (check) {
            encodeImageFileAsURL(e, setImageDataFull);
        }
    }

    const setImageDataFull = (data: string) => {
        setImageData(data)
        handleText(data)
    }

    return (
        <div className="action-box" style={{marginTop: 16}}>
            {
                !imageData ? 
                <>
                    <label htmlFor="file-upload" style={{display: 'flex', alignItems: 'center', gap: 16}}>
                        <span className="text">Select image</span>
                        <button className="profile-image-upload-button" style={{width: 'fit-content', borderRadius: 4}}>
                            <label htmlFor="file-upload" style={{borderRadius: 2}} className="text">Upload</label>
                        </button>
                    </label>
                    <input id="file-upload" type="file" className="file-uploader"
                        onChange={e => {handleUploadedFileImage(e)}}/>
                </> : null
            }
            {imageData ? 
                <div className='image-player-container'>
                    <img ref={imageUploadedRef} 
                        style={{maxWidth: '100%', maxHeight: '60vh', borderRadius: 8}}
                        className='player-container__content ' 
                        src={typeof imageData === 'boolean' ? '' : imageData} alt="картинка"
                    />
                </div>
            : null}
            <i className="fa-solid fa-xmark action-box-rm"
                style={{backgroundColor: 'white', mixBlendMode: 'hard-light'}}
                onClick={removeAction}
            />
        </div>
    )
}