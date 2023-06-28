import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Page not found :(</h2>
            <p>Go to homepage</p>
            <Link to='/'>Home</Link>
        </div>
     );
}
 
export default NotFound;