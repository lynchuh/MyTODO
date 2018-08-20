import React from 'react'
import './formItem.css'

export default class formItem extends React.Component{
  constructor(props){
    super(props)
    this.state={
      labelStatus:false
    }
  }

  render(){
    console.log(this.state)
    return (
      <div className={!!this.state.labelStatus ?'formItem active':'formItem' } >
        <label htmlFor={this.props.formItem.id}>{this.props.formItem.word} </label>
        <input 
        type={this.props.formItem.type} 
        name={this.props.formItem.id} 
        value={this.props.value[this.props.formItem.id]} 
        onChange={this.handleChange.bind(this,this.props.formItem.id)}
        onBlur={this.handleBlur.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        />
      </div>
    )
  }

  handleChange(keyword,event){
    !!this.props.onChange && this.props.onChange.call(null,keyword,event)
  }
  handleBlur(event){
    if(!event.target.value){
      this.setState({ //失焦且没有内容状态
        labelStatus: false
      })
    }else{
      this.setState({ //失焦且有内容
        labelStatus: true
      })
    }
  }
  handleFocus(event){
    console.log(event)
    this.setState({ //聚焦状态
      labelStatus: true
    })
  }
  
}