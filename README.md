# MyTODO
> 采用官方提供的creat-react-app脚手架，基于React实现的在线TODO应用。此次开发的TODO 是在第一个[todolist](https://github.com/lynchuh/TodoList-demo)上进行功能拓展的项目。


## 功能实现
- 单页面应用
- 在线应用，可登陆注册；数据存储到leancloud
- todoList可增删改，数据同步到leancloud
- 根据todolitem状态/用户交互实现视图切换

PS：todolist的增删改中的删，这里并不是真正意义的“删”，而是改变它的状态，（用户总想把以前删掉的东西找回来，他们就是这么喜欢后悔）。
## 项目预览
<img src="http://pdoyygimo.bkt.clouddn.com/logUp-min.png" width="400px"/> <img src="http://pdoyygimo.bkt.clouddn.com/%E5%88%A0%E9%99%A4-min.png" width="400px"/><img src="http://pdoyygimo.bkt.clouddn.com/logIn-min.png" width="400px"/><img src="http://pdoyygimo.bkt.clouddn.com/%E5%BE%85%E5%8A%9E-min.png" width="400px"/><img src="http://pdoyygimo.bkt.clouddn.com/%E5%AE%8C%E6%88%90-min.png" width="400px"/>

## 存在问题
1. 视图方面：视图切换太过生硬，用户体验并不算十分完美，我曾尝试使用CSS 3 来增添交互效果，结果发现动画流畅度并不如意，由于知识短板缘故，这个有待优化
2. 路由设置：由于这是第二次使用react开发的项目，目的更多是体验并深入学习react，很多react生态下的技术栈并没有使用，如react-router等。
3. 数据传递与管理：当一个项目的功能/交互实现越多，或组件划分越细致，你就会迫切地感觉到Redux的重要性了。由于react的单一数据流的缘故，数据只能经由props自上而下流动，很多时候数据的传递显得特别冗长。

## 最后碎碎念
  在开始做这个项目之前，我曾想过先学习React的技术生态再来做这个项目。但当我翻阅资料学习的时候，才发现，在纸上/屏幕上看到的知识或者技术点自己完全不能感同身受。如果完全按照它的套路去做，也许会做出一个作品出来，但是对于API的存在意义及作用可能并不会更深入了解。所以我后来更倾向去先尝试，哪怕有些地方并不是特别熟练，然后再回头翻阅资料，得到的知识会更牢固。
  比如，在完成这个项目之后，我才开始感受到redux、React-Motion等的迫切需要。
  
  Anyway,学习的道路总不会有尽头，唯有在路上保持激情吧~
