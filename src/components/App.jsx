import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled, { createGlobalStyle } from 'styled-components';

import { moveTask, addColumn, moveColumn } from '../actions';
import Column from './Column';
import Footer from './Footer';
import NewColumnButton from './NewColumnButton';

const GlobalStyle = createGlobalStyle`
html {
  font-family: 'Source Sans Pro', sans-serif;
  color: #333;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
  background: url('https://res.cloudinary.com/duz6ncq1v/image/upload/q_auto/v1551044466/serenity.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
}

#root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

textarea{
  font-family: inherit;
}

*{
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-corner{
    background: rgba(0,0,0,0)
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* firefox */
  scrollbar-color: dark;
  scrollbar-width: none;
}
`;

const Container = styled.div`
  height: calc(100% - 50px);
  display: flex;
  align-items: flex-start;
  overflow-y: scroll;
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.setNewColumnButtonRef = this.setNewColumnButtonRef.bind(this);
  }

  setNewColumnButtonRef(ref) {
    this.newColumnButtonRef = ref;
  }

  onDragEnd = result => {
    const { destination, source } = result;

    // If the draggable element wasn't placed on a droppable element, don't do anything
    if (!destination) {
      return;
    }

    // If the source and destination are the same, don't do anything
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (result.type === 'column') {
      this.props.moveColumn(result);
    } else {
      this.props.moveTask(result);
    }
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {provided => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.columnOrder.map((columnId, index) => {
                  const column = this.props.columns[columnId];
                  const tasks = column.taskIds.map(taskId => this.props.tasks[taskId]);

                  return (
                    <Column
                      key={column.id}
                      column={column}
                      taskList={tasks}
                      index={index}
                      newColumnButtonRef={this.newColumnButtonRef}
                    />
                  );
                })}
                {provided.placeholder}
                <NewColumnButton setNewColumnButtonRef={this.setNewColumnButtonRef} />
              </Container>
            )}
          </Droppable>
        </DragDropContext>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { moveTask, addColumn, moveColumn }
)(App);

App.propTypes = {
  moveTask: PropTypes.func,
  addColumn: PropTypes.func,
  moveColumn: PropTypes.func,
  columns: PropTypes.object,
  tasks: PropTypes.object,
  columnOrder: PropTypes.array
};
