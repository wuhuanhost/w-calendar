require('styles/main.scss');
class Calendar {
    // 构造方法

    constructor(str) {
        this.str = str;
        console.log('Calendar类初始化......' + this.str);
        this.render();
        //默认公历每月的天数，因为平年和闰年，二月的天数不一样，
        //所以初始化的时候默认为0，一会动态计算
        this.everyMouthDays = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.everyMouthDays[1] = this.getFebruaryDays(2016);
        var weekday = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var index = this.getCurrentMonthFirstIsWeeked(2016, 9);
        console.log(weekday[index])
        var data = this.getMonthData(2016, 9);
        this.drawCalendarGrid(data);
    };
    /**上一月
     * [next description]
     * @return {Function} [description]
     */
    next(_this) {
            var next = parseInt(_this.getAttribute("data"));
            var data = this.getMonthData(2016, ++next);
            _this.setAttribute("data", next);
            this.drawCalendarGrid(data);
        }

        /**
         * 下一月
         * @return {[type]} [description]
         */
    prev(_this) {
        var prev = parseInt(_this.getAttribute("data"));
        var data = this.getMonthData(2016, --prev);
        _this.setAttribute("data", prev);
        this.drawCalendarGrid(data);
    }

    /**
     * 给定年份和月份，获取指定年月的渲染数据
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description]
     * @return {[type]}       [description]
     */
    getMonthData(year, month) {
        var index = this.getCurrentMonthFirstIsWeeked(year, month);
        var arr = [
            ["天", "一", "二", "三", "四", "五", "六"]
        ];
        var day = 1;
        for (var i = 0; i < 6; i++) {
            var week = [];
            for (var j = 0; j < 7; j++) {
                if (i === 0) { //第一周
                    if (j >= index) {
                        week.push(day++);
                    } else {
                        week.push("");
                    }
                } else {
                    console.log(i + " " + j)
                    if (day <= this.everyMouthDays[month - 1]) {
                        week.push(day++);
                    } else {
                        week.push("");
                    }
                }
            }
            arr.push(week);
        }
        console.log("++++++++++++++=")
        return arr;
    }

    /**
     * 给定一个年份和月份，返回给定年月第一天是星期几
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description]
     * @return {[type]}       [description]
     */
    getCurrentMonthFirstIsWeeked(year, month) {
        var date = new Date(year, month - 1, "1", "00", "00", "00");
        console.log(date.getFullYear() + "  " + (date.getMonth() + 1) + "  " + date.getDate() + "  " + date.getDay())
        var index = parseInt(date.getDay());
        return index;

    }

    /**
     * 给定一个年份，返回此年份二月的天数
     * @param  {[type]} year [description]
     * @return {[type]}      [description]
     */
    getFebruaryDays(year) {
        //平年的二月有28天
        //闰年的二月有29天，（年份是100的整数倍、能被400整除或者年份不是100的整数倍能被4整除）
        return (year % 100 === 0) ? (year % 400 === 0 ? 29 : 28) : (year % 4 === 0 ? 29 : 28);
    }

    // 渲染方法
    render() {
        var _this = this;
        var h1 = document.createElement('h1');
        h1.innerHTML = this.str + this.getFebruaryDays(2016);
        document.body.appendChild(h1);
        var prev = document.createElement("button");
        prev.innerText = "上月";
        prev.setAttribute("data", 9);
        prev.setAttribute("id", "prev");
        prev.addEventListener('click', function() {
            _this.prev(this);
        });
        var next = document.createElement("button");
        next.innerText = "下月";
        next.setAttribute("data", 9);
        next.setAttribute("id", "next");
        next.addEventListener('click', function() {
            _this.next(this);
        });
        document.body.appendChild(prev);
        document.body.appendChild(next);
    };

    // 绘制日历的格子
    drawCalendarGrid(data) {
        var arr = data || [
            [1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19, 20, 21],
            [22, 23, 24, 25, 26, 27, 28],
            [29, 30, 0, 0, 0, 0, 0]
        ];
        var gridContent = document.createElement('div');
        gridContent.setAttribute('class', 'gridContent')
        for (var i = 0, len1 = arr.length; i < len1; i++) {
            for (var j = 0, len2 = arr[i].length; j < len2; j++) {
                var grid = document.createElement('div');
                grid.setAttribute('class', 'grid');
                grid.setAttribute('style', 'position:absolute;left:' + 99 * j + 'px;top:' + 99 * i + 'px')
                grid.innerText = arr[i][j];
                gridContent.appendChild(grid);
            }
        }
        document.body.appendChild(gridContent);
    }
}

export default Calendar;
