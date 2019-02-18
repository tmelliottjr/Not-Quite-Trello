import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import anime from 'animejs';

import { saveTask, deleteTask, createTask } from '../actions';

const TaskEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
`;

const TextArea = styled.textarea`
  border: none;
  height: 100px;
  resize: none;
  border-radius: 2px;
  font-size: 16px;
  padding: 10px;
  outline: none;
`;

const TaskEditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  height: 30px;
  width: 60px;
  border: none;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.25s ease;
`;

const PrimaryButton = styled(Button)`
  color: #1fd8b3;
  background: none;
  border: 1px solid #1fd8b3;
  margin-right: 5px;
  :hover {
    color: #0ef5c7;
    background-color: #1fd8b330;
  }
  :active {
    color: #1ab999;
  }
`;

const DeleteButton = styled(Button)`
  background: none;
  border: 1px solid #ff6464;
  color: #ff6464;
  :hover {
    color: #ff7a7a;
    background-color: #ff646430;
  }
  :active {
    color: #f3b6a8;
  }
`;

class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.state = {
      taskContent: this.props.task ? this.props.task.content : null,
      newTask: !this.props.task,
    }; // if no task provided we are creating a new task

    this.contentRef = React.createRef();
  }

  handleSaveTask(e) {
    if (!this.state.taskContent) {
      return this.doShake();
    }
    if (this.state.newTask) {
      this.props.createTask(this.props.column.id, this.state.taskContent);
    } else {
      this.props.saveTask({
        ...this.props.task,
        content: this.state.taskContent,
      });
    }

    this.props.handleClose();
  }

  handleEditTask(e) {
    this.setState({ taskContent: e.target.value });
  }

  doShake() {
    const xMax = 10;
    anime({
      targets: this.contentRef.current,
      translateX: [
        {
          value: xMax * -1,
        },
        {
          value: xMax,
        },
        {
          value: xMax / -2,
        },
        {
          value: xMax / 2,
        },
        {
          value: 0,
        },
      ],
      duration: 400,
      easing: 'easeInOutSine',
    });
  }

  handleDeleteTask() {
    if (this.state.newTask) {
      return this.props.handleClose();
    }
    this.props.deleteTask(this.props.task.id, this.props.column.id);
    this.props.handleClose();
  }

  render() {
    return (
      <TaskEditContainer>
        <TextArea
          defaultValue={this.state.taskContent}
          onChange={this.handleEditTask}
          autoFocus={true}
          ref={this.contentRef}
        />
        <TaskEditButtonContainer>
          <PrimaryButton onClick={this.handleSaveTask}>Save</PrimaryButton>
          <DeleteButton onClick={this.handleDeleteTask}>Delete</DeleteButton>
        </TaskEditButtonContainer>
        )
      </TaskEditContainer>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { saveTask, deleteTask, createTask },
)(TaskEdit);
