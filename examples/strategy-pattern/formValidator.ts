/**
 * @Description: 使用策略模式处理表单验证场景的简单示例
 * @Author: OceanH
 * @Date: 2025-02-10 00:25:54
 */
interface validationStrategy {
  validate(value: string): boolean;
}
// 具体策略
// 必填
class RequiredValidation implements validationStrategy {
  validate(value: string): boolean {
    return value.trim() !== "";
  }
}
// 邮箱格式
class EmailValidation implements validationStrategy {
  validate(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
// 身份证号码格式
class PROCIdCardValidation implements validationStrategy {
  private regex =
    /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
  validate(value: string): boolean {
    return this.regex.test(value);
  }
}

// 上下文类
class Validator {
  private strategies: validationStrategy[] = []

  addStrategy(strategy: validationStrategy) {
    this.strategies.push(strategy)
  }

  validate(value: string) {
    return this.strategies.every(strategy => strategy.validate(value))
  }
}

// 使用示例
const validator = new Validator()
validator.addStrategy(new RequiredValidation())
validator.addStrategy(new EmailValidation())
// validator.addStrategy(new PROCIdCardValidation())

console.log(validator.validate("test@example.com")); // true
console.log(validator.validate("")); // false