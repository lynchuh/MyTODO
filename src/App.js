import React, { Component } from 'react';
import './App.css';
import 'normalize.css'
import Newtodo from './component/newTodo/newTodo'
import Todoitem from './component/todoItem/todoItem'


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList:[
        {
          id:0,
          content:'my first todo',
          finishStatus:false,
          createDate: '',
          isDelete: false,
        },
        {
          id:1,
          content:'my second todo',
          finishStatus:false,
          createDate:'',
          isDelete:false,
        }
      ],
      newTodo:''
    }
  }
  render() {
    let todos= this.state.todoList.map((todoItem,index)=>{
      return (
      <li key={index} >
        <Todoitem  item={todoItem}></Todoitem>
      </li>)
    })
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">我的待办列表</h1>
        </header>
        <main>
          <Newtodo value={this.state.newTodo} onChange={this.handleChange.bind(this)}></Newtodo>
        <div className="todoList">
        <h2>全部事项</h2>
          <ol >
            {todos}
          </ol>
        </div>
        </main>
      </div>
    );
  }
  handleChange(event){
    this.setState({
      newTodo:event.target.value
    })
  }




}
