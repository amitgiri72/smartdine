import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../Spinner/Spinner";

import { mapExpressionToEmoji } from "../../helpers/emojis";

import "./Results.css";

const Results = ({ results, processing }) => {
  if (processing && results) {
    return <Spinner />;
  }
  if (!processing && results && results.length > 0) {
    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
            <div className="results__wrapper">
              <div style={{ width: "300px" }}>
                <p className="results__wrapper__para">
                  More than One Face Detected ! Please Ensure Only One face in
                  Frame
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="results__wrapper">
            <div>
              <p>I think...</p>

              {results[0].expressions.asSortedArray()[0].expression ===
                "happy" && <p>You liked our food </p>}
              {results[0].expressions.asSortedArray()[0].expression ===
                "neutral" && <p>You think our food is Average</p>}
              {results[0].expressions.asSortedArray()[0].expression ===
                "sad" && <p>You didn't liked our food</p>}
            </div>
            <div className="results__emoji">
              <FontAwesomeIcon
                icon={mapExpressionToEmoji(
                  results[0].expressions.asSortedArray()[0].expression
                )}
                size="8x"
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="results">
        <Spinner />
      </div>
    );
  }
};

export default Results;
