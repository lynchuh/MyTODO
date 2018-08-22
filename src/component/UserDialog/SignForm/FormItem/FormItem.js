import React from 'react'
import './FormItem.css'

export default class formItem extends React.Component{

  render(){
    return (
      <div className='formItem'>
        <label htmlFor={this.props.myItem.id}>{this.props.myItem.word} </label>
        <input 
        type={this.props.myItem.type} 
        name={this.props.myItem.id} 
        value={this.props.value[this.props.myItem.id]} 
        onChange={this.handleChange.bind(this,this.props.myItem.id)}
        />
      </div>
    )
  }

  handleChange(keyword,event){
    !!this.props.onChange && this.props.onChange.call(null,keyword,event)
  }

  
}