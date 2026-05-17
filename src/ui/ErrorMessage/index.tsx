import type React from "react";

type ErrorMessagePropsType = {
  error: Error;
};

export const ErrorMessage: React.FC<ErrorMessagePropsType> = ({ error }) => {
  return (
    <div className="card">
      <div className="error">
        {error.name}
        <br />
        {error.message}
      </div>
      <hr />
      <p>
        Can't resolve issue? Read{" "}
        <b>
          <a href="https://github.com/phenomenonus/twichat">documentation</a>
        </b>
      </p>
    </div>
  );
};
