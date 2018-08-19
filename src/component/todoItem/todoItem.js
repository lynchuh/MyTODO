import React from 'react'
import './todoItem.css'


export default class Todolist extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <div>
                <input type="checkbox" onChange={this.handleChange.bind(this)}/>
                <span className={!!this.props.status?'completed':''}>{this.props.item.content}</span>
            </div>
            
        )
    }
    handleChange(event){
        this.props.toggleStatus.call(null,event,this.props.item)
    }
}
