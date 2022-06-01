import { FC, useState } from "react";
import { useActions } from "../../hooks/useActions";

interface Props {
    userStatus: string;
    login: string;
}

export const ProfileDescriptionAboutBox: FC<Props> = ({
    userStatus, login
}) => {
    const [aboutUser, setAboutUser] = useState<string>(userStatus);
    const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(false);

    const {setUserAbout} = useActions();

    const saveUserAbout = () => {
        if (login) {
            setUserAbout(login, aboutUser)
        }
    }

  return (
    <div className="profileAboutBox">
      <div style={{ display: "flex" }}>
        <h4 style={{ margin: "16px 0 16px 16px" }}>About</h4>
        <button
          style={{
            margin: 12,
            padding: "8px 12px",
            width: "fit-content",
            backgroundColor: "var(--app-link-color1)",
            color: "var(--app-color-theme)",
          }}
          className="auth-button"
          onClick={() => {
            if (aboutEditorMode) {
              setAboutUser(userStatus);
              setAboutEditorMode(false);
            } else {
              setAboutEditorMode(true);
            }
          }}
        >
          {aboutEditorMode ? "reset" : "edit"}
        </button>
      </div>
      <div>
        <p style={{ marginLeft: 24, marginTop: 0, wordBreak: "break-all" }}>
          {aboutUser}
        </p>
      </div>
      {aboutEditorMode ? (
        <div>
          <textarea
            className="auth-input"
            style={{ resize: "none", minHeight: 150 }}
            onChange={(e) => setAboutUser(e.target.value)}
            defaultValue={aboutUser}
          />
          <div style={{ textAlign: "end" }}>
            <button
              style={{
                margin: 0,
                padding: "8px 12px",
                width: "fit-content",
                backgroundColor: "var(--app-link-color1)",
                color: "var(--app-color-theme)",
              }}
              className="auth-button"
              onClick={saveUserAbout}
            >
              save
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
