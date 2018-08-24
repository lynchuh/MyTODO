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
      newTodo: "",
      userInfo: {},
      todoList: [],
    }
  }
  componentWillMount(){
    this._setCurrentUser(this._setUserData.bind(this))
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
              onChange={this.handleTodoitemChange.bind(this)}
              onClick={this.handTodoitemClick.bind(this)}
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
              onClick={this.handTodoitemClick.bind(this)}
              value="恢复"
            />
          </li>
        );
      }
    });
    return (
      <div className="App">
        {!!this.state.userInfo.id? null: 
        <UserDialog 
        onlogIn={this.handleSignIn.bind(this)} 
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
            onChange={this.handleNewtodoChange.bind(this)}
            onClick={this.handleNewtodoClick.bind(this)}
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


  handleSignIn(user){
    this._setUserWhenlogIn(user,this._setUserData.bind(this))
  }
  handlelogOut(e){
    logOut()
    this.setState({
      userInfo:{},
      todoList:[]
    })
  }
  // NewTodo
  handleNewtodoChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }
  handleNewtodoClick(){
    if(!!this.state.newTodo){
      let newItem = {
        content: this.state.newTodo,
        isDelete:false,
        isCompeleted:false,
        createDate: new Date()
      }
      this._saveNewtodo(newItem)
    }else{
      alert('你还没告诉我你要做什么啦！')
    }
  }

  // TodoList
  handleTodoitemChange(event,item){
    this._updatevalue(item,'isCompeleted')
  }
  handTodoitemClick(event,item){
    this._updatevalue(item,'isDelete')
  }



  _saveNewtodo({content,isDelete,isCompeleted,createDate}){
    TodoModel.create({
      content:content,
      isDelete:isDelete,
      isCompeleted:isCompeleted,
      createDate:createDate
    },(item)=>{
      let Newtodo = {id:item.id,...item.attributes}
      this.state.todoList.push(Newtodo)
        this.setState({
          todoList : this.state.todoList,
          newTodo:''
      })
    },(error)=>{
      console.log('create_error')
      console.log(error)
    })

  }
  _updatevalue(item,stringWord){
    !!stringWord && (item[stringWord]= !item[stringWord])
    TodoModel.update(item.id,{
      stringWord:item[stringWord]
    },(item)=>{
      let todoListCopy=JSON.parse(JSON.stringify(this.state.todoList))
      todoListCopy.map((todo)=>{
        todo= todo.id===item.id ? item : todo
        return todo
      })
      this.setState({
        todoList:todoListCopy
      })
    },(error)=>{
      console.log('update_error')
      console.log(error)
    })
  }
  _setCurrentUser(successFn){
    const currentUser = getCurrentUser()
    let userInfo = !!currentUser ? {id:currentUser.id,...currentUser.attributes} : {}
    if(userInfo){
      this.setState({
        userInfo:userInfo
      })
      successFn && successFn.call(null,userInfo)
    }
    return userInfo
  }
  _setUserData(){
      TodoModel.getUserData((todos)=>{
          this.setState({
            todoList:todos
          })
      })
  }
  _setUserWhenlogIn(user,successFn){
    this.setState({
      userInfo:user
    })
    if(user){
      successFn && successFn.call(null,user)
    }
  }

}
