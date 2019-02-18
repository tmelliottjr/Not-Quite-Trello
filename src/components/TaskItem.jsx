import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import editButton from '../edit.svg';
import TaskEdit from './TaskEdit';
import Modal from './Modal';

const Container = styled.div`
  white-space: pre-line;
  width: 220px;
  min-height: 20px;
  border-radius: 2px;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const EditButton = styled.img`
  height: 10px;
  position: absolute;
  padding: 5px;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.25s ease, background-color 0.25s ease;
  cursor: pointer;
  :hover {
    opacity: 1;
    background-color: #eaeaea;
    border-radius: 2px;
  }
`;

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = { showModal: false };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleEditTask() {
    this.toggleModal();
  }

  render() {
    return (
      <>
        <Modal show={this.state.showModal} handleClose={this.toggleModal}>
          <TaskEdit
            task={this.props.task}
            column={this.props.column}
            handleClose={this.toggleModal}
          />
        </Modal>
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              {this.props.task.content}
              <EditButton
                src={editButton}
                alt=""
                onClick={this.handleEditTask}
              />
            </Container>
          )}
        </Draggable>
      </>
    );
  }
}
