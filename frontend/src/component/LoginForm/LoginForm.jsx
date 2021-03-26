import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";

import { authStore } from "../../store/authStore";
import { postCreateUser } from "./postCreateUser";
import { postFetchToken } from "./postFetchToken";
import { getUser } from "./getUser";

import logoRoutine from "../../images/routine.svg";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import "./LoginForm.css";

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = async (values) => {
    setIsLoading(true);
    const email = values.email;
    const password = values.password;
    const remember = values.remember;
    const username = values.username;

    if (!isLogin) {
      // TODO! Create a user on auth service + in routine
      //postCreateUser()
    } else {
      const userData = await postFetchToken(email, password);
      if (remember === true) {
        localStorage.setItem("refreshToken", userData.refreshToken);
        localStorage.setItem("userId", userData.userId);
      }
      setIsLoading(false);
      authStore.login(userData.token, userData.refreshToken);
    }
  };

  return (
    <div className="login__full">
      <div className="login__header">
        <img className="login__logo" src={logoRoutine} alt="logo" />
        Routine
      </div>

      <Form
        name="normal_login"
        className="login__form"
        initialValues={{
          remember: true,
        }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="username"
          hidden={isLogin}
          rules={[
            {
              required: !isLogin,
              message: "How should we call you?",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="input Password"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item hidden={!isLogin}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>
              <span className="login__remember">Remember me</span>
            </Checkbox>
          </Form.Item>

          <a className="login__formforgot" href="/#">
            Recover password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login__formbutton"
          >
            {isLoading ? (
              <SyncOutlined spin />
            ) : isLogin ? (
              "Log in"
            ) : (
              "Create account"
            )}
          </Button>
          <div className="login__switchmode">
            Or{" "}
            <span className="login__switchmodetext" onClick={switchModeHandler}>
              {isLogin ? "register now!" : "log into your account!"}
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
