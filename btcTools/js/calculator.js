
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



var cal={
    nowNodeNum:0,
    monthNum:0,
    restZen:0,
    isFirstTime:true,

    init:function(){
        this.addEvent();
        $('#btnCalculate').trigger('click');
    },
    addEvent:function(){
        var that=this;
        $('#btnCalculate').on('click',function(){
            that.nowNodeNum=$('#nodeNum').val()*1;      //初始投资多少个节点
            that.restAMonthA=$('#restAMonthA').val()*30; //收益起始 比较大
            that.restAMonthB=$('#restAMonthB').val()*30; //收益结束 比较小
            that.monthNum=$('#monthNum').val()*1;       //总共多少期
            var resultData=that.getResultData();

            $('#monthNumTxt').html($('#monthNum').val());
            $('#nodeNumTxt').html($('#nodeNum').val());
            $('#restAMonthATxt').html($('#restAMonthA').val());
            $('#restAMonthBTxt').html($('#restAMonthB').val());
        });

        $('#monthNum,#nodeNum,#restAMonthA,#restAMonthB').on('input',function(){
            $('#btnCalculate').trigger('click');
        });
    },
    getResultData:function(){
        var resultData=[];
        var tempInfo;
        var restArr=this.getRestArr();
        var nowRest;
        for (var i = 1; i < this.monthNum; i++) {
            nowRest=restArr[i-1];
            tempInfo=this.getInfo(nowRest);
            resultData.push({
                name:i,
                nodeNum:tempInfo.nodeNum,
                rest:tempInfo.rest.toFixed(2),
                intest:nowRest
            })
        }
        var compiledHTML = $.compiler($("#listTemplate").html(), { data: resultData });
        $('#resultList').html(compiledHTML);

        this.gotoDraw(resultData);
    },
    getRestArr:function(){
        var gap=(this.restAMonthA-this.restAMonthB)/(this.monthNum-1);
        var resultArr=[];
        for (var i = 0; i < this.monthNum; i++) {
            resultArr.push((this.restAMonthA-gap*i).toFixed(3));
        }
        return resultArr;
    },
    getInfo:function(nowRest){
        var monthRest=this.nowNodeNum*nowRest;   //得到当期的收益
        var previousNodeNum=this.nowNodeNum;
        var added=Math.floor(monthRest/42);                //当期收益可以新加几个节点
        var rest=monthRest%42;                         //加完节点后剩余个数
        this.restZen+=rest;                            //历史累计剩余数
        if(this.restZen>=42){
            added+=Math.floor(this.restZen/42);
            this.restZen=this.restZen%42;
        }
        this.nowNodeNum+=added;
        return {
            nodeNum:previousNodeNum,
            rest:this.restZen
        };
    },


    gotoDraw:function(data){
        var chartData=[];
        for (var i = 0; i < data.length; i++) {
            chartData.push({
                name:data[i].name,
                lineValue1:data[i].nodeNum,
                lineValue2:data[i].intest
            })
        }
        // console.log('chartData',chartData);

        d3Charts.drawTwoLines({
            id: 'restChart',
            data: chartData,
            width: $('#restChart').width(),
            ratio: 0.5
        });
    },

}
cal.init();


