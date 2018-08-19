import React from 'react'
import './newTodo.css'
import Button from '../button/button'


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
                <Button value="添加"></Button>
            </div>
        )
    }
    handleChange(event){
        !!this.props.onChange  &&this.props.onChange.call(null,event)
    }
}
