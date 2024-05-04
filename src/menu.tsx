import { Link } from "react-router-dom";
import "./menu.css";

const buttons: React.FC = () => {
  return (
    <div className="menuSpecifics">
      <h1>
        <strong>
          Welcome! What would you like to known about Rick and Morty?
        </strong>
      </h1>
      <h3>-Developed by Eduardo Henrique Stahnke</h3>
      <div className="buttonsBlock">
        <div className="buttons">
          <button id="charactersButton">
            <Link to="/app">
              <strong>Characters</strong>
            </Link>
          </button>
          <button id="locationsButton">
            <Link to="/locations">
              <strong>Locations</strong>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default buttons;
