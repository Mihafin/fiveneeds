
function createBut(num) {
    var b = ccui.Button.create();
    b.setScale(3);
    b.setName(num);
    b.loadTextures("res/Ardentryst-" + num + "c.png");
    return b;
}

var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    resultArray: [],
    clearEvent: function(sender, type) {
        this.resultArray = [];
        this.result.setString("Click the marks you have earn!");
        this.need.setString("NEED:");
        this.need.setVisible(false);
        this.clearBtn.setTitleText("");
    },
    touchEvent: function(sender, type) {
        if (type == ccui.Widget.TOUCH_BEGAN) {
            var T = 4.6;
            var mark = Number(sender.getName());
            this.resultArray.push(mark);
            var sum = this.resultArray.reduce(function(acc, val) { return acc + val; }, 0);
            var cnt = this.resultArray.length;
            var avg = Math.round(sum/cnt * 100) / 100;
            var N = (T * cnt - sum) / (5 - T);
            this.result.setString(this.resultArray.join("+") 
            + "\ncount=" + cnt
            + "\nsum=" + sum 
            + "\navg=" + avg + " (target: " + T + ")");

            this.need.setString("NEED:\n" + Math.max(Math.ceil(N), 0));

            if (cnt > 0) {
                this.clearBtn.setTitleText("clear!");
            }
            this.need.setVisible(cnt > 0);
        }
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        cc.log("size", size);

        /////////////////////////////
        // 3. add your codes below...
        var helloLabel = new cc.LabelTTF("Need fives!", "Arial", 38);
        helloLabel.x = size.width * 0.5;
        helloLabel.y = size.height - 40;
        this.addChild(helloLabel, 5);

        for (var i = 1; i <= 5; ++i) {
            var button = createBut(i);
            button.addTouchEventListener(this.touchEvent.bind(this), button);
            button.x = size.width * 0.05 + i * 70;
            button.y = size.height - 115;
            this.addChild(button, 0);
        }

        this.result = new cc.LabelTTF("", "Arial", 28);
        this.result.boundingWidth = size.width * 0.6;
        this.result.setAnchorPoint(cc.p(0, 1));
        this.result.x = size.width * 0.05;
        this.result.y = size.height - 180;
        this.addChild(this.result, 5);
        
        this.need = new cc.LabelTTF("NEED:", "Arial", 34);
        this.need.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.need.boundingWidth = size.width * 0.3;
        this.need.setAnchorPoint(cc.p(0, 1));
        this.need.x = size.width * 0.65;
        this.need.y = size.height - 180;
        this.addChild(this.need, 6);

        this.clearBtn = ccui.Button.create();
        this.clearBtn.setTitleColor(cc.color(255, 50, 50));
        this.clearBtn.setTitleText("clear!");
        this.clearBtn.setScale(2);
        this.clearBtn.x = size.width * 0.8;
        this.clearBtn.y = size.height - 280;
        this.clearBtn.addTouchEventListener(this.clearEvent.bind(this), this);
        this.addChild(this.clearBtn, 7);

        this.clearEvent();

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

