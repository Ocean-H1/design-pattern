/**
 * @Description: 场景：当天气数据更新时，需要实时、同步地将温度变化通知所有显示设备
 * @Author: OceanH
 * @Date: 2025-02-24 20:23:44
 */
interface Observe {
  update(temperature: number): void
}

// 被观察者
class WeatherStation {
  private observers: Observe[] = []
  private temperature: number = 0

  // 注册观察者
  attach(observer: Observe) {
    this.observers.push(observer)
  }
  // 移除观察者
  detach(observer: Observe) {
    const index = this.observers.indexOf(observer)
    if(index > -1) {
      this.observers.splice(index, 1)
    }
  }
  // 通知观察者
  notify() {
    this.observers.forEach(observer => observer.update(this.temperature))
  }
  // 更新温度并通知观察者
  setTemperature(temperature: number) {
    this.temperature = temperature
    this.notify()
  }
}

// 具体观察者
class PhoneDisplay implements Observe{
  update(temperature: number): void {
    console.log(`手机显示温度：${temperature}℃`);
  }
}

class TvDisplay implements Observe {
  update(temperature: number): void {
    console.log(`电视显示温度：${temperature}℃`);
  }
}

// 使用示例
const weatherStation = new WeatherStation()
const phone = new PhoneDisplay()
const tv = new TvDisplay()

// 显示注册观察者
weatherStation.attach(phone)
weatherStation.attach(tv)

weatherStation.setTemperature(20)
// 输出：
// 手机显示温度：25°C
// 电视显示温度：25°C

weatherStation.detach(tv);
weatherStation.setTemperature(30); 
// 输出：手机显示温度：30°C