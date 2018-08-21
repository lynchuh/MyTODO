import React, { Component } from "react";
import "./App.css";
import "normalize.css";
import Newtodo from "./component/Todo/NewTodo/NewTodo"
import Todoitem from "./component/Todo/TodoItem/TodoItem"
import UserDialog from "./component/UserDialog/UserDialog"
import {getCurrentUser,logOut,TodoModel} from './leancloud'




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [

      ],
      newTodo: "",
      userInfo:getCurrentUser() || {},

    }
    !!this.getUserTodos() && this.setState({todoList:this.getUserTodos()})
  }
  getUserTodos(){
    let user = getCurrentUser()
    if(user){
      TodoModel.getByUser(user,(todos)=>{
        let todoListCopy = JSON.parse(JSON.stringify(this.state.todoList))
        todoListCopy = todos
        return todoListCopy
      })
    }
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
              status={todoItem.isCompeleted}
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
              status={todoItem.isCompeleted}
              onClick={this.toggleDeletedStatus.bind(this)}
              value="恢复"
            />
          </li>
        );
      }
    });
    return (
      <div className="App">
        {!!this.state.userInfo.id ? null: 
        <UserDialog 
        onSignIn={this.handleSignIn.bind(this)} 
        onSignUp={this.handleSignUp.bind(this)}
        ></UserDialog>}
        
        <header className="App-header">
          <h1 className="App-title">{this.state.userInfo.username ||'我'}的待办列表</h1>
          <div className="userInfo">
          {!!this.state.userInfo.id?<span onClick = {this.handlelogOut.bind(this)}>退出登陆</span>: null}
          </div>
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
      
      TodoModel.create({
        content:this.state.newTodo,
        isDelete:false,
        isCompeleted:false
      }).then((todoItem)=>{
        console.log(todoItem)
        let item = {
          id:todoItem.id,
          ...todoItem.attributes,
          createdAt:todoItem.createdAt.toDateString(),
          updatedAt:todoItem.updatedAt.toDateString()}
        this.state.todoList.push({
          id: item.id,
          content: item.content,
          isCompeleted: item.isCompeleted,
          createDate: item.updatedAt || item.createdAt,
          isDelete: item.isDelete
        })
        this.setState({
          todoList: this.state.todoList,
          newTodo: ""
        });
      })
    } else {
      alert("你还没告诉我你要做什么啦！");
    }
  }
  toggleCompletedStatus(e, item) {
    TodoModel.update({
      id:item.id,
      isCompeleted:!item.isCompeleted
    }).then((todo)=>{
      console.log(todo)
      let currentData = {updatedAt:todo.updatedAt.toDateString(),...todo.attributes}
      item.isCompeleted = currentData.isCompeleted
      item.updatedAt= currentData.updatedAt
      this.setState(this.state)
    },(error)=>{
      console.log(error)
    })

  }
  toggleDeletedStatus(e, item) {
    TodoModel.update({
      id:item.id,
      isDelete:!item.isDelete
    }).then((todo)=>{
      console.log(todo)
      let currentData = {updatedAt:todo.updatedAt.toDateString(),...todo.attributes}
      item.isDelete = currentData.isDelete
      item.updatedAt= currentData.updatedAt
      this.setState(this.state)
    },(error)=>{
      console.log(error)
    })

  }
  handleSignIn(userInfo){
    !!this.getUserTodos() && this.setState({
      userInfo:userInfo,
      todoList:this.getUserTodos()
    
    })
  }
  handleSignUp(userInfo){
    !!this.getUserTodos() && this.setState({
      userInfo:userInfo,
      todoList:this.getUserTodos()
    })
  }
  handlelogOut(event){
    event.preventDefault()
    logOut()
    this.setState({
      userInfo:{},
      todoList:[]
    })
  }
}
