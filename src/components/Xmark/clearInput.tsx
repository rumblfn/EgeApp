import { FC } from "react";
import styles from './style.module.scss'

interface ClearInputProps {
    setValue: (value: string) => void;
}

export const ClearInput: FC<ClearInputProps> = ({setValue}) => {
  return (
    <span
      onClick={() => {
        setValue("");
      }}
    >
      <i
        className={`fa-solid fa-delete-left 
                ${styles["data-list-input-clear"]}`}
      />
    </span>
  );
};
