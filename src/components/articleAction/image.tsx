import { FC, useState, useRef, useContext } from "react";
import { checkFileTypeAndSize } from "../static/checkFileTypeAndSize";
import encodeImageFileAsURL from "../static/encodeImageFileAsURL";
import { UploadFile } from "../UploadFile";
import { Xmark } from "../Xmark";
import NoteActionsContextHandlers from "./context";
import styles from './style.module.scss'

interface Props {
    content: string;
}

export const ImageArticle:FC<Props> = ({content}) => {
    const [imageData, setImageData] = useState<string>(content);
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
    
    const contextStore = useContext(NoteActionsContextHandlers)

    if (!contextStore?.handleText && !contextStore?.removeAction && !contextStore?.handleLang)
        return null

    const {handleText, removeAction} = contextStore

    const setImageDataFull = (data: string) => {
        setImageData(data)
        handleText(data)
    }

    return (
        <div className={styles["action-box"]} style={{marginTop: 16}}>
            {!imageData && <UploadFile handler={handleUploadedFileImage}/>}
            {imageData &&
                <img className={styles['img-action']} 
                    ref={imageUploadedRef} 
                    src={imageData} 
                    alt="картинка"
            />}
            <Xmark removeAction={removeAction} />
        </div>
    )
}