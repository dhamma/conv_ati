var set=process.argv[2]||'bpit';
var folder='trans_'+set;

var titles={"bpit":"Thanissaro"}

var descs={"bpit":"Thanissaro Translation from Burma Piṭaka Association"};

console.log(require('yase').build({
	dbid:folder,
	slotshift:9,
	loglevel:2,
	linkto:'vrimul',
	title: titles[set],
	desc: descs[set],
	groupunit:['p','p[n]'],
	schema:function() {
		this.toctag(["nikaya","book"]).attr("book","id",{"depth":1,"saveval":true,"unique":true})
			.pagebreak("pb").attr("pb","n",{"depth":2,"saveval":true})
		  .toctag("readunit").attr("readunit","id",{"depth":1,"saveval":true,"unique":true})
		  .emptytag("pgroup").attr("pgroup","id",{"depth":1,"saveval":true,"unique":true})
		  .paragraph("p").attr("p","n",{"depth":1,"sparseval":true,"range":"-"})
		if (set=='mul') {
		    this.attr("p","sid", //secondary reference number, SN = sutta no. , DN= section no.
		    	{"depth":2,"sparseval":true,"unique":true,
		    	  "prefix":"pgroup[id]","range":"-"})
		}
	},
	input:folder+'/'+folder+'.lst',
	output:'../cst/'+folder+'.ydb',
	author:'yapcheahshen@gmail.com',
	url:'http://www.ksana.tw',
	version:'0.0.1',
	outputencoding:'utf8',
	//maxfile:1,
	customfunc:require('../cst/js/tipitakacustom.js')
	
}));