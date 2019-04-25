// eslint
// ast 就是把原代码 转换成树状结构
// babel es6 -> es5
// 1）遍历这个树 2）进行树的更改 3）最终更改后产生最新的代码
// esprima 把代码先转化成树 ast
// estraverse 深度优先 遍历树后
// escodegen 重新生成代码
let code = `function ast() { }`;

let esprima = require('esprima');
let estraverse = require('estraverse');
let escodegen = require('escodegen');

let ast = esprima.parseScript(code);
estraverse.traverse(ast,{
  enter(node){ // 参数就是当前节点 节点有type
    if (node.type === 'Identifier'){
      node.name = 'hello';
    }
  },
  leave(node){
    console.log('leave:'+node.type)
  }
})
let r = escodegen.generate(ast);
console.log(r);
// 写一些babel常见的插件
// 如何把普通函数转化成箭头函数 babel @babel/core  @babel/preset-env
// es6中的类 如果转化成es5 的类
// babel-import-plugin   tree-shaking