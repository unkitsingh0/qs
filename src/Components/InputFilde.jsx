import React from "react";

const InputFilde = ({
  css = "m-3",
  title,
  type = "text",
  buttomMessage,
  change,
  name,
}) => {
  return (
    <div className={css}>
      <label htmlFor={title} className="form-label">
        {title}
      </label>
      <input
        type={type}
        className="form-control"
        id={title + name}
        aria-describedby={`${title}help`}
        onChange={change}
        name={name}
      />
      {buttomMessage ? (
        <div id="emailHelp" className="form-text">
          {buttomMessage}
        </div>
      ) : null}
    </div>
  );
};

export default InputFilde;
