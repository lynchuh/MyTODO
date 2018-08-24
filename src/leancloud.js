import AV from 'leancloud-storage'


let APP_ID = 'LzgUv61HpSdPh94fAH9oqnbq-gzGzoHsz';
let APP_KEY = 'J5vWIe7jPScPVdxwd6cOv9rf';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV


//dialog
export function signUp({
  userName,
  userEmail,
  passWord
}, successfn, errorfn) {
  let user = new AV.User()
  user.setUsername(userName)
  user.setPassword(passWord)
  user.setEmail(userEmail)
  user.signUp().then((user) => {
    let userInfo = {
      id: user.id,
      ...user.attributes
    }
    successfn && successfn.call(null,userInfo)
  },(error)=>{
    console.log(error)
  })
}

export function signIn({
  userName,
  passWord
}, successfn, errorfn) {
   AV.User.logIn(userName, passWord).then((user) => {
    let userInfo = {
      id: user.id,
      ...user.attributes
    }
    successfn && successfn.call(null,userInfo)
  },(error)=>{
    console.log(error)
  })
}


//App
export function getCurrentUser(successfn) {
  let currentUser = AV.User.current()
  return currentUser
}

export function logOut() {
  AV.User.logOut()
  let currentUser = AV.User.current
  return currentUser
}

export const TodoModel = {
  create({
    content,
    isDelete,
    isCompeleted,
    createDate
  },successfn,errorfn) {
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    todo.setACL(acl)
    todo.set('content', content)
    todo.set('isDelete', isDelete)
    todo.set('isCompeleted', isCompeleted)
    todo.set('createDate', createDate)
    todo.save().then((todo)=>{
      let newtodo = {id:todo.id,...todo.attributes}
      successfn && successfn.call(null,newtodo)
    },(error)=>{
      errorfn && errorfn.call(null,error)
    })
  },
  update(id, {
    content,
    isDelete,
    isCompeleted
  },successfn,errorfn) {
    let todo = AV.Object.createWithoutData('Todo', id) 
    !!content && todo.set('content', content) 
    !!isDelete && todo.set('isDelete', isDelete) 
    !!isCompeleted && todo.set('isCompeleted', isCompeleted)
    todo.save().then((todo)=>{
      let newtodo = {id:todo.id,...todo.attributes}
      successfn && successfn.call(null,newtodo)
    },(error)=>{
      errorfn && errorfn.call(null,error)
    })
  },
  getUserData(successfn, errorfn) {
    let query = new AV.Query('Todo')
    query.find().then((response) => {
      let array = response.map((todoItem) => {
        return {
          id: todoItem.id,
          ...todoItem.attributes
        }
      }) 
      successfn && successfn.call(null, array)
    }, (error) => {
      errorfn && errorfn.call(null, error)
    })
  }

}