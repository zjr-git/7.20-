

function wheel(wins, opts, runOpts) {
    
    this.init(wins, opts, runOpts);

    
    this.getWin();

    
    this.createBox();

    
    this.createList();

    
    this.createBtn();

    
    this.autoRun();

    
    this.clickRun();
}

wheel.prototype = {

    init(wins, opts, runOpts) {
        this.opts = opts;
        this.runOpts = runOpts;
        var wins = document.querySelector(wins);
        if (!(wins && wins.nodeType == 1)) {
            console.error("窗口元素未获取到")
            return;
        }
        this.wins=this.wins=wins;
        opts.imgs.push(opts.imgs[0]);//在imgs里面复制一下第一张
        opts.links.push(opts.links[0]);
        opts.imgColor.push(opts.imgColor[0]);

        this.imgLength = opts.imgs.length;
        if (this.imgLength == 0) {
            console.error("轮播图没有图片");
            return;
        }
        this.imgSize = opts.imgSize;
        if (!(this.imgSize instanceof Array)) {
            console.error("请传入合法的尺寸类型");
        }
        if (this.imgSize.length == 0) {
            this.imgSize[0] = document.documentElement.clientWidth;
            this.imgSize[1] = 400;
        }
        if (this.imgSize.some(function (val) {
            return val == 0
        })) {
            for (var i = 0; i < 2; i++) {
                if (this.imgSize[i] = 0) {
                    this.imgSize[i] = 500;
                }
            }
        }
        this.btnColor = opts.btnColor || "green";
        this.btnActive = opts.btnActive || "red";
        this.btnPos = opts.btnPos || ["center", "20"]

        this.time = runOpts.time * 1000 || 5000;
        this.runStyle = null;
        if (runOpts.runStyle == "linner" || !(runOpts.runStyle)) {
            this.runStyle = Tween.Linear;
        } else if (runOpts.runStyle = "in") {
            this.runStyle = Tween.Quad.easeIn;
        } else if (runOpts.runStyle = "out") {
            this.runStyle = Tween.Quad.easeOut;
        }

    },

    getWin() {
        this.wins.style.cssText = "width:100%;height:" + this.imgSize[1] + "px;position: relative;";
    },

    createBox() {
        this.box = document.createElement("div");
        this.box.style.cssText = "width:" +this. imgLength * 100 + "%;height:100%;border:1px solid red;";
        this.wins.appendChild(this.box);
    },

    createList() {
        for (var i = 0; i < this.imgLength; i++) {
            var divList = document.createElement("div");
            divList.style.cssText = `float:left;width:${100 / this.imgLength}%;
            height:100%;background:${this.opts.imgColor[i]}`;

            var link = document.createElement("a");
            link.href = this.opts.links[i];
            link.style.cssText = "width:" + this.imgSize[0] + "px;height:" + this.imgSize[1] + "px;display:block;margin:auto;background:url(" + this.opts.imgs[i] + ") no-repeat 0 0"

            divList.appendChild(link);
            this.box.appendChild(divList);
        }
    },
    createBtn() {
        var btnBox = document.createElement("div")
        btnBox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:0" + this.btnPos[1] + "px";
        this.btns = [];
        for (var i = 0; i < this.imgLength - 1; i++) {
            // if (i == 0) {
            //     var bgcolor = btnActive;
            // } else {
            //     var bgcolor = btnColor;
            // }
            var bgcolor = i == 0 ? this.btnActive : this.btnColor;

            var btn = document.createElement("div")
            btn.style.cssText = "width:20px;height:20px;background:" + bgcolor + ";border-radius:50%;margin:0 10px;cursor:pointer;float:left";
            btnBox.appendChild(btn);
            this.btns.push(btn);

        }

        this.wins.appendChild(btnBox);
    },
    autoRun() {

        var winW = parseInt(getComputedStyle(this.wins, null).width);

        var num = 0;
        //运动函数
        function move() {
            //每次轮播都要加一
            num++;
            //当运动到最后一张的处理逻辑
            if (num > 2) {
                //当运动完最后一张，需要即时回到第一张
                animate(this.box, {
                    "margin-left": -num * winW
                }, 1000, this.runStyle, function () {
                    // num = 0;
                    this.box.style.marginLeft = 0;
                })
                //将位置再回拨到第一张
                num = 0;
            } else {
                //除了最后一张的运动方式
                animate(this.box, {
                    "margin-left": -num * winW
                }, 1000, this.runStyle)
            }

            //按钮随着轮播的变化而变化
            for (var i = 0; i < 3; i++) {
                this.btns[i].style.background = btnColor;
            }
            this.btns[num].style.background = btnActive;

        }

        //每隔3s运动一次
        var t = setInterval(move, this.time);
    },
    clickRun() {
        for (let i = 0; i < 3; i++) {
            //给每个按钮添加事件
            this.btns[i].onclick = function () {
                num = i;//将当前点击的按钮和轮播的值进行关联
                //点击的时候的运动方式
                animate(box, {
                    "margin-left": -num * winW
                }, 1000,runStyle)
    
                //按钮点击的时候的变化
                for (var j = 0; j < 3; j++) {
                    this.btns[j].style.background = btnColor;
                }
                this.btns[num].style.background = btnActive;
            }
        }
    
        // 鼠标的移入移出  事件里面最复杂的一个事件
        //鼠标移入的时候 停止轮播
       this. wins.onmouseover = function () {
            clearInterval(this.t);
        }
        //鼠标离开的时候 继续动画
        this.wins.onmouseout = function () {
            this.t = setInterval(this.move, 3000);
        }

    }

}