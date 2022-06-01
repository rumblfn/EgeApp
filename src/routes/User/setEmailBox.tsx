import { FC, useState } from "react";
import axios from "axios";

interface EmailBoxProps {
    login: string;
}

export const EmailBox:FC<EmailBoxProps> = ({login}) => {
    const [email, setEmail] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    async function handleEmail () {
        if (email) {
            const response = await axios.post('http://localhost:8888/user/verifyEmail', {
                email,
                login
            })
            setMsg(response.data.msg)
        }
    }

    return (
        <div style={{ maxWidth: 500, margin: "24px 0" }}>
          <h4 style={{ margin: "0 0 0 24px" }}>Link your email</h4>
          <p style={{ color: "red", margin: 0, marginLeft: 24 }}>{msg}</p>
          <div style={{ display: "flex", alignItems: "center", margin: 16 }}>
            <input
              type="email"
              className="auth-input"
              style={{ margin: 0 }}
              placeholder="type your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              style={{
                margin: "0 0 0 1%",
                width: "fit-content",
                backgroundColor: "var(--app-link-color1)",
                color: "var(--app-color-theme)",
              }}
              className="auth-button"
              onClick={handleEmail}
            >
              send
            </button>
          </div>
        </div>
    )
}