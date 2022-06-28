import { createContext } from "react";

interface ContextInterface {
    handleText: (text: string) => void;
    removeAction: () => void;
    handleLang: (text: string) => void;
}

const ArticleActionsContextHandlers = createContext<ContextInterface | null>(null)
export default ArticleActionsContextHandlers