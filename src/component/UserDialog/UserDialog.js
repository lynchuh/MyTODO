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
                {
                    id:'userName',
                    word:'用户名'
                },
                {
                    id:'passWord',
                    word:'密码'
                },
            ],
            signUp:[
                {
                    id:'userName',
                    word:'用户名'
                },
                {
                    id:'userEmail',
                    word:'邮箱'
                },
                {
                    id:'passWord',
                    word:'密码'
                },
            ]
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
                             onChange={this.changeFormData.bind(this)} 
                             formItem={this.state[this.state.status]}
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
            formData:{
                userName:'',
                userEmail:'',
                passWord:'',
            },
        })
    }
    handleSubmit(event){
        console.log('dialog')
        console.log(event)
    }

    changeFormData(keyword,event){
        let stateCopy =JSON.parse(JSON.stringify(this.state.formData))
        stateCopy[keyword]=event.target.value
        this.setState({
            formData: stateCopy
        })

    }


}
