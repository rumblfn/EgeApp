import { FC, useContext } from "react";
import ArticleActionsContext from "../../routes/newArticle/context";
import { ArticleAction, ArticleActionTypes } from "../../types/article";
import ActionSwitcher from "./actionSwitcher";
import NoteActionsContextHandlers from "./context";

interface Props {
    index: number;
    action: ArticleAction;
    actions: ArticleAction[];
}

export const ArticleActionComponent:FC<Props> = ({action, index, actions}) => {

    const contextStore = useContext(ArticleActionsContext)
    if (!contextStore?.setActions) {
        return null
    }
    const {setActions} = contextStore

    const removeAction = () => {
        setActions([
            ...actions.slice(0, index),
            ...actions.slice(index + 1, actions.length),
        ])
    }

    const handleText = (text: string) => {
        const currentAction = actions[index]
        currentAction.content = text;

        if (currentAction.type !== ArticleActionTypes.IMAGE 
            && currentAction.type !== ArticleActionTypes.CODE_TEXT
        ) {
            const tags: string[] = []
            currentAction.content.split(' ').forEach((sub: string) => {
                const idx = sub.indexOf('#')
                if (idx !== -1 && sub.length - 1 > idx) {
                    tags.push(sub.slice(idx))
                }
            })

            currentAction.tags = [...tags]
        }

        setActions([
            ...actions.slice(0, index),
            currentAction,
            ...actions.slice(index + 1, actions.length),
        ])
    }

    const handleLang = (text: string) => {
        const currentAction = actions[index]
        if (currentAction.type === ArticleActionTypes.CODE_TEXT) {
            currentAction.language = text;
        }

        setActions([
            ...actions.slice(0, index),
            currentAction,
            ...actions.slice(index + 1, actions.length),
        ])
    }

    return (
        <NoteActionsContextHandlers.Provider value={{
            removeAction, handleText, handleLang
        }}>
            <ActionSwitcher action={action} />
        </NoteActionsContextHandlers.Provider>
    )
}