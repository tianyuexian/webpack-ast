let code = `
import React,{Component} from 'react';
  import _,{flatten,join} from 'lodash-es';
`

//  import _ from 'lodash';
// 结果 import flatten from 'lodash/lib/button'
// 结果 import join from 'lodash/lib/join'

let babel = require('@babel/core');
let t = require('@babel/types'); 
let importPlugin = {
  visitor:{ 
    ImportDeclaration(path,state){ // opts={state:{}}
      let node = path.node;
      let specifiers = node.specifiers;
      // 如果不是默认导出 我在去操作
      if (state.opts.libraryName === node.source.value){
        if (!(specifiers.length === 1 && t.isImportDefaultSpecifier(specifiers[0]))) {
          let obj = specifiers.map(specifier => {
            // 如果当前已经是默认导出 就不要在替换 否则会死循环
            if (!t.isImportDefaultSpecifier(specifier)) {
              // 如果是 {} 这种方式的话 变成默认导出
              return t.importDeclaration([t.importDefaultSpecifier(specifier.local)], t.stringLiteral(`${node.source.value}/lib/${specifier.local.name}`))
            } else {
              // 是默认导出 import _ from 'lodash'
              return t.importDeclaration([t.importDefaultSpecifier(specifier.local)], t.stringLiteral(node.source.value));
            }
          });
          path.replaceWithMultiple(obj);
        }
      }
    }
  }
}
let r = babel.transform(code,{
  plugins:[
    [importPlugin,{libraryName:'lodash'}]
  ]
});
console.log(r.code);

// ast @babel/core => babylone => 把我们的语法转化成ast树
// @babel/core.transfrom 默认会自动调用 babel-traverse visitor
// babel-generator 生成最后的结果

// webpack tapable => async (串行 并行) sync   (异步流程)

// 手写webpack 
// loader 
// plugin
// 中间件 源码  路由源码
