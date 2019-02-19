import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import styled, { createGlobalStyle } from 'styled-components';
import bg from '../serenity.jpeg';
import { connect } from 'react-redux';
import { moveTask, addColumn, moveColumn } from '../actions';

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
  background: url(${bg});
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

footer {
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

  & a{
    color: inherit;
    text-decoration: none;
    transition: color .25s ease;
  }

   & a:hover{
     color: #0ef5c7;
   }
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

const NewColumnButton = styled.button`
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

class App extends React.Component {
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
  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
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
          {/* <div
            style={{ height: '100%', display: 'flex' }}
            ref={this.containerRef}
          > */}
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.columnOrder.map((columnId, index) => {
                  const column = this.props.columns[columnId];
                  const tasks = column.taskIds.map(
                    taskId => this.props.tasks[taskId],
                  );

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
                <NewColumnButton
                  ref={el => (this.newColumnButtonRef = el)}
                  onClick={this.handleAddColumn}
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
                </NewColumnButton>
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
          {/* </div> */}
        </DragDropContext>
        <footer>
          <a href="https://github.com/tmelliottjr/Not-Quite-Trello">
            <i className="fab fa-github" />
          </a>
          <a href="https://tomelliott.io">Tom Elliott</a>
        </footer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { moveTask, addColumn, moveColumn },
)(App);
