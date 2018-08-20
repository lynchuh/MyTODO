import React from 'react'
import Button from '../../button/button'

export default class SignIn extends React.Component{
  constructor(props){
    super(props)

  }
  render(){

    return(
      <form >
      <div className="formItem">
          <label htmlFor="userName">用户名</label>
          <input type="text" name="userName" onChange={this.handleChange.bind(this,'userName')}/>
      </div>
      <div className="formItem">
          <label htmlFor="userEmail">邮箱</label>
          <input type="email" name="userEmail" onChange={this.handleChange.bind(this,'userEmail')}/>
      </div>
      <div className="formItem">
          <label htmlFor="passWord">密码</label>
          <input type="password" name="passWord" onChange={this.handleChange.bind(this,'passWord')}/>
      </div>
      <Button value="注册"></Button>
  </form>
    )
  }
  handleChange(keyword,event){
    !!this.props.onChange && this.props.onChange.call(null,keyword,event)
  }

}