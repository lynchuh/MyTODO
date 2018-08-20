import React from 'react'
import './TodoItem.css'
import Button from '../../button/button'

export default class Todolist extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <div className={!!this.props.isDelete ?'deleted':''}>
                <input 
                type="checkbox" 
                onChange={this.handleChange.bind(this)}/>
                <span className={!!this.props.status?'completed':''}>{this.props.item.content}</span>
                <Button value={this.props.value} onClick={this.handleClick.bind(this)}></Button>
            </div>
            
        )
    }
    handleChange(event){
        !!this.props.onChange && this.props.onChange.call(null,event,this.props.item)
    }
    handleClick(event){
        !!this.props.onClick && this.props.onClick.call(null,event,this.props.item)
    }
}
