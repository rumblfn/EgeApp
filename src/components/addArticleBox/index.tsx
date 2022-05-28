import { FC } from "react"
import { Link } from "react-router-dom"

export const AddArticleBox:FC = () => {
    return (
        <Link to="/new" style={{
            backgroundColor: 'var(--app-color-theme)',
            padding: 12, borderRadius: 12, height: 'fit-content'
        }}>
            <p style={{fontSize: 22}} className="header-link link-with-hover link-with-hover0">
                Become an author
            </p>
        </Link>
    )
}