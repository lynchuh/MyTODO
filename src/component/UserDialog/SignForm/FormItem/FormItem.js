import React from 'react'
import './FormItem.css'

export default class formItem extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return (
      <div className={!!this.props.labelStatus ?'formItem active':'formItem' } >
        <label htmlFor={this.props.formItem.id}>{this.props.formItem.word} </label>
        <input 
        type={this.props.formItem.type} 
        name={this.props.formItem.id} 
        value={this.props.value[this.props.formItem.id]} 
        onChange={this.handleChange.bind(this,this.props.formItem.id)}

        />
      </div>
    )
  }

  handleChange(keyword,event){
    !!this.props.onChange && this.props.onChange.call(null,keyword,event)
  }

  
}