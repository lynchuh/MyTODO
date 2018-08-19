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
          content:'你好',
          finishStatus:false,
          createDate: new Date(),
          isDelete:false,
        }
      ],
      newTodo:''
    }
  }
  render() {
    let todos= this.state.todoList.map((todoItem,index)=>{
      if(!todoItem.isDelete){
      return (
      <li key={index} >
        <Todoitem  item={todoItem} onChange={this.toggleCompletedStatus.bind(this)} status={todoItem.finishStatus} onClick={this.toggleDeletedStatus.bind(this)} value="删除"></Todoitem>
      </li>)
      }
    })

    let deleteTodo =this.state.todoList.map((todoItem,index)=>{
      if(!!todoItem.isDelete){
        return(
          <li key={index} >
          <Todoitem  
          item={todoItem}  
          status={todoItem.finishStatus} 
          onClick={this.toggleDeletedStatus.bind(this)} 
          value="恢复">
          </Todoitem>
        </li>
        )
      }
    })
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">我的待办列表</h1>
        </header>
        <main>
          <Newtodo value={this.state.newTodo} onChange={this.handleChange.bind(this)} onClick={this.handleAddClick.bind(this)}></Newtodo>
        <div className="todoList">
        <h2>全部事项</h2>
          <ol >
            {todos}
          </ol>
          <h2>删除事项</h2>
          <ol>
            {deleteTodo}
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
  handleAddClick(event){
    if(!!this.state.newTodo){
      this.state.todoList.push({
        id:this.state.todoList.length,
        content:this.state.newTodo,
        finishStatus:false,
        createDate: new Date(),
        isDelete:false,
      })
      this.setState({
        todoList:this.state.todoList,
        newTodo:''
      })
    }else{
      alert('你还没告诉我你要做什么啦！')
    }


  }
  toggleCompletedStatus(e,item){
    item.finishStatus = !item.finishStatus
    this.setState(this.state)
    console.log(this.state)
  }
  toggleDeletedStatus(e,item){
    item.isDelete=!item.isDelete
    this.setState(this.state)
  }



}
