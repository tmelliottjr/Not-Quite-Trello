import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addColumn } from '../actions';

const Button = styled.button`
  -webkit-appearance: none;
  appearance: none;
  height: 30px;
  flex: 0 0 160px;
  margin: 10px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #1fd8b3;
  border: none;
  background-color: #2e333252;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.25s ease;
  fill: #1ab999;
  color: #1ab999;

  :hover {
    background-color: #353d42ad;
    color: #0ef5c7;
    fill: #0ef5c7;
  }

  :active {
    fill: #1ab999;
    color: #1ab999;
  }
`;

const Icon = styled.svg`
  height: 15px;
  width: 23px;
  enable-background: new 0 0 42 42;
`;

class NewColumnButton extends Component {
  constructor(props) {
    super(props);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }

  handleAddColumn(e) {
    if (this.props.addedColumn) {
      return;
    }
    this.props.addColumn();
  }

  render() {
    return (
      <Button
        onClick={this.handleAddColumn}
        ref={this.props.setNewColumnButtonRef}
      >
        <Icon>
          <g>
            <title>background</title>
            <rect
              fill="none"
              id="canvas_background"
              height="17"
              width="17"
              y="-1"
              x="-1"
            />
          </g>
          <g>
            <title>Layer 1</title>
            <path
              stroke="null"
              id="svg_1"
              d="m14.366742,9.060623l-5.306119,0l0,5.306119c0,0.172293 -0.139832,0.312125 -0.312125,0.312125l-2.496997,0c-0.172293,0 -0.312125,-0.139832 -0.312125,-0.312125l0,-5.306119l-5.306119,0c-0.172293,0 -0.312125,-0.139832 -0.312125,-0.312125l0,-2.496997c0,-0.172293 0.139832,-0.312125 0.312125,-0.312125l5.306119,0l0,-5.306119c0,-0.172293 0.139832,-0.312125 0.312125,-0.312125l2.496997,0c0.172293,0 0.312125,0.139832 0.312125,0.312125l0,5.306119l5.306119,0c0.172293,0 0.312125,0.139832 0.312125,0.312125l0,2.496997c0,0.172293 -0.139832,0.312125 -0.312125,0.312125z"
            />
          </g>
        </Icon>
        Add New Column
      </Button>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { addColumn },
)(NewColumnButton);
