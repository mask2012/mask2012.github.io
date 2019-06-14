
$.extend($, {
    //jq模板
    compiler: function(str, data) {
        var compiler = arguments.callee;
        //如果参数str全部为组词字符
        //console.log /^\w*$/.test(str), "xxx"
        var fn;
        if (/^\w*$/.test(str)) {
            fn = !compiler[str] && (compiler[str] = compiler(document.getElementById(str).innerHTML));
        } else {
            fn = new Function("obj", "var p=[];with(obj){p.push('" +
                str.replace(/[\r\t\n]/g, " ")
                .split("<@").join("\t")
                .replace(/((^|@>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)@>/g, "',$1,'")
                .split("\t").join("');")
                .split("@>").join("p.push('")
                .split("\r").join("\\'") + "');}return p.join('');");
        }
        return data ? fn(data) : fn;
    }
});



var collectionBlock={

    init:function(){
        this.addEvent();
    },
    addEvent:function(){
        var that=this;
        $('#btnCalculate').on('click',function(){
            
        });

       
    },
    
}

collectionBlock.init();


