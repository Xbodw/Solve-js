# Solve-js
Solvejs是一个帮助用户零基础获取ChatGPT返回信息的一个轻量级Javascript脚本,无需使用更多代码,只需要一句即可返回消息:
```javascript
solve.ReponseChatAI('Hello',null,"http-nokey");
```
该函数会向ChatGPT发送请求,从而得到我们想得到的答案.
那么,```ChatGPT```的输出在哪里呢？
```javascript
solve.chatOutput
```
这是一个变量,在您使用ReponseChatAI函数后会根据输出的内容自动进行更新.我们只需要一个实时将变量的内容输出到html上的脚本就行了.
```javascript
document.body.innerText = solve.chatOutput;
```

AI输出的内容会被浏览器强制渲染,我们该如何是好?
其实我们已经写过对应的函数了,这个函数就是```CheckHTML```和```EscapeHTML```
这两个函数是什么意思呢？
我们获取到输出内容后,先给他测试一下是否包含html标签:
```javascript
if(CheckHTML(solve.chatOutput)) 
