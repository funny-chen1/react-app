import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, checkLogin } from "../utils/service";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../utils/axios";
import { setLocal } from "../utils/public";
import { setUser } from "../store/actions";

function Login({ type, close }) {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [state, setState] = useState({ key: "", imgUrl: "" });
  const [isLoading, setIsLoading] = useState(false);
  let timer = null;
  let unikey = "";

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const data = {
      ...values,
      realIP: "116.25.146.177",
    };
    console.log(data);
    // const res = await login(data);
    close();
  };

  const getCode = async () => {
    setIsLoading(true);
    await axios.get("/login/qr/key?timerstamp=" + Date.now()).then((res) => {
      unikey = res.data.unikey;
    });
    await axios
      .get(
        "/login/qr/create?qrimg=true&key=" +
          unikey +
          "&timerstamp=" +
          Date.now()
      )
      .then((res) => {
        setState({ ...state, imgUrl: res.data.qrimg });
      });
    setIsLoading(false);
  };

  const checkCode = async () => {
    await axios
      .get("/login/qr/check?key=" + unikey + "&timerstamp=" + Date.now())
      .then((res) => {
        if (res.code === 803) {
          console.log(res.cookie);
          // Cookies.set('cookie', res.cookie);
          setLocal('cookie', res.cookie);
          clearInterval(timer);
          axios
            .post("/login/status?=timestamp=" + Date.now(), {
              cookie: res.cookie,
            })
            .then((result) => {
              dispatch(setUser(result.data));
              close();
            });
        }
      });
  };

  useEffect(() => {
    if (type === "rq") {
      getCode();

      timer = setInterval(() => {
        checkCode();
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  return (
    <>
      {type === "phone" && (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="手机号"
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
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>{" "}
            或 <a href="">立即注册!</a>
          </Form.Item>
        </Form>
      )}
      {type === "rq" && (
        <Spin spinning={isLoading}>
          <div>
            <img src={state.imgUrl} alt="" />
          </div>
          <div>
            <span>扫码上方二维码登录</span>
          </div>
        </Spin>
      )}
    </>
  );
}

export default Login;
