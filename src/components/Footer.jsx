import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  align-items: center;
  background-color: #000000c2;
  position: fixed;
  bottom: 0;

  & a {
    color: inherit;
    text-decoration: none;
    transition: color 0.25s ease;
  }

  & a:hover {
    color: #0ef5c7;
  }
`;

export default function Footer() {
  return (
    <Container>
      <a href="https://github.com/tmelliottjr/Not-Quite-Trello">
        <i className="fab fa-github" />
      </a>
      <a href="https://tomelliott.io">Tom Elliott</a>
    </Container>
  );
}
