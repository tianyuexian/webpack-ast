let babel = require('@babel/core');

let code = `const sum = (a,b)=> {return a+b};`;
// const sum = function aa(){ return a+b}
let t = require('@babel/types');
// t第一个功能是可以构建 ast语法对象  2) 判断当前ast是什么类型
let transformArrow = {
  visitor:{ // 访问者模式
    ArrowFunctionExpression(path){ // node ={type}
      let node = path.node; // 获取当前节点的对象
      let params = node.params; // 获取箭头函数的参数
      let body = node.body;// 获取节点的内容
      if (!t.isBlockStatement(body)){
        body = t.blockStatement([t.returnStatement(body)])
      }
      let obj = t.functionExpression(null, params, body );
      path.replaceWith(obj);
    }
  }
}
let r = babel.transform(code,{
  plugins:[
    transformArrow
  ]
});
console.log(r.code);