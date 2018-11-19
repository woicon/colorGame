import { grids } from '../../utils/grids.js'
const app = getApp()
Page({
    data: {
        width: 0,
        score: 0,
        colors: [],
        cube: 2,
        seconds: 60,
        pause: false
    },

    onLoad() {
        this.setData({
            userInfo: wx.getStorageSync("userInfo")
        })
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    width: res.windowWidth
                });
            }
        });
    },

    onShow() {
        this._ren();
        this._timer();
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#222222',
        })
    },

    onUnload() {
        this.setData({
            pause: true
        });
        this._timer();
    },

    // 下一关
    goNext(e) {
        let next = e.currentTarget.dataset.next;
        if (next) {
            this.setData({
                score: this.data.score + 1
            });
            this._ren();
        }
    },

    // 暂停
    toPause() {
        this.setData({
            pause: true
        });
        this._timer();
    },

    // 继续
    toContinue() {
        this.setData({
            pause: false
        });
        this._timer();
    },

    // 计时器
    _timer() {
        let tm = setInterval(() => {
            let scnd = this.data.seconds;

            // 暂停
            if (this.data.pause) {
                clearInterval(tm);
                return;
            }

            // 结束
            if (scnd == 0) {
                clearInterval(tm);
                this._gameOver();
                return;
            }

            this.setData({
                seconds: scnd - 1
            });
        }, 1000);
    },

    // 游戏结束
    _gameOver() {
        let score = this.data.score;
        let levels = ["瞎子", "色盲", "色郎", "色狼", "色鬼", "色魔", "超级色魔", "变态色魔", "孤独求色"];
        let idx = 3 > score ? 0 : Math.ceil((score - 3) / 3);
        app.level = levels[idx] || levels[levels.length - 1];
        wx.redirectTo({
            url: '../over/over'
        });
    },

    // 数据准备 & 渲染
    _ren() {
        let width = this.data.width-30;
        let score = this.data.score;
        let round = grids(score);
        let cube = round.cube;
        let total = cube * cube;
        let colorAry = new Array(total);
        let size = Math.floor(width / cube);

        colorAry.fill({
            color: round.mainColor,
            next: false,
            size: size
        }, 0, colorAry.length);

        let oneIndex = Math.floor(Math.random() * total);

        colorAry[oneIndex] = {
            color: round.oneColor,
            next: true,
            size: size
        };

        this.setData({
            cube: cube,
            colors: colorAry
        });
    }
});