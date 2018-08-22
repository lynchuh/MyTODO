import React from 'react'
import "./NewTodo.css"
import Button from '../../button/button'


export default class Newtodo extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div className="inputWrapper">
                <input type="text" placeholder="又有事情做啦~" value={this.props.value} onChange={this.handleChange.bind(this)}/>
                <Button value="添加"onClick={this.handleClick.bind(this)}></Button>
            </div>
        )
    }
    handleChange(event){
        !!this.props.onChange  &&this.props.onChange.call(null,event)
    }
    handleClick(event){
        !!this.props.onClick && this.props.onClick.call(null,event)
    }
}
