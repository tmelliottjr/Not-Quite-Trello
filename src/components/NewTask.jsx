import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from './Modal';
import TaskEdit from './TaskEdit';
import AddNewButton from './NewTaskButton';

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default class NewTask extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.state = { showModal: false };
  }

  handleNewTask() {
    this.toggleModal();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <Container>
        <AddNewButton onClick={this.handleNewTask} />
        <Modal show={this.state.showModal} handleClose={this.toggleModal}>
          <TaskEdit column={this.props.column} handleClose={this.toggleModal} />
        </Modal>
      </Container>
    );
  }
}

NewTask.propTypes = {
  column: PropTypes.object,
}