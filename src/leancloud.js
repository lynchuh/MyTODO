import AV from 'leancloud-storage'

let APP_ID = 'Avxef2oQjbCukQEmCTQpHsvO-gzGzoHsz';
let APP_KEY = 'SqdKMldWYSvTS39g0GGKtCW8';
    
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });

export default AV


//dialog
export function signUp ({userName,userEmail,passWord},successfn,errorfn){
  let user = new AV.User()
  user.setUsername(userName)
  user.setPassword(passWord)
  user.setEmail(userEmail)
  return user.signUp()
}

export function signIn ({userName,passWord},successfn,errorfn){
  return AV.User.logIn(userName,passWord)
}


//App
export function getCurrentUser(){
  let currentUser = AV.User.current()
  return currentUser
}

export function logOut (){
  AV.User.logOut()
  let currentUser = AV.User.current
  return currentUser
}

export const TodoModel={
  create({content,isDelete,isCompeleted,createDate}){
    let Todo =AV.Object.extend('Todo')
    let todo = new Todo()
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setWriteAccess(AV.User.current(), true)
    todo.setACL(acl)
    todo.set('content',content)
    todo.set('isDelete',isDelete)
    todo.set('isCompeleted',isCompeleted)
    todo.set('createDate',createDate)
    return todo.save()
  },
  update(id,{content,isDelete,isCompeleted}){
    let todo = AV.Object.createWithoutData('Todo', id)
    !!content && todo.set('content',content)
    !!isDelete && todo.set('isDelete',isDelete)
    !!isCompeleted && todo.set('isCompeleted',isCompeleted)
    return todo.save()
  },
  getUserData(successfn,errorfn){
    let currentUser = AV.User.current()
    console.log('currentUser')
    console.log(currentUser)
    let query = new AV.Query('Todo')
     query.find().then((response)=>{
       console.log(response)
      let array =response.map((todoItem)=>{
        return {id:todoItem.id,...todoItem.attributes}
      })
      console.log(array)
      !!successfn && successfn.call(null,array)
    },(error)=>{
      console.log(error)
      errorfn && errorfn.call(null,error)
    })
  }

}