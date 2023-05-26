# Solve-js
## 概述
Solvejs是一个帮助用户零基础获取ChatGPT返回信息的一个轻量级Javascript脚本,无需使用更多代码,只需要一句即可返回消息:

## 使用方法
```javascript
solve.ReponseChatAI('Hello',null,"http-nokey");
```
该函数会向ChatGPT发送请求,从而得到我们想得到的答案.
那么,```ChatGPT```的输出在哪里呢？
```javascript
solve.chatOutput
```
这是一个变量,在您使用ReponseChatAI函数后会根据输出的内容自动进行更新.我们只需要一个实时将变量的内容输出到html上的脚本就行了.以下是一段示例代码:
```javascript
document.body.innerText = solve.chatOutput;
```
## 其他问题
AI输出的内容会被浏览器强制渲染,我们该如何是好?
其实我们已经写过对应的函数了,这个函数就是```CheckHTML```和```EscapeHTML```
这两个函数是什么意思呢？
我们获取到输出内容后,先给他测试一下是否包含html标签:
```javascript
let escapedhtml;
if(solve.CheckHTML(solve.chatOutput)) {
  escapedhtml = solve.EscapeHTML(solve.chatOutput);
  } else { escapedhtml = solve.chatOutput; }
  $('.chatwindow').innerText = escapedhtml;
  ```
另外,Solve-s提供了两种ChatGPT请求方式:
1.http请求,适合本地使用或开发app、http网站(https使用会报错),不需要```APIKey```
2.https请求,适合本地使用或开发app、http、https网站,需要提供```API key```

## 请求方式
要使用http请求,可以使用这个:
```javascript
solve.ReponseChatAI('Hello',null,"http-nokey");
```
;要使用https请求,我们需要这样做:
```javascript
solve.ReponseChatAI('Hello',"key","https");
```

最后,您就可以完美的使用Solve.js快速搭建属于您的基于ChatGPT API的聊天聊天机器人了
