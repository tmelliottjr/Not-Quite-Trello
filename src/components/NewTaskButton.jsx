import React from 'react';
import styled from 'styled-components';

// TODO: Breakout base button style
const Button = styled.button`
  -webkit-appearance: none;
  padding: 0;
  appearance: none;
  height: 50px;
  width: 50px;
  font-size: 36px;
  border: 2px solid #1fd8b3;
  background: none;
  outline: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.25s ease;

  :hover {
    background-color: #1fd8b330;
  }

  :hover polygon {
    fill: #0ef5c7;
  }

  :active polygon {
    fill: #1ab999;
  }
`;

const Icon = styled.svg`
  height: 30px;
  width: 30px;
  enable-background: new 0 0 42 42;
`;

export default function AddNewButton(props) {
  return (
    <Button {...props}>
      <Icon viewBox="0 0 42 42">
        <polygon
          points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 "
          fill="#0ef5c7"
        />
      </Icon>
    </Button>
  );
}
