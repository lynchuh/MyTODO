import React from "react"
import './UserDialog.css'
import SignIn from './SignIn/signIn'
import SignUp from './SignUp/signUp'
// import {signUp} from ''

export default class UserDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasAccount: 'signIn',
            formData:{
                userName:'',
                userEmail:'',
                passWord:'',
            }
        }
    }
    render() {
        console.log(this.state.formData)
        return (
            <div className="userDialogWrapper">
                <div className="userDialogContent">
                    <h1>Welcome</h1>
                    <div className="content">
                        {this.state.hasAccount === 'signIn'
                            ? <SignIn onChange={this.changeFormData.bind(this)}></SignIn>
                            : <SignUp onChange={this.changeFormData.bind(this)}></SignUp>
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
            hasAccount: event
                .target
                .getAttribute("data-account"),
                formData:{
                userName:'',
                userEmail:'',
                passWord:'',
            }
        })
    }
    changeFormData(key,event){
        let stateCopy =JSON.parse(JSON.stringify(this.state.formData))
        stateCopy[key]=event.target.value
        this.setState({
            formData: stateCopy
        })

    }

}
