import React from "react";
import Login from "./Login";
import SearchPage from "./SearchPage";
import "../styles/Home.css";

/**
 * Site's landing page.
 */
function LandingPage(props) {
  return (
    <div className="lander">
      <div className="landerMessage">
        <div>
          <h1>INF NIM Finder</h1>
          <p>Yet another NIM Finder</p>
        </div>
      </div>
      <Login isLoggedIn={props.isLoggedIn} onLogin={props.onLogin} />
    </div>
  );
}

/**
 * Site's home page
 * @param {Props} props React props
 */
export default function Home(props) {
  return (
    <div className="Home">
      {props.isLoggedIn ? (
        <SearchPage
          isLoggedIn={props.isLoggedIn}
          token={props.token}
          onLogin={props.onLogin}
        />
      ) : (
        <LandingPage isLoggedIn={props.isLoggedIn} onLogin={props.onLogin} />
      )}
    </div>
  );
}
