import { FC } from "react";
import styles from './style.module.scss'

interface ListOfTagsProps {
    tags: string[]
    setTags: (newState: string[] | 
        ((prevState: string[]) 
            => string[])) 
    => void
}

export const ListOfTags:FC<ListOfTagsProps> = ({tags, setTags}) => {

    const removeTag = (index: number) => {
        setTags([
            ...tags.slice(0, index),
            ...tags.slice(index + 1, tags.length),
        ])
    }

    return (
        <div className={styles.box}>
            {tags.map((tag, index) => 
                <span onClick={() => {removeTag(index)}} className={styles.tag}>
                    {tag}
                </span>
            )}
        </div>
    )
}