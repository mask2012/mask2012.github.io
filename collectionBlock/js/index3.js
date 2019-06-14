
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
        // this.setHeight();
        this.addEvent();
        // window.onLoad();
    },
    setHeight:function(){
        var items=$('.item').length;
        $('#masonry').height(items*40);
    },
    addEvent:function(){
        var that=this;
        $('#btnCalculate').on('click',function(){
            
        });

       
    },
    
}

collectionBlock.init();




var minColWidth = 240;
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
            root.element.style.maxHeight = masonryHeight + 1 + 'px';

            console.log(columns.map(function (column) {
                return column.outerHeight;
            }));
            console.log(root.element.style.maxHeight);
        }
    }
}

// subscribe to load and resize events
window.addEventListener('load', onLoad);
window.addEventListener('resize', onResize);