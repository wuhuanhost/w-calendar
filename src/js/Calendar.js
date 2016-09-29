class Calendar {
	// 构造方法
    constructor(str) {
    	this.str=str;
        console.log("Calendar类初始化......"+this.str);
        this.render();
    };
    // 渲染方法
    render() {
        var h1 = document.createElement("h1");
        h1.innerHTML = this.str;
        document.body.appendChild(h1);
    };

}

export default Calendar;
