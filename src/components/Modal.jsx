import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Backdrop = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1dc7;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const ModalContainer = styled.div`
  width: 300px;
  background-color: ${props => props.backgroundColor};
`;

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.modalRef = React.createRef();
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  handleClose(e) {
    // Prevent modal close unless backdrop is clicked
    if (this.modalRef.current.contains(e.target)) {
      return;
    }
    this.props.handleClose();
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return ReactDOM.createPortal(
      <Backdrop onClick={this.handleClose}>
        <ModalContainer ref={this.modalRef}>
          {this.props.children}
        </ModalContainer>
      </Backdrop>,
      this.el,
    );
  }
}
