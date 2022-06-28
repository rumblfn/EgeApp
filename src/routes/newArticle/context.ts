import { createContext } from "react";
import { ArticleAction } from "../../types/article";

interface ContextInterface {
    actions: ArticleAction[];
    setActions: (newState: ArticleAction[] | 
        ((prevState: ArticleAction[]) 
            => ArticleAction[])) 
    => void;
    publishArticle: (value: boolean) => void;
    saveArticle: (value: boolean) => void;
}

const ArticleActionsContext = createContext<ContextInterface | null>(null)
export default ArticleActionsContext
