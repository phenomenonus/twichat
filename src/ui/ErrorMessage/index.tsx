import type React from "react";

type ErrorMessagePropsType = {
  error: string;
  message: string | null;
};

export const ErrorMessage: React.FC<ErrorMessagePropsType> = ({ error, message }) => {
  return (
    <div className="card">
      <h4>Error</h4>
      <div className="error">
        <div>{error}</div>
        {message !== null && (
          <>
            <br />
            <div>{message}</div>
          </>
        )}
      </div>
      <hr />
      <div>
        <h4>Can't resolve issue?</h4>
        <p>
          Read <a href="https://github.com/phenomenonus/twichat">documentation</a>
        </p>
      </div>
    </div>
  );
};
