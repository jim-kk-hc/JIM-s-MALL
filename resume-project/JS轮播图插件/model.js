(function () {
    var log = console.log.bind(console)
    var Model = function (id) {
        this.bigBox = document.getElementById(id) //外层div
        this.innerBox = this.bigBox.getElementsByTagName('div')[0] //内层div
        this.imgNum = this.innerBox.getElementsByTagName('img') //获取img lengtg
        this.bigBoxWidth = parseInt(getComputedStyle(this.bigBox).width)
        this.bigBoxHeight = parseInt(getComputedStyle(this.bigBox).height)
        this.allLi = []
        this.pre = null
        this.next = null
        this.getStyle()
        this.speed = this.bigBoxWidth / 10

        this.index = 1

        // log(this.oli)
        this.time = null // 定时器
        this.pre.onclick = this.prePic.bind(this)
        this.next.onclick = this.nextPic.bind(this)
        this.bigBox.onmouseenter = this.enter.bind(this)
        this.bigBox.onmouseleave=this.leave.bind(this)
        this.autoPlay = setInterval(this.nextPic.bind(this), 1000)
    }
    //鼠标进入
    Model.prototype.enter = function () {
        this.next.style.display = 'block'
        this.pre.style.display = 'block'
        clearInterval(this.autoPlay)
        // this.autoPlay = null

    }
    //鼠标离开
    Model.prototype.leave= function () {
        this.next.style.display = 'none'
        this.pre.style.display = 'none'
        // clearInterval(this.autoPlay)
        this.autoPlay=null
		this.autoPlay = setInterval(this.nextPic.bind(this), 1000);

    }
    //轮播  next
    Model.prototype.nextPic = function () {

        clearInterval(this.time)
        if (this.index < this.imgNum.length) {

            this.time = setInterval(() => {
                if (parseInt(this.innerBox.style.left) > (-this.index * this.bigBoxWidth)) {
                    this.innerBox.style.left = parseInt(this.innerBox.style.left) - this.speed + 'px'
                } else {
                    clearInterval(this.time)
                    this.allLi[this.index - 1].style.backgroundColor = "#fff"
                    this.allLi[this.index].style.backgroundColor = '#333'
                    // _this.room.style.left = -_this.slideWidth * _this.imgIndex + 'px';
                    this.index++ //为什么this.index 加在这里是因为 setinterval是异步的
                    //你加在定时器外面 index就先变了 导致里面的idnex不一致


                }

            }, 16.7)

        } else {
            this.time = setInterval(() => {
                if (parseInt(this.innerBox.style.left) < 0) {
                    this.innerBox.style.left = parseInt(this.innerBox.style.left) + this.speed + 'px'
                } else {
                    this.allLi[this.index - 1].style.backgroundColor = "#fff"
                    this.index = 1
                    this.allLi[this.index - 1].style.backgroundColor = '#333'

                }

            }, 8.3)

        }
    }
    //轮播 pre 
    Model.prototype.prePic = function () {
        clearInterval(this.time)
        if (this.index > 1) {
            this.time = setInterval(() => {
                if (parseInt(this.innerBox.style.left) < (-(this.index - 2) * this.bigBoxWidth)) {
                    // log('1')
                    this.innerBox.style.left = parseInt(this.innerBox.style.left) + this.speed + 'px'
                } else {
                    clearInterval(this.time)
                    this.allLi[this.index - 1].style.backgroundColor = "#fff"
                    this.index--
                    this.allLi[this.index - 1].style.backgroundColor = '#333'
                }
            }, 16.7);
        } else {
            this.time = setInterval(() => {
                if (parseInt(this.innerBox.style.left) > (-this.bigBoxWidth * (this.imgNum.length - 1))) {
                    this.innerBox.style.left = parseInt(this.innerBox.style.left) - this.speed + 'px'

                } else {
                    clearInterval(this.time)
                    this.allLi[this.index - 1].style.backgroundColor = '#fff'
                    this.index = this.imgNum.length
                    this.allLi[this.index - 1].style.backgroundColor = '#333'

                }

            }, 8.7);
        }
    }

    //设置 按钮
    Model.prototype.getStyle = function () {
        var buttonHeight = this.bigBoxHeight / 2 - 14
        this.bigBox.setAttribute('class', 'bigBox')
        this.innerBox.setAttribute('class', 'innerBox')
        this.innerBox.style.width = this.bigBoxWidth * this.imgNum.length + 'px' //innerBox设置宽度
        this.innerBox.style.left = 0 + 'px'

        //pre
        var preButton = document.createElement('div')
        preButton.innerHTML = '<'
        preButton.style.left = 0 + 'px'
        preButton.style.top = buttonHeight + 'px'
        preButton.setAttribute('class', 'button pre')
        this.bigBox.appendChild(preButton)
        this.pre = preButton

        //next
        var nextButton = document.createElement('div')
        nextButton.innerHTML = '>'
        nextButton.style.right = 0 + 'px'
        nextButton.style.top = buttonHeight + 'px'
        nextButton.setAttribute('class', 'button next')
        this.bigBox.appendChild(nextButton)
        this.next = nextButton

        //点击按钮 index oul oli
        var oul = document.createElement('ul')
        oul.setAttribute('class', 'oul')
        for (var i = 0; i < this.imgNum.length; i++) {
            var oli = document.createElement('li')
            oli.setAttribute('class', 'oli')
            oli.index = i + 1
            oul.appendChild(oli)
            this.allLi.push(oli)
        }
        oul.style.bottom = 10 + 'px'
        oul.style.right = 10 + 'px'
        this.bigBox.appendChild(oul)

        this.allLi[0].style.backgroundColor = "#333"
    }

    //立即赋予样式
    Model.prototype.getCssNow = (function () {
        // console.log('running')
        var style = document.createElement('style')
        style.innerHTML = `
        .bigBox{position:relative;overflow:hidden;font-size:0;}
        .innerBox{position:absolute;}
        .button{font-size:14px;position:absolute;;z-index:2;background:rgba(51,51,51,0.4);color:#fff;padding:4px;border-style:none;outline:none;cursor:pointer;}
        .oul{padding:0 4px;list-style:none;position:absolute;font-size:0px;background:rgba(222,222,222,0.4);text-align:center;-moz-border-radius:10px;border-radius:10px;}
        .oli{display:inline-block;margin:6px 4px;background:#fff;width:8px;height:8px;-moz-border-radius:8px;border-radius:8px;cursor:pointer;}
        `
        document.head.appendChild(style)
    })()





    this.Model = Model
})()