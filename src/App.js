import React, { Component } from 'react';
import './App.css';
import Button from './component/button/button'
import Newtodo from './component/newTodo/newTodo'








class App extends Component {
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

      ]
    }
  }
  render() {
    let todos= this.state.todoList.map((todoItem,index)=>{
      return <li data-item={index}>{todoItem.content}</li>
    })
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">我的待办列表</h1>
        </header>
        <main>
          <Newtodo></Newtodo>
          <ol className="todoList">
           {todos}
          </ol>
        </main>
      </div>
    );
  }
}

export default App;
