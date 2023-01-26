import React from "react";

import styled from "@emotion/styled";
import {css, Theme, useTheme} from "@emotion/react";
import {theme} from "../../theme";

type ButtonProps = {
    content: string;
    onClick?: () => void;
    type?: 'submit';
}

const defaultButtonStyle = css`
  padding: 1.2rem 3.5rem;
  font-family: ${theme.font.family.text}, "Roboto", "Helvetica", sans-serif;
  font-weight: bold;
  background-color: ${theme.colors.primary.blue};
  border-radius: ${theme.radius.small};
  color: ${theme.colors.primary.white};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out , transform 0.2s, color 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`

const PrimaryButtonStyle = styled.button`
  ${defaultButtonStyle};

  &:active {
    background-color: ${(props) => props.theme.colors.primary.blue_pressed};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.blue_hover};
  }
`

const SecondaryButtonStyle = styled.button`
  ${defaultButtonStyle};
  background-color: ${(props) => props.theme.colors.primary.white};
  color: ${(props) => props.theme.colors.primary.blue};
  border: 2px ${(props) => props.theme.colors.primary.blue} solid;

  &:active {
    color: ${(props) => props.theme.colors.primary.white};
    background-color: ${(props) => props.theme.colors.primary.blue};
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary.white};
    background-color: ${(props) => props.theme.colors.primary.blue_hover};
  }
`

const Primary2ButtonStyle = styled.button`
  ${defaultButtonStyle};
  background-color: ${(props) => props.theme.colors.primary.lightBlue};
  border: ${(props) => props.theme.border.regular} ${(props) => props.theme.colors.primary.blue};
  color: ${(props) => props.theme.colors.primary.blue};
  &:active {
    background-color: ${(props) => props.theme.colors.primary.lightBlue_pressed};
  }
`

export const PrimaryButton = React.memo((props: ButtonProps) => {
    return (
        <PrimaryButtonStyle onClick={props.onClick} type={props.type}>{props.content}</PrimaryButtonStyle>
    )
});

export const SecondaryButton = React.memo((props: ButtonProps) => {
    return (
        <SecondaryButtonStyle onClick={props.onClick} type={props.type}>{props.content}</SecondaryButtonStyle>
    )
});

export const Primary2Button = React.memo((props: ButtonProps) => {
    return (
        <Primary2ButtonStyle onClick={props.onClick} type={props.type}>{props.content}</Primary2ButtonStyle>
    )
});

PrimaryButton.displayName = 'PrimaryButton';
SecondaryButton.displayName = 'SecondaryButton';
Primary2Button.displayName = 'Primary2Button';