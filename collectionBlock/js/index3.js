
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
    collections:{
        '基础概念':{
            '精通比特币-by Andreas M Antonopoulos':'https://book.8btc.com/books/1/master_bitcoin/_book/jian_suo.html',
            '什么是哈希':'https://www.bilibili.com/video/av34660129',
            '公钥、私钥、地址到底是什么？':'https://www.jianshu.com/p/61493dbe7cc3',
            '数字签名':'https://www.bilibili.com/video/av34660283/?spm_id_from=333.788.videocard.2',
            'ECC椭圆曲线密码学':'https://b23.tv/av34660558',
            'Merkle Tree':'https://b23.tv/av34660495',
            'pow和pos的思考':'https://talk.nervos.org/t/nervos-pow/1639',
            '币天销毁是什么鬼':'https://www.jianshu.com/p/2d6327648500',
            '什么是比特币天销毁“bitcoin days destroyed”？':'https://vimsky.com/article/3806.html',
        },
        '安全保管':{
            '《囤比特币：手握私钥的快感》':'https://weibo.com/ttarticle/p/show?id=2309404289198575222102',
            '《囤比特币：如何管理私钥？》':'https://weibo.com/ttarticle/p/show?id=2309404289950832033282',
            '比特币存储的几种方式':'https://github.com/mask2012/MaskCryptoCurrency/issues/9',
            '当我忘记私钥压缩包密码之后……':'https://www.8btc.com/article/295161',
            '比太钱包访谈':'https://www.8btc.com/article/54114',
            '多重签名的现状':'http://www.528btc.com/college/40073.html',
        },
        '价值探讨':{
            '《比特币到底价值何在？》':'https://www.bilibili.com/video/av52521260',
            '九神写的基本价格模型':'https://weibo.com/ttarticle/p/show?id=2309404290588110395875&mod=zwenzhang',
            '比特币有了定价模型?<br>过去四年94%的价格波动有了解释':'https://www.coingogo.com/news/3620',
            '百万美元的比特币，7年后见！':'https://media.weibo.cn/article?id=2309404267111345162521&sudaref=github.com&display=0&retcode=6102',
            '正本清源，深入讨论为什么比特币(BTC)<br>是有史以来最伟大的加密货币':'https://weibo.com/ttarticle/p/show?id=2309404378127815036019',
            'nvm-ratio':'https://medium.com/cryptolab/network-value-to-metcalfe-nvm-ratio-fd59ca3add76',
            'thomas lee的视频采访<br>就是他用用户数和交易量通过metcalfe模型<br>拟合出btc价格完美匹配':'https://www.businessinsider.com/bitcoin-price-how-to-value-fundstrat-tom-lee-2017-10?r=US&IR=T',
        },
        '关于扩容':{
            '区块链可扩展性的那些技术：<br>侧链、分片、DAG ，子链！':'https://blog.csdn.net/tiandiwuya/article/details/80289380',
            '比特币的闪电网络':'https://github.com/mask2012/MaskCryptoCurrency/issues/14',
            '这项技术将带领比特币走向爆发（完结篇）':'https://zhuanlan.zhihu.com/p/34681487',
            '《闪电网络现状：2019年闪电网络应用之路》':'http://www.qukuaiwang.com.cn/news/15095.html',
            '总共有多少channel通道，总共抵押了多少btc':'https://p2sh.info/dashboard/db/lightning-network?orgId=1&from=1544031849207&to=1575567849208',
            'bitcoinvisuals做的light network图表，更细节':'https://bitcoinvisuals.com/lightning',
        },
        '我粉的人':{
            'ahr999 九神':'https://weibo.com/ttarticle/p/show?id=2309404283412763544904',
            '可爱在香港':'https://weibo.com/u/6487144397?profile_ftype=1&is_article=1#_0',
            '比特币观链哥':'https://weibo.com/sixiangdabaike?profile_ftype=1&is_article=1#_0',
            'happyPeter':'https://space.bilibili.com/357799727/video',
            '何生生的视频':'https://www.weibo.com/u/2393473121?profile_ftype=1&is_video=1#_0',
            '胡翌霖':'https://www.8btc.com/author/48',
            'Thomas Lee(需翻墙)':'https://twitter.com/fundstrat',
            'Jeffrey Wernick(需翻墙)':'https://www.youtube.com/results?search_query=Jeffrey+Wernick',
            'Andreas M. Antonopoulos(需翻墙)':'https://www.youtube.com/results?search_query=Andreas+M.+Antonopoulos',
        },
        '反面与缺陷':{
            '比特币的反面':'https://github.com/mask2012/MaskCryptoCurrency/issues/10',
            '区块链与状态爆炸':'https://talk.nervos.org/t/topic/1515',
            '《你真的理解区块链状态爆炸吗？》':'https://www.bilibili.com/video/av49675166/?spm_id_from=333.788.b_7265636f5f6c697374.17%29',
        },
        '关于分叉':{
            '三国争霸： 一文道尽BTC，BCH，BSV到底在争什么?':'https://www.youtube.com/watch?v=JXc8zO3g37s'
        },
        '图表-基本图表':{
            'coinmarketcap top 1000市值排行':'https://coinmarketcap.com/',
            '实时btc最新价':'https://tradeblock.com/markets/indices/',
            '前10名市值占比比例':'https://coinmarketcap.com/charts/',
            '全球交易所综合排行榜':'https://www.feixiaohao.com/exchange/',
            'btc全球交易所深度':'http://data.bitcoinity.org/markets/books/USD',
            '方块图展示币种占比':'https://coin360.com/',
            'bitcoin explorer':'https://bitinfocharts.com/zh/bitcoin/explorer/',
            '各币种算力对比':'https://bitinfocharts.com/zh/comparison/hashrate-btc-ltc-bch.html',
        },
        '图表-长期跟踪':{
            '币龄分布图 <br>叠加了btc价格，可单独查看某条线':'http://charts.woobull.com/bitcoin-hodl-waves/',
            'bdd指数（Bitcoin Days Destroy）':'https://oxt.me/charts',
            'btc活跃地址数':'https://bitinfocharts.com/zh/comparison/activeaddresses-btc.html',
        },
        'Nervos我很看好':{
            '对话Nervos团队':'https://xcong.com/articles/3377360',
            'Nervos精华帖传送门':'https://talk.nervos.org/t/ckb/1475',
            '对话 Nervos：加密经济系统就像国家财政，它才是公链战争的胜负手':'https://mp.weixin.qq.com/s/xVdSc7xkiL_jb-GUxNwmBg',
            'Nervos笔记':'https://github.com/mask2012/MaskCryptoCurrency/issues/12',
            'Nervos 社区书':'https://nervosbook.github.io/book/zh'
        },
        '其他币种观察':{
            '“隐私币”出路何在？':'https://www.fengli.com/news/23367482.html',
            'Horizen特性总结':'https://github.com/mask2012/MaskCryptoCurrency/issues/4',
            'IOTA特性总结':'https://github.com/mask2012/MaskCryptoCurrency/issues/1'
        }
    },

    init:function(){
        this.writeDom();
        this.addEvent();

        // subscribe to load and resize events
        window.addEventListener('load', onLoad);
        window.addEventListener('resize', onResize);


    },
    writeDom:function(){
        for (var i in this.collections) {
            console.log('i',i);
            console.log('collections[i]',this.collections[i]);
            for (var j in this.collections[i]) {
                console.log('j',j);
                console.log('this.collections[i][j]',this.collections[i][j]);
            }
        }

        var compiledHTML = $.compiler($("#listTemplate").html(), { data: this.collections});
        $('#masonry').html(compiledHTML);
    },
    addEvent:function(){
        var that=this;
        $('#btnCalculate').on('click',function(){
            
        });

       
    },
    
}

collectionBlock.init();




var minColWidth = 340;
var roots;

function onLoad() {
    var rootElements = document.getElementsByClassName('masonry-root');
    roots = Array.prototype.map.call(rootElements, function (rootElement) {
        var cellElements = rootElement.getElementsByClassName('masonry-cell');
        var cells = Array.prototype.map.call(cellElements, function (cellElement) {
            var style = getComputedStyle(cellElement);
            return {
                'element': cellElement,
                'outerHeight': parseInt(style.marginTop) + cellElement.offsetHeight + parseInt(style.marginBottom)
            };
        });
        return {
            'element': rootElement,
            'noOfColumns': 0,
            'cells': cells
        };
    });

        console.log(roots);

    // do the first layout
    onResize();
    

}

function onResize() {
    for (let root of roots) {
        
        // console.log(roots);

        // only layout when the number of columns has changed
        var newNoOfColumns = Math.floor(root.element.offsetWidth / minColWidth);
        if (newNoOfColumns != root.noOfColumns) {

            // initialize
            root.noOfColumns = newNoOfColumns;
            var columns = Array.from(new Array(root.noOfColumns)).map(function (column) {
                return {
                    'cells': new Array(),
                    'outerHeight': 0
                };
            });

            // divide...
            for (let cell of root.cells) {
                var minOuterHeight = Math.min(...columns.map(function (column) {
                    return column.outerHeight;
                }));
                var column = columns.find(function (column) {
                    return column.outerHeight == minOuterHeight;
                });
                column.cells.push(cell);
                column.outerHeight += cell.outerHeight;
            }

            // calculate masonry height
            var masonryHeight = Math.max(...columns.map(function (column) {
                return column.outerHeight;
            }));

            // ...and conquer
            var order = 0;
            for (let column of columns) {
                for (let cell of column.cells) {
                    cell.element.style.order = order++;
                    // set the cell's flex-basis to 0
                    cell.element.style.flexBasis = 0;
                }
                // set flex-basis of the last cell to fill the
                // leftover space at the bottom of the column
                // to prevent the first cell of the next column
                // to be rendered at the bottom of this column
                column.cells[column.cells.length - 1].element.style.flexBasis = column.cells[column.cells.length - 1].element
                    .offsetHeight + masonryHeight - column.outerHeight - 1 + 'px';
            }

            // set the masonry height to trigger
            // re-rendering of all cells over columns
            // one pixel more than the tallest column
            root.element.style.maxHeight = masonryHeight + 100 + 'px';

            console.log(columns.map(function (column) {
                return column.outerHeight;
            }));
            console.log(root.element.style.maxHeight);
        }
    }
}

