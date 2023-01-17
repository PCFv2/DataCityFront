import React from "react";
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react'
import { useState } from "react";
/*const theme = {
    primary: {
        default: "#053C5E",
        borderDefault: "none",
        colorDefault: "#FFFFFF",
        hover: "#064874",
        hoverColor: "none",
        hoverBorder: "none"
    },

    primaryOutlined: {
        default: "none",
        borderDefault: "#053C5E",
        colorDefault: "#053C5E",
        hover: "#075688",
        hoverColor: "#FFFFFF",
        hoverBorder: "none",
    },

    secondary: {
        default: "#BFDBF7",
        borderDefault: "#053C5E",
        colorDefault: "#053C5E",
        hover: "#BFDBF7",
        hoverColor: "none",
        hoverBorder: "#053C5E"
    }
};


const Style = styled.button<{theme: string}>`
    display: inline-block;
    width: 150px;
    height: 55.05px;
    left: 33px;
    top: 12px;

    background-color: ${(props) => props.theme.default};
    border: 1px solid ${(props) => props.theme.borderDefault};
    border-radius: 8px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${(props) => props.theme.colorDefault};
    cursor: pointer;
    border : none;

    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
        background-color: ${(props) => props.theme.hover};
        color: ${(props) => props.theme.hoverColor};
        border: 1px solid ${(props) => props.theme.hoverBorder};
    }
    &:disabled {
        cursor: pointer;
        opacity: 0.7;
    }
`

export const Primary = () => {
    return <Style theme="primary">Button</Style>
}

export const PrimaryOutlined = () => {
    return <Style theme="primaryOutlined">Button</Style>
}

export const Secondary = () => {
    return <Style theme="secondary">Button</Style>
}
*/