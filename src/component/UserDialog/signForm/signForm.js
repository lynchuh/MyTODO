import React from 'react'

import Button from '../../button/button'
import FormItem from './FormItem/FormItem'



export default class SignIn extends React.Component{
  constructor(props){
    super(props)

  }
  render(){
    let formItems=this.props.formItem.map((item,index)=>{
     
      return (
        <FormItem 
        key={index} 
        value={this.props.value}
        formItem={item}
        labelStatus= {this.props.labelStatus}
        onSubmit={this.handleSubmit.bind(this)}
        onChange ={this.handleChange.bind(this)}
        onchangeLabelStatus={this.handleLabelStatus.bind(this)}
        ></FormItem>
      )

    })
    return(
      <form onSubmit={this.handleSubmit.bind(this)  }>
        { formItems }
        <Button value="登陆"></Button>
      </form>
    )
  }
  handleChange(keyword,event){
    
    !!this.props.onChange && this.props.onChange.call(null,keyword,event)
  }
  handleSubmit(event){
    event.preventDefault()
    !!this.props.onSubmit && this.props.onSubmit.call(null,event)
  }
  handleLabelStatus(event){
    !!this.props.onchangeLabelStatus && this.props.onchangeLabelStatus.call(null,event)
  }
}