import { FC } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface SyntaxCodeProps {
    setValue: (value: boolean) => void;
    content: string;
    value: string;
}

export const SyntaxCode:FC<SyntaxCodeProps> = ({
    setValue, content, value 
}) => {
    return (
        <div
          onClick={() => {
            setValue(true);
          }}
        >
          <SyntaxHighlighter language={value} style={docco}>
            {content ? content : "Click here to change"}
          </SyntaxHighlighter>
        </div>
    )
}