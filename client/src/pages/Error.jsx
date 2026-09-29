import { NavLink} from "react-router-dom";
export const Error=() =>{
    return(
    <>
    <section id="error-page">
        <div className="error-context">
          <h2 className="header">404</h2>
          <br/>
          <p>OOPS! PAGE NOT FOUND</p>
          <br/>
          <p>Sorry the page you are looking for doesn't exist.If you think something
            is broken report a problem.We could not complete your request. 
            Please try again or go back to the homepage.
          </p>
        </div>
        <div className="error-button">
            <NavLink to="/">Return Home</NavLink>
            <NavLink to="/">Report Problem</NavLink>
        </div>
        </section>
    </>
    );
};