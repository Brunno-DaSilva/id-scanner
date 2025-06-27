import "./notFound.css";
export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="error-code">
        <span className="digit">4</span>
        <span className="digit">0</span>
        <span className="digit">4</span>
      </div>
      <div className="message">
        Oops! The page you're looking for doesn't exist.
      </div>
      <a href="/" className="home-link">
        Go back home
      </a>
    </div>
  );
};
