import React from 'react';
import styled from '@emotion/styled';
/*import { ReactComponent as Close } from "src/assets/close.svg";*/

const StyleError = styled.button` 
    box-sizing: border-box;

    display: inline-block;
    left: 0%;
    right: 0%;
    top: 34.43%;
    bottom: 0%;

    background: #F4F6F6;

    border: 1px solid #A31621;
    border-radius: 5px;

    display: inline-block;
    width: 305px;
    height: 40px;
    left: 21px;
    top: 5px;

    display: inline-block;
    left: 6.56%;
    right: 0%;
    top: 34.43%;
    bottom: 0%;

    font-family: 'Poppins';
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;

    color: #000000;
`

const StyleStandard = styled.button`
    
    display: inline-block;
    width: 305px;
    height: 40px;
    left: 21px;
    top: 5px;

    box-sizing: border-box;

    display: inline-block;
    left: 0%;
    right: 0%;
    top: 34.43%;
    bottom: 0%;

    background: #F4F6F6;

    border: 1px solid #053C5E;
    border-radius: 5px;
    
    display: inline-block;
    left: 6.56%;
    right: 0%;
    top: 34.43%;
    bottom: 0%;

    font-family: 'Poppins';
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;

    color: #000000;
`


export const InputError = () => {
    return <StyleError>placeholder</StyleError>
}

export const InputStandard = () => {
    return <StyleStandard>placeholder</StyleStandard>
}