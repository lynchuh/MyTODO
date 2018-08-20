import React from "react"

import './UserDialog.css'
import SignForm from './signForm/signForm'

// import {signUp} from ''

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
            ]
        }
    }
    render() {
        console.log(this.state.formData)
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

        })
    }
    handleSubmit(event){
        console.log('dialog')
        console.log(event.target)
    }
    assignValue(item){
        console.log(item)
        return this.state.formData[item]
    }
    changeFormData(keyword,event){
        let stateCopy =JSON.parse(JSON.stringify(this.state.formData))
        stateCopy[keyword]=event.target.value
        this.setState({
            formData: stateCopy
        })

    }

}
