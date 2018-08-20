import React from 'react'

import Button from '../../button/button'
import FormItem from '../formItem/formItem'



export default class SignIn extends React.Component{
  constructor(props){
    super(props)

  }
  render(){
    let formItems=this.props.formItem.map((item,index)=>{
     
      return (
        <FormItem 
        key={index} 
        formItem={item}
        onSubmit={this.handleSubmit}
        onChange ={this.handleChange}
        ></FormItem>
      )

    })
    return(
      <form onSubmit={this.handleSubmit.bind(this) }>
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
}