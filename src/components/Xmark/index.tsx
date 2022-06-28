import { FC } from "react";
import styles from '../ArticleAction/style.module.scss'

interface XmarkProps {
    removeAction: () => void;
}

export const Xmark:FC<XmarkProps> = ({removeAction}) => {
    return (
        <span onClick={removeAction} style={{position: 'absolute', left: -26}}
            className={styles["action-box-rm"]}
        >
            <i className="fa-solid fa-xmark" />
        </span>
    )
}