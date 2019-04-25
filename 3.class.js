let babel = require('@babel/core');
let t = require('@babel/types');
let code = `class Zfpx {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  a(){
    return 123
  }
}`;
let classTransfrom = {
  visitor:{
    ClassDeclaration(path){
      let node = path.node; // 当前类的对象
      let id = node.id; // 当前的类名
      let methods = node.body.body;
      methods = methods.map(method=>{
        if(method.kind === 'constructor'){ // 是不是构造函数 是的话转化成函数定义
          return t.functionDeclaration(id, method.params,method.body,false,false);
        }else{
          // 定义左边                  Zfpx.prototype   getName
          let left =t.memberExpression(t.memberExpression(id, t.Identifier('prototype')),method.key)
          // function(method.params){method.body}
          let right = t.functionExpression(null,method.params,method.body,false,false);
          return t.assignmentExpression('=',left,right);
        }
      });
      path.replaceWithMultiple(methods); // 用多个节点 替换调原来的节点
    }
  }
}



let r = babel.transform(code,{
  plugins:[
    classTransfrom
  ]
});
console.log(r.code);