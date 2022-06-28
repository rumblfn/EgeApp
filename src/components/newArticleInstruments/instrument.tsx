import { FC } from "react";
import { ArticleAction } from "../../types/article";
import styles from './instrument.module.scss'

interface InstrumentProps {
    handleNewAction: (obj: ArticleAction) => void,
    action: ArticleAction,
    awesomeClass: string
}

export const Instrument:FC<InstrumentProps> = ({handleNewAction, action, awesomeClass}) => {
    return (
        <button className={styles['instrument']}
            onClick={() => {
                handleNewAction(action)
            }}
        >
            <i className={`fa-solid ${awesomeClass}`}/>
        </button>
    )
}