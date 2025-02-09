/**
 * @Description: 假设一个电商平台需要支持多种促销折扣（无折扣、满减、打折），通过策略模式动态切换折扣策略。
 * @Author: OceanH
 * @Date: 2025-02-09 23:24:08
 */
// 策略接口，定义折扣计算方法的规范
interface DiscountStrategy {
  calculate(price: number): number
}

// 具体策略类: 实现不同的折扣算法
// 原价
class NoDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price
  }
}
// 满减
class FullReduction implements DiscountStrategy {
  constructor(private threshold: number, private reduction: number){}

  calculate(price: number): number {
    if(price >= this.threshold) {
      return price - this.reduction
    }
    return price
  }
}
// 打折
class PercentageDiscount implements DiscountStrategy {
  constructor(private percentage: number) {}
  calculate(price: number): number {
    return price * (1 - this.percentage / 100)
  }
}

// 上下文类
class ShoppingCart {
  private strategy: DiscountStrategy
  constructor(strategy: DiscountStrategy = new NoDiscount()) {
    this.strategy = strategy
  }

  setStrategy(strategy: DiscountStrategy) {
    this.strategy = strategy
  }

  checkout(price: number): number {
    return this.strategy.calculate(price)
  }
}

// 使用示例:
const cart = new ShoppingCart()
// 默认无折扣
console.log(cart.checkout(100)) // 100
// 切换为满减策略(满200减50)
cart.setStrategy(new FullReduction(200,50))
console.log(cart.checkout(300)) // 250
// 切换为打折策略(8折)
cart.setStrategy(new PercentageDiscount(20))
console.log(cart.checkout(300)) // 240