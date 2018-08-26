import React from "react"

import "./UserDialog.css"

import {SignIn,SignUp} from "./SignForm/SignForm"
import {signUp,signIn} from "../../leancloud"
import Button from '../button/button'

export default class UserDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'signIn',
            formData:{
                userName:'',
                userEmail:'',
                passWord:'',
            },
            tips:''
        }
    }
    render() {
        const signInform= (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <SignIn
                    value={this.state.formData}
                    onChange={this.handleChange.bind(this)} 
                ></SignIn>
                <div className="buttonWrapper">
                    <Button value="登陆">
                    </Button>
                    <span className="tips">{this.state.tips}</span>
                </div>
                <div 
                className="changesignStatus"
                data-account="signUp"
                onClick={this.handleClick.bind(this)}
                >还没账号？点我注册</div>
            </form>
        )
        const signUpform= (
            <form onSubmit={this.handleSubmit.bind(this)  }>
                <SignUp
                    value={this.state.formData}
                    onChange={this.handleChange.bind(this)} 
                ></SignUp>
                <div className="buttonWrapper">
                    <Button value="注册">
                    </Button>
                    <span className="tips">{this.state.tips}</span>
                </div>
                <div 
                className="changesignStatus"
                data-account="signIn"
                onClick={this.handleClick.bind(this)}>我要登陆</div>
            </form>
        )

        return (
            <div className="userDialogWrapper">
                <div className="userDialogContent">
                    <h1>Welcome</h1>
                    <div className="content">
                        {this.state.status==='signIn'? signInform : signUpform}
                    </div>
                </div>

            </div>
        )
    }

    handleClick(event) {
        this.setState({
            status: event
                .target
                .getAttribute("data-account"),
            formData:{
                userName:'',
                userEmail:'',
                passWord:'',
            },
            tips:''

        })
    }
    handleChange(keyword,event){
        this._changeFormData(keyword,event)
    }
    handleSubmit(event){
        event.preventDefault()
        if(this.state.status === 'signIn'){
            this._signIn()
        }else if(this.state.status === 'signUp'){
            this._signUp()
        }
    }
    
    _signIn(){
        let {userName,passWord}= this.state.formData
        signIn({
            userName:userName,
            passWord:passWord
        },(userInfo)=>{
            this.props.onlogIn && this.props.onlogIn.call(null,userInfo)
        },(errorcode)=>{
            console.log(errorcode)
            switch(errorcode){
                case 200:
                    this._setTips('你的用户名呢？')
                    break
                case 201:
                    this._setTips('你的密码呢？')
                    break
                case 210:
                    this._setTips('您的密码与用户名不匹配')
                    break
                case 211:
                    this._setTips('找不到该用户')
                    break
                case 219:
                    this._setTips('登录失败次数超过限制，请稍候再试')
                    break
        
            }
        })
    }
    _signUp(){
        let{userName,userEmail,passWord} =this.state.formData
        if(!userName){
            this._setTips('用户名不能为空')
            return
        }
        signUp({
            userName:userName,
            userEmail:userEmail,
            passWord:passWord
        },(userInfo)=>{
            this.props.onlogIn && this.props.onlogIn.call(null,userInfo)
        },(errorcode)=>{
            switch(errorcode){
                case 125:
                    this._setTips('电子邮箱地址无效')
                    break
                case 202:
                    this._setTips('该用户名已经被占用')
                    break
                case 203:
                    this._setTips('电子邮箱地址已经被占用')
                    break
                    
            }
        })
    }
    _changeFormData(keyword,event){
        let stateCopy =JSON.parse(JSON.stringify(this.state.formData))
        stateCopy[keyword]=event.target.value
        this.setState({
            formData: stateCopy
        })

    }
    _setTips(value){
        this.setState({
            tips: value
        })
    }

}
