const importJson = String.raw`{{ site.data.tools | jsonify }}`;
importJson.replace("\\","\\\\");
const tools = JSON.parse(importJson);
console.log(tools);
