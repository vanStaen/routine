import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { openNotification } from "../../helpers/openNotification";
import logoRoutine from "../../images/routine.svg";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import "./LoginForm.css";

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = (values) => {
    const email = values.email;
    const password = values.password;
    const remember = values.remember;

    if (process.env.NODE_ENV === "development") {
      console.log("[login] Form submitted!");
    }

    let requestBody = { email: email, password: password };

    async function createUser() {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        const error = await response.json();
        openNotification(error.errors[0].message, "", 3, "warning");
        const message = `An error has occured: ${response.status} - ${error.errors[0].message}`;
        throw new Error(message);
      }
      const login = await response.json();
      return login;
    }

    async function fetchLogin() {
      const response = await fetch(process.env.REACT_APP_AUTH_URL + "/login", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        const error = await response.json();
        openNotification(error.error, "", 3, "warning");
        const message = `An error has occured: ${response.status} - ${error.error}`;
        throw new Error(message);
      }
      const login = await response.json();
      return login;
    }

    async function fetchUser(token) {
      const requestBody = {
        query: `
                query {
                  user {
                    name
                    email
                    dateCreated
                    avatar
                    active
                  }
                }
                  `,
      };
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        const error = await response.json();
        openNotification("Error " + response.status, error.error, 0, "error");
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const user = await response.json();
      return user;
    }

    // Register
    if (!isLogin) {
      const username = values.username;
      requestBody = {
        query: `
              mutation {
                  createUser(
                    userInput: { name: "${username}", email: "${email}", password: "${password}" }
                  ) {
                    name
                  }
                }
                `,
      };
      createUser()
        .then((resData) => {
          const newUser = resData.data.createUser.name;
          openNotification(
            "Account successully created.",
            "Kudos to you " + newUser + "! You can now log into your account.",
            5,
            "success"
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      // login
      fetchLogin()
        .then((resData) => {
          console.log("[login] FetchLogin ended!");
          //authStore.login(resData.token, resData.refreshToken);
          if (remember === true) {
            if (process.env.NODE_ENV === "development") {
              console.log("[login] Remember:", remember);
            }
            // Store RefreshToken and ID, only if "remember" set to true.
            localStorage.setItem("refreshToken", resData.refreshToken);
            localStorage.setItem("userId", resData.userId);
          } else {
            if (process.env.NODE_ENV === "development") {
              console.log("[login] Remember:", remember);
            }
          }
          openNotification("You have successully log in.", "", 3, "success");
          if (process.env.NODE_ENV === "development") {
            console.log("[login] Logged!");
          }
          // Get user infos
          fetchUser(resData.token)
            .then((resData) => {
              const user = resData.data.user[0];
              localStorage.setItem("user", JSON.stringify(user));
              const storedUser = user;
              if (process.env.NODE_ENV === "development") {
                console.log(
                  "[login] Save user object to Local Storage:",
                  storedUser
                );
              }
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
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
            {isLogin ? "Log in" : "Create account"}
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
