import { FC } from "react";
import { ProfileDescriptionAboutBox } from "./profileDescAbout";
import { EmailBox } from "./setEmailBox";

interface ProfileDescriptionBoxProps {
    login: string;
    karma: string;
    status: string;
    emailProfile: string;
}

export const ProfileDescriptionBox: FC<ProfileDescriptionBoxProps> = ({
    login, karma, emailProfile, status
}) => {

  return (
    <div className="profileDescriptionBox">
      <h3>{login}</h3>
      <p>
        Score points: <b>{karma}</b>
      </p>
      {emailProfile ? (
        <div>{emailProfile}</div>
      ) : (
        <EmailBox login={login}/>
      )}
      <ProfileDescriptionAboutBox 
        userStatus={status}
        login={login}
      />
    </div>
  );
};
