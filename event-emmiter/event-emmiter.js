"use strict";
exports.__esModule = true;
var EventEmitter1 = /** @class */ (function () {
    function EventEmitter1() {
        this.events = Object.create(null);
    }
    // 监听
    // 向 handles 中 push 事件处理函数
    EventEmitter1.prototype.on = function (type, handle) {
        if (!this.events[type]) {
            this.events[type] = {
                isOn: true,
                handles: []
            };
        }
        this.events[type].handles.push(handle);
        console.log(this.events[type].handles);
    };
    // 发送事件
    // 从 handles 中 shift 一个事件来执行
    EventEmitter1.prototype.trigger = function (type, event) {
        if (!this.events[type]) {
            return;
        }
        var _a = this.events[type], isOn = _a.isOn, handles = _a.handles;
        if (!isOn || !handles) {
            return;
        }
        var handle = handles.length > 0 ? handles[0] : null;
        if (!handle) {
            return;
        }
        handle(event);
    };
    // 取消监听
    EventEmitter1.prototype.off = function (type) {
        if (!this.events || !this.events[type]) {
            return;
        }
        this.events[type] = {
            isOn: false,
            handles: []
        };
    };
    return EventEmitter1;
}());
exports.EventEmitter1 = EventEmitter1;
/***** example *****/
var emmiter = new EventEmitter1();
emmiter.on('foo111', function (event) {
    console.log(event.type);
});
emmiter.on('bar111', function (event) {
    console.log(event.type);
});
emmiter.trigger('foo111', { type: 'foo111' });
emmiter.trigger('bar111', { type: 'bar111' });
// 取消监听后再触发事件
emmiter.off('foo222');
emmiter.trigger('foo222', { type: 'foo222' });
// 重新监听后再触发事件
emmiter.on('bar222', function (event) {
    console.log(event.type);
});
emmiter.trigger('bar222', { type: 'bar222' });
