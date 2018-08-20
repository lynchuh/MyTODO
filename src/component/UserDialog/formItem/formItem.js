import React from 'react'

export default class formItem extends React.Component{
  constructor(props){
    super(props)
  }

  render(){

    return (
      <div className="formItem" >
        <label htmlFor={this.props.formItem.id}>{this.props.formItem.word}</label>
        <input type="text" name={this.props.formItem.id}  onChange={this.handleChange.bind(this,this.props.formItem.id)} />
      </div>
    )
  }

  handleChange(keyword,event){
    !!this.props.onChange && this.props.onChange.call(null,keyword,event)
  }
}