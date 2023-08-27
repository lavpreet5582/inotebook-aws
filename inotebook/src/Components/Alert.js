import React from "react";

export const Alert = (props) => {
  // return (
  //   // <div>
  //   //   <div className="alert alert-primary" role="alert">
  //   //     {props.message}
  //   //   </div>
  //   // </div>

  // );
  const capitalizeFirstLetter = (string) => {
    if(string === "danger"){
      string = "error"
    }
    const lowerCase = string.toLowerCase();
    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
  };
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalizeFirstLetter(props.alert.type)}: </strong>
        {props.alert.msg}
      </div>
    )
  );
};
