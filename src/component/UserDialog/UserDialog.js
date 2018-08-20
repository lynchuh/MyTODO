import React from "react"

import "./UserDialog.css"

import SignForm from "./SignForm/SignForm"
import {signUp,signIn} from "../../leancloud"

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
            signIn:[
                {id:'userName',word:'用户名',type:'text'},
                {id:'passWord',word:'密码',type:'password'},
            ],
            signUp:[
                {id:'userName',word:'用户名',type:'text'},
                {id:'userEmail',word:'邮箱',type:'email'},
                {id:'passWord',word:'密码',type:'password'},
            ],
            formItemStatus:false
        }
    }
    render() {
        return (
            <div className="userDialogWrapper">
                <div className="userDialogContent">
                    <h1>Welcome</h1>
                    <div className="content">
                        {
                            <SignForm 
                                formItem={this.state[this.state.status]}
                                onChange={this.changeFormData.bind(this)} 
                                onSubmit={this.handleSubmit.bind(this)}
                                onchangeLabelStatus={this.handleLabelStatus.bind(this)}
                                value={this.state.formData}
                                labelStatus= {this.state.formItemStatus}
                            ></SignForm>
                           
                        }
                    </div>
                    <nav >
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
                    </nav>
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
    handleSubmit(event){

        if(this.state.status === 'signUp'){
            let{userName,userEmail,passWord} =this.state.formData

            signUp({
                userName:userName,
                userEmail:userEmail,
                passWord:passWord
            }).then((user)=>{
                console.log(user)
            },(error)=>{
                console.log(error)
            })
        }else if(this.state.status === 'signIn'){
            let{userName,passWord} =this.state.formData
            signIn({
                userName:userName,
                passWord:passWord
            }).then((user)=>{
                console.log(user)

                let userData = {id:user.id,...user.attributes}
                this.props.onSignIn && this.props.onSignIn.call(null,userData)
            },(error)=>{
                console.log(error)
            })
        }
    }
    
    changeFormData(keyword,event){
        let stateCopy =JSON.parse(JSON.stringify(this.state.formData))
        stateCopy[keyword]=event.target.value
        this.setState({
            formData: stateCopy
        })

    }
    handleLabelStatus(event){
        event.type === 'focus'  && this.setState({
            formItemStatus: true
        })
        event.type=== 'blur' && !!event.target.value && this.setState({
            formItemStatus: true
        })
        event.type=== 'blur' && !event.target.value && this.setState({
            formItemStatus: false
        })
     }

}
