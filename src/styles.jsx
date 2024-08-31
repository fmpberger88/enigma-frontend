import styled from '@emotion/styled'
import {Form} from "react-router-dom";

export const MainContainer = styled.main`
    background-color: #003f5c;
`

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    margin: 4rem auto;
    padding: 2rem;
    background-color: #003f5c;
    min-height: 20vh;
    border-radius: 10px;
    width: 100%;
    
    & h1 {
        color: white;
        font-size: 2.5rem;
        margin-top: 2rem;
    }
    
    & p {
        color: white;
        font-size: 1.25rem;
    }
    
    & input, & textarea, & select {
        width: 90%;
        padding: 0.5rem;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
    }
    
    & button {
        background-color: #8a508f;
        color: #003f5c;
        font-weight: bold;
        font-size: 1.25rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
    
    & button:hover {
        background-color: #bc5090;
        color: #003f5c;
    }
    
    @media screen and (max-width: 800px) {
        margin: 4rem auto;
        width: 90%;
        
        & input, & textarea, & select {
            width: 100%;
        }
    }
`

export const StyledButton = styled.button`
    background-color: #8a508f;
    color: #003f5c;
    font-weight: bold;
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`