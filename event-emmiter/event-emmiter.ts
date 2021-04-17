
/* 
type: 事件类型
isOn: 是否是监听状态
handles：某个事件类型的回调函数的列表，并使用队列实现先绑定的先执行
*/
interface IEventsMap {
  [type: string]: {
    isOn: boolean;
    handles: IHandle[]
  };
}
// IHandle:事件回调函数
type IHandle = ((args: any) => any)


export class EventEmitter1 {
  events: IEventsMap = Object.create(null);

  // 监听
  // 向 handles 中 push 事件处理函数
  on(type: string, handle: IHandle) {
    if (!this.events[type]) {
      this.events[type] = {
        isOn: true,
        handles: []
      };
    }
    this.events[type]!.handles.push(handle);
    console.log(this.events[type].handles);
  }

  // 发送事件
  // 从 handles 中 shift 一个事件来执行
  trigger(type: string, event: any) {
    if (!this.events[type]) {
      return;
    }

    const { isOn, handles } = this.events[type];
    if (!isOn || !handles) {
      return;
    }
    const handle = handles.length > 0 ? handles[0] : null;
    if (!handle) {
      return;
    }
    handle(event);
  }

  // 取消监听
  off(type: string) {
    if (!this.events || !this.events[type]) {
      return;
    }
    this.events[type] = {
      isOn: false,
      handles: []
    }
  }

}

/***** example *****/
const emmiter = new EventEmitter1();

emmiter.on('foo111', (event) => {
  console.log(event.type);
});
emmiter.on('bar111', (event) => {
  console.log(event.type);
});
emmiter.trigger('foo111', { type: 'foo111' });
emmiter.trigger('bar111', { type: 'bar111' });

// 取消监听后再触发事件
emmiter.off('foo222');
emmiter.trigger('foo222', { type: 'foo222' });

// 重新监听后再触发事件
emmiter.on('bar222', (event) => {
  console.log(event.type);
});
emmiter.trigger('bar222', { type: 'bar222' });




