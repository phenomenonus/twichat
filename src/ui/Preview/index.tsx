import type React from "react";

export const Preview: React.FC = () => {
  return (
    <div className="card">
      <h4>Twichat</h4>
      <p>
        Display chat messages from a channel with customizable appearance, update intervals, animations, and optional
        special icons.
      </p>
      <h4>Quick start</h4>
      <p>
        Paste this into the address bar:
        <br />
        <a href="#">https://phenomenonus.github.io/twichat?channel=mychannel</a>
        <br />
        <b>mychannel</b> is your channel name
      </p>
      <p>
        To learn more see <a href="https://github.com/phenomenonus/twichat">twichat</a>
      </p>
    </div>
  );
};
