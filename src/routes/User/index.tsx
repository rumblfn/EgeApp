import { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { UserUserState } from '../../types/user';
import { AddArticleBox } from "../../components/addArticleBox";
import { ArticleType } from "../../types/article";
import { ProfileImageBox } from "./profileImageBox";
import { ProfileDescriptionBox } from "./profileDescriptionBox";
import { SetPostsType } from "./setShowingPostsType";
import { PostsBox } from "./profilePostsBox";
import './style.css';

export const UserPage:FC = () => {
    const userData = useTypedSelector<UserUserState>(state => state.user.user);
    const [type, setType] = useState<ArticleType>('draft');

    const login = userData.login ? userData.login : '';
    const karma = userData.karma ? userData.karma : '';
    const emailProfile = userData.email ? userData.email : '';
    const profileImg = userData.profileImg ? userData.profileImg : '';

    return (
        <div className="container">
            <div className="profileMainBox">
                <div className="columnBoxes">
                    <ProfileImageBox 
                        login={login}
                        profileImg={profileImg}
                    />
                    <AddArticleBox />
                </div>
                <div className="columnBoxes">
                    <ProfileDescriptionBox 
                        login={login}
                        karma={karma}
                        emailProfile={emailProfile}
                        status={userData.status}
                    />
                    <SetPostsType 
                        type={type}
                        setType={setType}
                    />
                    <PostsBox 
                        type={type} 
                        login={login}
                    />
                </div>
            </div>
        </div>
    )
}