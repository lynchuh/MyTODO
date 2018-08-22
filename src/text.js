import React from 'react'

export default class formItem extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    console.log('text')
    console.log(this.props)
    return (
      <div className='formItem'>
        <label> test </label> 
        <input 
        value={this.props.value} 
        />
      </div>
    )
  }

  
}