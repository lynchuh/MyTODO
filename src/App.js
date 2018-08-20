import React, { Component } from "react";
import AV from  "leancloud-storage"
import leancloud from "./leancloud";
import "./App.css";
import "normalize.css";
import Newtodo from "./component/newTodo/newTodo";
import Todoitem from "./component/todoItem/todoItem";
import UserDialog from './component/UserDialog/UserDialog'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [
        {
          id: 0,
          content: "我的第一条待办事项",
          finishStatus: false,
          createDate: new Date(),
          isDelete: false
        }
      ],
      newTodo: ""
    };
  }
  render() {
    
    let todos = this.state.todoList.map((todoItem, index) => {
      if (!todoItem.isDelete) {
        return (
          <li key={index}>
            <Todoitem
              item={todoItem}
              value="删除"
              isDelete={todoItem.isDelete}
              status={todoItem.finishStatus}
              onChange={this.toggleCompletedStatus.bind(this)}
              onClick={this.toggleDeletedStatus.bind(this)}
            />
          </li>
        );
      }
    });

    let deleteTodo = this.state.todoList.map((todoItem, index) => {
      if (!!todoItem.isDelete) {
        return (
          <li key={index}>
            <Todoitem
              item={todoItem}
              isDelete={todoItem.isDelete}
              status={todoItem.finishStatus}
              onClick={this.toggleDeletedStatus.bind(this)}
              value="恢复"
            />
          </li>
        );
      }
    });
    return (
      <div className="App">
        <UserDialog></UserDialog>
        <header className="App-header">
          <h1 className="App-title">我的待办列表</h1>
        </header>
        <main>
          <Newtodo
            value={this.state.newTodo}
            onChange={this.handleChange.bind(this)}
            onClick={this.handleAddClick.bind(this)}
          />
          <div className="todoList">
            <h2>全部事项</h2>
            <ol>{todos}</ol>
            <h2>删除事项</h2>
            <ol>{deleteTodo}</ol>
          </div>
        </main>
      </div>
    );
  }
  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }
  handleAddClick(event) {
    if (!!this.state.newTodo) {
      this.state.todoList.push({
        id: this.state.todoList.length,
        content: this.state.newTodo,
        finishStatus: false,
        createDate: new Date(),
        isDelete: false
      });
      this.setState({
        todoList: this.state.todoList,
        newTodo: ""
      });
    } else {
      alert("你还没告诉我你要做什么啦！");
    }
  }
  toggleCompletedStatus(e, item) {
    item.finishStatus = !item.finishStatus;

    this.setState(this.state);
    console.log(this.state);
  }
  toggleDeletedStatus(e, item) {
    item.isDelete = !item.isDelete;
    this.setState(this.state);
    console.log(this.state);
  }

}
