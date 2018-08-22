import React from 'react'

import FormItem from './FormItem/FormItem'

const signInArray = [
  {id:'userName',word:'用户名',type:'text'},
  {id:'passWord',word:'密码',type:'password'},
]

const signUpArray = [
  {id:'userName',word:'用户名',type:'text'},
  {id:'userEmail',word:'邮箱',type:'email'},
  {id:'passWord',word:'密码',type:'password'},
]

function newSignForm (FormItem,itemArray){
  return class extends React.Component{
    render(){
      let formArray = itemArray.map((item,index)=>{
        return (
          <FormItem 
            myItem={item}
            key={index}
            value= {this.props.value}
            onChange={this.props.onChange}
          ></FormItem>
        )
      })
      return (
        <div >
          {formArray}
        </div>
      )
      
    }

  }
}
export const SignIn =newSignForm(FormItem,signInArray)
export const SignUp =newSignForm(FormItem,signUpArray)