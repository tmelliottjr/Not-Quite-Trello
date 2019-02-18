import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  text-align: center;
  background: none;
  outline: none;
  cursor: pointer;

  rect,
  path {
    fill: #ff8d8d;
  }
`;

export const DeleteButton = props => {
  return (
    <Button {...props}>
      <i class="far fa-trash-alt" />
    </Button>
  );
};
