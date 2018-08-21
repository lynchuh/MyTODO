import AV from 'leancloud-storage'

let APP_ID = 'Avxef2oQjbCukQEmCTQpHsvO-gzGzoHsz';
let APP_KEY = 'SqdKMldWYSvTS39g0GGKtCW8';
    
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });


export default AV



export function signUp ({userName,userEmail,passWord}){
  let user = new AV.User()
  user.setUsername(userName)
  user.setPassword(passWord)
  user.setEmail(userEmail)
  return user.signUp()
}

export function signIn ({userName,passWord}){
  return AV.User.logIn(userName,passWord)
}

export function getCurrentUser(){
  let currentUser = AV.User.current()
  let userInfo
  if (currentUser){
    return userInfo= {id:currentUser.id,...currentUser.attributes}
  }
}

export function logOut (){
  AV.User.logOut()
  let currentUser = AV.User.current
  return currentUser
}


export const TodoModel={
  create({content,isDelete,isCompeleted}){
    let Todo =AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('content',content)
    todo.set('isDelete',isDelete)
    todo.set('isCompeleted',isCompeleted)
     return todo.save()
  },
  update(){

  },
  destroy(){

  }

}