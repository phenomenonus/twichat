import type React from "react";

type NoConnectionPropsType = {
  message: string | null;
};

export const NoConnection: React.FC<NoConnectionPropsType> = ({ message }) => {
  return (
    <div className="card">
      <div>No connection</div>
      {message !== null && <div>{message}</div>}
    </div>
  );
};
