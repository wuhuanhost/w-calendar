require('styles/main.scss');
class Calendar {
    // 构造方法
    constructor(str) {
        this.str = str;
        console.log('Calendar类初始化......' + this.str);
        this.render();
        this.drawCalendarGrid();
    };
    // 渲染方法
    render() {
        var h1 = document.createElement('h1');
        h1.innerHTML = this.str;
        document.body.appendChild(h1);
    };

    // 绘制日历的格子
    drawCalendarGrid(data) {
        var arr = data || [
            [1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19, 20, 21],
            [22, 23, 24, 25, 26, 27, 28],
            [29, 30]
        ];
        var gridContent = document.createElement('div');
        gridContent.setAttribute('class', 'gridContent')
        for (var i = 0, len1 = arr.length; i < len1; i++) {
            var lineGrid = document.createElement('div');
            lineGrid.setAttribute('class', 'lineGrid')
            for (var j = 0, len2 = arr[i].length; j < len2; j++) {
                var grid = document.createElement('div');
                grid.setAttribute('class', 'grid');
                grid.setAttribute('style','position:absolute;margin-left:'+59*j+'px;margin-top:1px')
                grid.innerText = arr[i][j];
                lineGrid.appendChild(grid);
            }
            gridContent.appendChild(lineGrid);
        }
        document.body.appendChild(gridContent);
    }

}


export default Calendar;
