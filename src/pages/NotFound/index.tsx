import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div>
            <p>Page not found!</p>
            <p>Go to <Link to='/'>Homepage</Link></p>
        </div>
    )
}