import React from "react";

const Category = (props: Configuration) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <span>{props.value1}</span>
      <span>{props.value2}</span>
      <span>{props.value3}</span>
      <span>{props.value4}</span>
    </div>
  );
};

export default Category;
