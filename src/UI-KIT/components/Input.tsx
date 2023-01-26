import React from "react";

import styled from "@emotion/styled";

type InputProps = {
  placeholder?: string;
  defaultValue?: any;
  onChange: any;
  onBlur: any;
  name: string;
};

const InputStyle = styled.input`
  background-color: ${(props) => props.theme.colors.primary.grey};
  border-radius: ${(props) => props.theme.radius.small};
  border: solid 2px ${(props) => props.theme.colors.primary.lightBlue};
  padding: 0.3rem 0.7rem;
`;

const Input = (props: InputProps): JSX.Element => {
  return (
    <InputStyle
      onChange={props.onChange}
      onBlur={props.onBlur}
      name={props.name}
      placeholder={props.placeholder || ""}
      defaultValue={props.defaultValue || ""}
    ></InputStyle>
  );
};

export default Input;
