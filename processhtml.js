var fs=require('fs');
var fn=process.argv[2];
var content=fs.readFileSync(fn,'utf8');
var linebreak='!!!!';
content=content.replace(/\r\n/g,'\n').replace(/\r/g,'\n').replace(/\n/g,linebreak);
var replaces={

	"<a class='noteTag' href='#fn-(.+?)' .+?>.*?</a>" : '<link type="fn" n="$1"/>',
	"<dt><a .+?>(.+?)</a>.</dt>.+?<dd>(.+?)</dd>":
	'<note n="$1">$2</note>',
	"<!-- .*? -->":"",
	"<p><span class='sutta_ref'><a name='.+?>(.*?)\.</a></span>!!!!":'<p n="$1">'
}
var gcount=0;
for (var i in replaces) {
	gcount++;
	var regex=new RegExp(i,'g');
	console.log(i);
	content=content.replace(regex,replaces[i]);
}

content=content.replace(new RegExp(linebreak,'g'),'\n');
fs.writeFileSync(fn,content,'utf8');
console.log(gcount+' replaced');