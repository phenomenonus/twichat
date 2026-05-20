import type React from "react";

type NoConnectionPropsType = {
  info: string | null;
};

export const NoConnection: React.FC<NoConnectionPropsType> = ({ info }) => {
  return (
    <div className="card">
      <h4>No connection</h4>
      {info !== null && <div>{info}</div>}
    </div>
  );
};
