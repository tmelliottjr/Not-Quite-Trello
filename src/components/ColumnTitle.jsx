import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { editColumn, deleteColumn } from '../actions';

const Title = styled.h3`
  color: white;
  font-size: 32px;
  padding: 0 10px;
  margin: 0;
  text-align: center;
  max-height: 200px;
  overflow-y: scroll;
`;

const EditTitle = styled.textarea`
  outline: none;
  font-family: inherit;
  font-size: 18px;
  padding: 3px;
  border: none;
  border-radius: 2px;
  font-weight: 200;
  background-color: #7d7d7d54;
  color: white;
  width: 100%;
  margin: 5px;
  resize: none;

  ::placeholder {
    color: white;
  }
`;
const EditTitleContainer = styled.div`
  height: 60px;
  display: flex;
  align-content: center;
`;

class ColumnTitle extends Component {
  constructor(props) {
    super(props);
    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.saveTitleChange = this.saveTitleChange.bind(this);
    this.titleRef = React.createRef();
    this.state = { editTitle: false, title: this.props.column.title };
  }

  componentWillMount() {
    if (this.props.column.id === this.props.addedColumn) {
      this.setState({ editTitle: true });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleMouseDown(e) {
    if (!this.state.editTitle) return;

    if (e.target !== this.titleRef.current) {
      const { id } = this.props.column;
      // If this is a newly added column delete the column if no title provided.
      // TODO update store so that new columns don't persist if browser is closed on new column
      return id === this.props.addedColumn && !this.state.title
        ? this.props.deleteColumn(id)
        : this.saveTitleChange();
    }
  }

  handleKeyPress(e) {
    if (!this.state.editTitle || e.which !== 13) return;
    this.saveTitleChange();
  }

  saveTitleChange() {
    if (this.state.title) {
      this.props.editColumn(this.props.column.id, this.state.title);
    }
    this.setState({ editTitle: !this.state.editTitle });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleEditTitle() {
    this.setState({ editTitle: !this.state.editTitle });
  }
  render() {
    return (
      <>
        {this.state.editTitle ? (
          <EditTitleContainer>
            <EditTitle
              ref={this.titleRef}
              onChange={this.handleTitleChange}
              onFocus={e => {
                e.target.select();
              }}
              defaultValue={this.props.column.title}
              autoFocus={true}
              resize={false}
              placeholder="Enter title..."
            />
          </EditTitleContainer>
        ) : (
          <Title onClick={this.handleEditTitle}>
            {' '}
            {this.props.column.title}
          </Title>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(
  mapStateToProps,
  { editColumn, deleteColumn },
)(ColumnTitle);
