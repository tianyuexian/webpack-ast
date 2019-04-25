# 1.抽象语法树(Abstract Syntax Tree)
webpack和Lint等很多的工具和库的核心都是通过Abstract Syntax Tree抽象语法树这个概念来实现对代码的检查、分析等操作的。通过了解抽象语法树这个概念，你也可以随手编写类似的工具
# 2.抽象语法树用途
  1、代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等
  
    如JSLint、JSHint对代码错误或风格的检查，发现一些潜在的错误
    IDE的错误提示、格式化、高亮、自动补全等等
    
  2、代码混淆压缩
  
    UglifyJS2等
    优化变更代码，改变代码结构使达到想要的结构
    
  3、代码打包工具webpack、rollup等等
  
    CommonJS、AMD、CMD、UMD等代码规范之间的转化
    CoffeeScript、TypeScript、JSX等转化为原生Javascript
    
# 3.抽象语法树定义
这些工具的原理都是通过JavaScript Parser把代码转化为一颗抽象语法树（AST），这颗树定义了代码的结构，通过操纵这颗树，我们可以精准的定位到声明语句、赋值语句、运算语句等等，实现对代码的分析、优化、变更等操作

    在计算机科学中，抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。
    Javascript的语法是为了给开发者更好的编程而设计的，但是不适合程序的理解。所以需要转化为AST来更适合程序分析，浏览器编译器一般会把源码转化为AST来进行进一步的分析等其他操作。
![image](https://github.com/tianyuexian/webpack-ast/blob/master/ast.jpg)
# 4.JavaScript Parser
    JavaScript Parser，把js源码转化为抽象语法树的解析器。
    浏览器会把js源码通过解析器转为抽象语法树，再进一步转化为字节码或直接生成机器码。
    一般来说每个js引擎都会有自己的抽象语法树格式，Chrome的v8引擎，firefox的SpiderMonkey引擎等等，MDN提供了详细SpiderMonkey AST format的详细说明，算是业界的标准。
## 4.1 常用的JavaScript Parser有：
esprima traceur acorn shift
# 4.2 esprima
    通过 esprima 把源码转化为AST
    通过 estraverse 遍历并更新AST
    通过 escodegen 将AST重新生成源码
    astexplorer
```
cnpm i esprima estraverse escodegen- S
```
```
let esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require("escodegen");
let code = 'function ast(){}';
let ast=esprima.parse(code);
let indent=0;
function pad() {
    return ' '.repeat(indent);
}
estraverse.traverse(ast,{
    enter(node) {
        console.log(pad()+node.type);
        if(node.type == 'FunctionDeclaration'){
            node.id.name = 'ast_rename';
        }
        indent+=2;
     },
    leave(node) {
        indent-=2;
        console.log(pad()+node.type);

     }
 });
let generated = escodegen.generate(ast);
console.log(generated);
```
```
Program
  FunctionDeclaration
    Identifier
    Identifier
    BlockStatement
    BlockStatement
  FunctionDeclaration
Program
```
# 5. 转换箭头函数
    访问者模式Visitor 对于某个对象或者一组对象，不同的访问者，产生的结果不同，执行操作也不同
    @babel/core
    babel-types
    babel-types-api
    Babel 插件手册
    babeljs.io
    babel-plugin-transform-es2015-arrow-functions
转换前
```
const sum = (a,b)=>a+b
```

