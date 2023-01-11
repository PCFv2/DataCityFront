import React from "react";
import styled from '@emotion/styled';
import { useState } from "react";


const StylePrim1 = styled.button`
    display: inline-block;
    width: 150px;
    height: 55.05px;
    left: 33px;
    top: 12px;

    background: #053C5E;
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
    color: #FFFFFF;
    cursor: pointer;
    border : none;

    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
        background-color: #064874
    }
    &:disabled {
        cursor: pointer;
        opacity: 0.7;
    }
`

const StylePrim2 = styled.button`
    display: inline-block;
    width: 150px;
    height: 55.05px;
    left: 33px;
    top: 12px;

    border: 1px solid #053C5E;
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
    color: #053C5E;
    cursor: pointer;

    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
        color: #FFFFFF;
        background-color: #075688
    }
    &:disabled {
        cursor: pointer;
        opacity: 0.7;
    }
`

const StyleSecon = styled.button`
    display: inline-block;
    width: 150px;
    height: 55.05px;
    left: 33px;
    top: 12px;

    background: #BFDBF7;
    border: 1px solid #053C5E;
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
    color: #053C5E;
    cursor: pointer;

    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
        background: #BFDBF7;
        border: 1px solid #053C5E;
        border-radius: 8px;
    }
    &:disabled {
        cursor: pointer;
        opacity: 0.7;
    }
`

export const Primary = () => {
    return <StylePrim1>Button</StylePrim1>
}

export const PrimaryOutlined = () => {
    return <StylePrim2>Button</StylePrim2>
}

export const Secondary = () => {
    return <StyleSecon>Button</StyleSecon>
}