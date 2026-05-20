import type React from "react";

type ErrorMessagePropsType = {
  error: string;
  info: string | null;
};

export const ErrorMessage: React.FC<ErrorMessagePropsType> = ({ error, info }) => {
  return (
    <div className="card">
      <h4>Error</h4>
      <div className="error">
        <div>{error}</div>
        {info !== null && (
          <>
            <br />
            <div>{info}</div>
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
