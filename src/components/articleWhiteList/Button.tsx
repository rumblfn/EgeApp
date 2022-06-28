import { FC } from "react";
import styles from './Button.module.scss'

interface ButtonProps {
    handler?: (value: boolean) => void;
    valueToSet?: boolean;
    text?: string;
    variant?: string;
    ml?: string;
    click?: () => void;
    upload?: boolean;
}

export const Button:FC<ButtonProps> = ({
    handler, valueToSet = true, text = 'Next', variant = 'default', ml = '0px', click
}) => {
    return (
        <button style={{marginLeft: ml}}
            className={`${styles.button} ${styles[variant]}`} 
            onClick={() => {
                if (typeof handler === 'function') {
                    handler(valueToSet)
                }
                if (click) {
                    click()
                }
            }}
        >
            <span>{text}</span>
        </button>
    )
}