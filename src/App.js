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
      userInfo:getCurrentUser()||{},
      todoList: [

      ],
    }
    this._getUserData()
  }

  render() {
    console.log(this.state)
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
  componentDidMount(){


  }



  componentWillUpdate(){
  }
  componentDidUpdate(){
    this._saveInLeancloud()
  }
  handleSignIn(user){
    this.setState({
      userInfo:user
    })
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
  handleNewtodoClick(event){
    if(!!this.state.newTodo){
      let newItem = {
        id:'',
        content: this.state.newTodo,
        isDelete:false,
        isCompeleted:false,
        createDate: new Date()
      }
      this.state.todoList.push(newItem)
      this.setState({
        todoList : this.state.todoList,
        newTodo:''
      })
    }else{
      alert('你还没告诉我你要做什么啦！')
    }
  }

  // todoList
  handleTodoitemChange(event,item){
    this._updatevalue(item,'isCompeleted')
  }
  handTodoitemClick(event,item){
    this._updatevalue(item,'isDelete')
  }


  _saveInLeancloud(){
    console.log('_saveInLeancloud')
    this.state.todoList.map((item)=>{
      console.log(!item.id)
      if(!item.id){
        console.log(item)
        TodoModel.create({
          content:item.content,
          isDelete:item.isDelete,
          isCompeleted:item.isCompeleted,
          createDate:item.createDate
        }).then((success)=>{
          console.log('_saveInLeancloud')
          console.log(success)
        },(error)=>{
          console.log('create')
          console.log(error)
        })
      }
    })
  }


  _updateInleancloud(item,stringWord){
    console.log('_updateInleancloud')
    TodoModel.update(item.id,{
      stringWord:item[stringWord]
    })
  }
  _updatevalue(item,stringWord){
    !!stringWord && (item[stringWord]= !item[stringWord])
    this.setState(this.state)
    this._updateInleancloud(item,stringWord)
  }
  _getCurrentUser(getdata){
    const currentUser = getCurrentUser()
    this.setState({
      userInfo :currentUser
    })
    getdata && getdata.call(this)
  }
  _getUserData(){
    console.log('_getUserData')
    const user = getCurrentUser()
    if(user){
      console.log(user)
      TodoModel.getUserData((todos)=>{
        console.log(todos)
          let todoListCopy = JSON.parse(JSON.stringify(this.state.todoList))
          todoListCopy = todos
          this.setState({
            todoList:todoListCopy
          })
      })
    }
    
  }
}
