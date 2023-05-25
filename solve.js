/* solve Javascript Library */
/* Powered by Xbodw. */

var solve = new Object();
var chatdata = { "apiKey" : "Press Keys To Here.", };
var chatmessages = [];
solve.chatOutput = '';
solve.Addscript = function(url,insertposition) {
  var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src',url);
	document.getElementsByTagName(insertposition)[0].appendChild(script);
     }
solve.EscapeHTML = function(html) {
  let text = document.createTextNode(html);
    let div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
}
solve.CheckHTML = function(str) {
    let pattern = /<\s*\/?\s*[a-z]+(?:\s+[a-z]+=(?:"[^"]*"|'[^']*'))*\s*\/?\s*>/i;
    return pattern.test(str);
  }

solve.addResponseMessage = function(message,outvalue) {
    let escapedMessage = message;
    solve.chatOutput = escapedMessage;
  }

solve.sendRequest = async function(data,ele,link) {
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + data.apiKey,
        'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT10.0; Trident/5.0)',
      },
      body: JSON.stringify({
        "messages": data.prompt,
        "model": "gpt-3.5-turbo",
        "max_tokens": 2048,
        "temperature": 0.5,
        "top_p": 1,
        "n": 1,
        "stream": true
      })
    }); 
    const reader = response.body.getReader();
    let res;
    let str = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      res = new TextDecoder().decode(value).replace(/^data: /gm, '').replace("[DONE]",'');
      const lines = res.trim().split(/[\n]+(?=\{)/);
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const jsonObj = JSON.parse(line);
        if (jsonObj.choices && jsonObj.choices[0].delta.content) {
          str += jsonObj.choices[0].delta.content;
          await solve.addResponseMessage(str,ele);
        }else{
          if(jsonObj.error){
            console.error(jsonObj.error.type + " : " + jsonObj.error.message);
          }
        } 
      }
      if(document.querySelector('code') != null) {
      }
    }
    return str;
  }

solve.ReponseChatAI = async function(text,key,connecttype,outele) {
 let link = '';
if(connecttype == "http-nokey") {
  link = 'http://152.32.207.62/v1/chat/completions';
} else { link = 'https://open.aiproxy.xyz/v1/chat/completions'; }
 chatmessages.push({"role": "user", "content": text})
 chatdata.prompt = chatmessages;
    await solve.sendRequest(chatdata,outele,link).then((res) => {chatmessages.push({"role": "assistant", "content": res})});
}

