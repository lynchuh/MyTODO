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
  return user.signUp().then(function(loginedUser){
    console.log(loginedUser)
  },function(error){
    console.log(error)
  })
  
}

export function signIn ({userName,passWord}){
  return AV.User.logIn(userName,passWord).then(function(e){
    console.log(e)
  })
}
