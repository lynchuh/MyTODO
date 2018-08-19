import React from 'react'
import './button.css'
export default class Button extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isClick:false,

        }
        this.myRefs = React.createRef()
        
    }
    render(){
        let self= this
        return(
            <button ref="button" className="button" onClick={this.handleClick.bind(this)} onAnimationEnd={this.animationEnd.bind(this)}>
                {!!this.state.isClick ? <span className="circle"/> : ''}
                <span className="value">{this.props.value}</span>
            </button>
        )
    }
    handleClick(event){
        let {clientX,clientY} = event  
        // console.log(React.findDOMNode(this.refs.button).focus())

        this.setState({
            isClick: true
        })
        !!this.props.onClick && this.props.onClick.call(null,event)
    }
    animationEnd(){
        this.setState({
            isClick:false
        })
    }
}