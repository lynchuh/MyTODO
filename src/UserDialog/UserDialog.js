import React from "react"
import './UserDialog.css'
import Button from '../component/button/button'
export default class UserDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasAccount: 'signIn'
        }
    }
    render() {
        let signIn = (
            <form >
                <div className="formItem">
                    <label htmlFor="userName">用户名</label>
                    <input type="text" name="userName"/>
                </div>
                <div className="formItem">
                    <label htmlFor="passWord">密码</label>
                    <input type="password" name="passWord"/>
                </div>

                <Button value="登陆"></Button>
            </form>
        )
        let signUp = (
            <form >
                <div className="formItem">
                    <label htmlFor="userName">用户名</label>
                    <input type="text" name="userName"/>
                </div>
                <div className="formItem">
                    <label htmlFor="userEmail">邮箱</label>
                    <input type="email" name="userEmail"/>
                </div>
                <div className="formItem">
                    <label htmlFor="passWord">密码</label>
                    <input type="password" name="passWord"/>
                </div>
                <Button value="注册"></Button>
            </form>
        )

        return (
            <div className="userDialogWrapper">
                <div className="userDialogContent">
                    <h1>Welcome</h1>
                    <div className="content">
                        {this.state.hasAccount === 'signIn'
                            ? signIn
                            : signUp}
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
                .getAttribute("data-account")
        })
        console.log(this.state)
    }

}
