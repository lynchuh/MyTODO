import React from 'react'
import './todoItem.css'


export default class Todolist extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            
            <span>{this.props.item.content}</span>
            
        )
    }
}
