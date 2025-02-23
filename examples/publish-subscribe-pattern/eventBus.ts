type EventHandler = (...args: any[]) => void;

class EventBus {
  private events: Map<string, EventHandler[]> = new Map();

  subscribe(eventName: string, handler: EventHandler) {
    const handlers = this.events.get(eventName) || [];
    handlers.push(handler);
    this.events.set(eventName, handlers);
  }

  unSubscribe(eventName: string, handler: EventHandler) {
    const handlers = this.events.get(eventName);
    if (!handlers) return;
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
    this.events.set(eventName, handlers);
  }

  publish(eventName: string, ...args: any[]) {
    const handlers = this.events.get(eventName) || [];
    handlers && handlers.forEach((handler) => handler(...args));
  }
}

// example
const eventBus = new EventBus();

// 订阅者A：监听登录事件
eventBus.subscribe("login", (user: string) => {
  console.log(`订阅者A：用户 ${user} 已登录`);
});

// 订阅者B：监听登录事件
const handlerB = (user: string) => {
  console.log(`订阅者B：欢迎 ${user}！`);
};
eventBus.subscribe("login", handlerB);

// 发布登录事件
eventBus.publish("login", "张三");
// 输出：
// 订阅者A：用户 张三 已登录
// 订阅者B：欢迎 张三！

// 取消订阅者B
eventBus.unSubscribe("login", handlerB);

// 再次发布事件
eventBus.publish("login", "李四");
// 输出：
// 订阅者A：用户 李四 已登录
