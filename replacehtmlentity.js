var fs=require('fs');
var fn=process.argv[2];
var content=fs.readFileSync(fn,'utf8');

var match=null;
var regentity=/&#(.+?);/g;
var replaces={};
var replacecount=0;
//find all entities
while (match=regentity.exec(content)) {
	replacecount++;
	replaces[match[0]]=String.fromCharCode(parseInt(match[1],10)) ;
}

for (var i in replaces) {
	var regex=new RegExp(i,'g');
	content=content.replace(regex,replaces[i]);
}

fs.writeFileSync(fn,content,'utf8');
console.log(replacecount+' entities replaced');