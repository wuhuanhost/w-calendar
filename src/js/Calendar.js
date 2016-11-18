require('styles/main.scss');
import utils from './Utils';
class Calendar {
    // 构造方法
    constructor(str) {
        this.str = str;
        console.log('Calendar类初始化......' + this.str);
        this.render();
        //默认公历每月的天数，数组的第二个元素表示二月份的天数，因为平年和闰年二月的天数不一样，
        //所以初始化的时候默认为0，一会动态计算
        this.everyMonthDays = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        //动态计算每年二月份有多少天
        this.everyMonthDays[1] = this.getFebruaryDays(2016);
        this.weekStartDay = 0; //0表示周日，1表示周一，以此类推
        var weekday = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var index = this.getCurrentMonthFirstIsWeeked(2016, 11); //给定年月第一天是星期几
        console.log(weekday[index])
        this.currentYear = 2016;
        this.curentMonth = 11;
        var data = this.getCurrentDays(this.currentYear, this.curentMonth);
        console.log("+++++++++++")
        console.log(data)
        this.drawCalendarGrid(data);
    };
    /**下一月
     * [next description]
     * @return {Function} [description]
     */
    next(_this) {
        if (this.curentMonth >= 12) {
            this.currentYear++;
            this.curentMonth=0;
        }
        var next = parseInt(_this.getAttribute("data"));
        var data = this.getCurrentDays(this.currentYear, ++this.curentMonth);
        _this.setAttribute("data", next);
        this.drawCalendarGrid(data);
    };

    /**
     * 上一月
     * @return {[type]} [description]
     */
    prev(_this) {
        if (this.curentMonth <= 1) {
            this.currentYear--;
            this.curentMonth=13;
        }
        var prev = parseInt(_this.getAttribute("data"));
        var data = this.getCurrentDays(this.currentYear, --this.curentMonth);
        _this.setAttribute("data", prev);
        this.drawCalendarGrid(data);
    };

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
                    if (day <= this.everyMonthDays[month - 1]) {
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
    };

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
    };

    /**
     * 给定一个月份,返回本月显示的上月的天数数组
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description]
     * @return {[type]}       [description]
     */
    getLastMonthDays(year, month) {
        //一月的上一月其实就是上一年的12月
        var lastMonthDays = [];
        if (month == 1) {
            lastMonthDays = 31;
        } else {
            lastMonthDays = this.everyMonthDays[month - 2];
        }
        //上月应该显示几天
        var days = this.getCurrentMonthFirstIsWeeked(year, month) - this.weekStartDay;
        console.log(days + "-------------------------" + this.getCurrentMonthFirstIsWeeked(year, month) + "       " + this.weekStartDay);
        if (days === 0) {
            return [];
        }
        return this.getDaysArrar(year, month - 1, "last").slice(-days);
    };

    /**
     * 给定年月获取当月的天数的数组
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description]
     * @return {[type]}       [description]
     */
    getCurrentDays(year, month) {
        document.querySelector("h1").innerHTML = year + "年" + month + "月";
        var lastMonthArr = this.getLastMonthDays(year, month);
        var currentMonthArr = this.getDaysArrar(year, month, "current");
        currentMonthArr = lastMonthArr.concat(currentMonthArr);
        var nextMonthArr = this.genArr((42 - currentMonthArr.length), "next");

        currentMonthArr = currentMonthArr.concat(nextMonthArr);

        return currentMonthArr;
    }

    /**
     * 给定数组长度生成数组
     * @param  {[type]} count [description]
     * @param  {[type]} flag  [description]
     * @return {[type]}       [description]
     */
    genArr(days, flag) {
        var monthDays = [];
        for (var i = 0; i < days; i++) {
            var day = { flag: flag, num: i + 1 };
            monthDays.push(day);
        }
        return monthDays;
    };

    /**
     * 给定指定年月的天数数组
     * @param  {[type]} year  [description]
     * @param  {[type]} month [description]
     * @return {[type]}       [description]
     */
    getDaysArrar(year, month, flag) {
        //二月份的天数需要动态计算
        var days = 0;
        if (month === 2) {
            days = this.getFebruaryDays(year);
        } else {
            days = this.everyMonthDays[month - 1];
        }
        return this.genArr(days, flag);
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
    };

    // 渲染方法
    render() {
        var _this = this;
        var h1 = document.createElement('h1');
        document.querySelector("#app").appendChild(h1);
        var prev = document.createElement("button");
        prev.innerText = "上月";
        prev.setAttribute("data", 11);
        prev.setAttribute("id", "prev");
        prev.addEventListener('click', function() {
            _this.prev(this);
        });
        var next = document.createElement("button");
        next.innerText = "下月";
        next.setAttribute("data", 11);
        next.setAttribute("id", "next");
        next.addEventListener('click', function() {
            _this.next(this);
        });
        document.querySelector("#app").appendChild(prev);
        document.querySelector("#app").appendChild(next);
    };

    // 绘制日历的格子
    drawCalendarGrid(data) {
        document.querySelector("#calendar").innerHTML = "";
        var arr = utils.arr2arr(data, 7); //每月的日历数据

        var gridContent = document.createElement('div');
        var weekday = ["日", "一", "二", "三", "四", "五", "六"];
        for (var k = 0; k < weekday.length; k++) {
            var grid = document.createElement('div');
            grid.setAttribute('style', 'position:absolute;left:' + 39 * k + 'px;margin-top:-39px;font-weight:bold;');
            grid.setAttribute('class', 'grid');
            grid.innerText = weekday[k];
            gridContent.appendChild(grid);
        }

        gridContent.setAttribute('class', 'gridContent')
        for (var i = 0, len1 = arr.length; i < len1; i++) {
            for (var j = 0, len2 = arr[i].length; j < len2; j++) {
                var grid = document.createElement('div');
                grid.setAttribute('class', 'grid ' + arr[i][j].flag + '');
                grid.setAttribute('style', 'position:absolute;left:' + 39 * j + 'px;top:' + 39 * i + 'px')
                grid.innerText = arr[i][j].num;
                gridContent.appendChild(grid);
            }
        }
        document.querySelector("#calendar").appendChild(gridContent);

    }
}

export default Calendar;
