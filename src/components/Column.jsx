import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';

import NewTask from './NewTask';
import TaskItem from './TaskItem';
import ColumnTitle from './ColumnTitle';
import { saveTask, deleteTask, createTask, deleteColumn } from '../actions';

const Container = styled.div`
  flex-direction: column;
  width: 256px;
  margin: 10px;
  border-radius: 2px;
  background-color: #353d42ad;
`;

const TaskList = styled.div`
  min-height: 100px;
  padding: 8px;
  overflow-y: scroll;
  flex-grow: 1;
  max-height: 400px;
  /* Compensate for 5px scrollbar style */
  padding-left: 13px;
`;

class Column extends Component {
  componentDidMount() {
    //TODO: Talk to someone about how this is handled. Is there a better way to access the DOM node from a parent?
    // What about checking that the component is new for the first time.

    // If this column is newly added, scroll to keep the newColumnButton in the viewport
    if (this.props.column.id === this.props.addedColumn) {
      if (this.props.newColumnButtonRef !== undefined) {
        this.props.newColumnButtonRef.scrollIntoView();
      }
    }
  }

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <button
              onClick={() => this.props.deleteColumn(this.props.column.id)}
            />
            <ColumnTitle
              column={this.props.column}
              newColumnButtonRef={this.props.newColumnButtonRef}
            />
            <Droppable droppableId={this.props.column.id}>
              {provided => (
                <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                  {this.props.taskList.map((task, index) => {
                    return (
                      <TaskItem
                        key={task.id}
                        index={index}
                        task={task}
                        column={this.props.column}
                      />
                    );
                  })}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
            <NewTask column={this.props.column} />
          </Container>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { saveTask, deleteTask, createTask, deleteColumn },
)(Column);
