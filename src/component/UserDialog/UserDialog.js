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
                    <span className="fogetPassword">忘记密码</span>
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
                <Button value="注册"></Button>
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
                    {/* <nav >
                        <ol >
                            <li
                                data-account="signIn"
                                onClick={this
                                .handleClick
                                .bind(this)}>登陆</li>
                            <li
                                data-account="signUp"
                                onClick={this
                                .handleClick
                                .bind(this)}>注册</li>
                        </ol>
                    </nav> */}
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
            }

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
        })
    }
    _signUp(){
        let{userName,userEmail,passWord} =this.state.formData
        signUp({
            userName:userName,
            userEmail:userEmail,
            passWord:passWord
        },(userInfo)=>{
            this.props.onlogIn && this.props.onlogIn.call(null,userInfo)
        },(error)=>{
            //提示登陆错误信息
        })
    }
    _changeFormData(keyword,event){
        let stateCopy =JSON.parse(JSON.stringify(this.state.formData))
        stateCopy[keyword]=event.target.value
        this.setState({
            formData: stateCopy
        })

    }

}
