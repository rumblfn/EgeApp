import { FC, useRef } from "react";

interface UploadFileProps {
    handler: (e: any) => void;
}

export const UploadFile:FC<UploadFileProps> = ({handler}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (<div style={{cursor: 'pointer'}}>
        <label htmlFor="file-upload">
            <span>Select image</span>
        </label>
        <input ref={inputRef}
            id="file-upload" type="file" 
            style={{display: 'none'}}
            onChange={e => {handler(e)}}
        />
    </div>)
}