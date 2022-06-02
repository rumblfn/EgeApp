import { FC, useState } from "react";
import profileDefault from "../../images/plug.png"
import trash from "../../images/trash.png"
import encodeImageFileAsURL from "../../components/static/encodeImageFileAsURL";
import { checkFileTypeAndSize } from "../../components/static/checkFileTypeAndSize";
import { useActions } from "../../hooks/useActions";

interface ProfileImageBoxProps {
    profileImg: string;
    login: string;
}

export const ProfileImageBox:FC<ProfileImageBoxProps> = ({
    profileImg, login
}) => {
    const [userImg, setUserImg] = useState<string>(profileImg);
    const {setUserImgStore, removeUserImgStore} = useActions();

    const removeUserImg = () => {
        if (login) {
            setUserImg('')
            removeUserImgStore(login)
        }
    }

    function handleUploadedFileImage (e: any) {
        if (!e.target.files.length) {
            return false;
        }
        const check = checkFileTypeAndSize(e, 'image');
        if (check) {
            encodeImageFileAsURL(e, setUserImgStore, login, setUserImg);
            return true;
        }
        return false;
    }

    return (
        <div className="profileImageBox">
            <img className="profileImage" src={
                userImg.endsWith('.jpg') ? 
                    `http://localhost:8888/uploads/user_imgs/${userImg}` : userImg 
                        ? userImg : profileDefault} 
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
            {profileImg ?
                <button className="profile-image-remove-button" onClick={removeUserImg}>
                    <span className="text">
                        <img style={{width: 24, marginTop: 4}} src={trash} alt="remove"/>
                    </span>
                </button> 
            : null}
            </div>
        </div>
    )
}