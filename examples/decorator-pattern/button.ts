/**
 * @Description: 场景: 动态为React组件添加日志、权限校验等能力。
 * @Author: OceanH
 * @Date: 2025-02-25 22:56:27
 */
// 高阶组件（HOC）作为装饰器
import React from 'react';

// 组件接口：原始组件
interface ButtonProps {
    onClick: () => void;
    label: string;
}

class Button extends React.Component<ButtonProps> {
    render() {
        return <button onClick={this.props.onClick}>{this.props.label}</button>;
    }
}

// 装饰器：日志记录
function withLogging<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return class extends React.Component<P> {
        componentDidMount() {
            console.log("组件已挂载");
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

// 装饰器：权限校验
function withAuthCheck<P extends { isAuthenticated: boolean }>(
    WrappedComponent: React.ComponentType<P>
) {
    return class extends React.Component<P> {
        render() {
            if (this.props.isAuthenticated) {
                return <WrappedComponent {...this.props} />;
            } else {
                return <div>请先登录</div>;
            }
        }
    };
}

// 组合装饰器
const EnhancedButton = withLogging(withAuthCheck(Button));

// 使用装饰后的组件
const App = () => (
    <EnhancedButton
        label="点击我"
        onClick={() => console.log("按钮点击")}
        isAuthenticated={true}
    />
);
