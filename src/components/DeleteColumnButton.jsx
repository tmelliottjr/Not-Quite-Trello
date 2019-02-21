import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  text-align: center;
  background: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;

  rect,
  path {
    fill: #b9b9b1;
    transition: fill 0.25s ease;
  }

  :hover {
    opacity: 1;
    rect,
    path {
      fill: #ff8d8d;
    }
  }

  :active {
    rect,
    path {
      fill: #ff5050;
    }
  }
`;

export const DeleteColumnButton = props => {
  return (
    <Button {...props}>
      <i className="far fa-trash-alt" />
    </Button>
  );
};
