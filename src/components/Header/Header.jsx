import "./Header.css";
import { useNavigate } from "react-router-dom";
import routes from "../../router/index";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AudioOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Avatar, Dropdown } from "antd";
import Login from "../../views/LoginView";
import {setLocal} from "../../utils/public";
import { logout } from "../../utils/service";
import { setUser } from "../../store/actions";

const { Search } = Input;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const userInfo = useSelector((state) => state.user);
  const routeData = routes.filter(item => {
    return item.isActive;
  });
  const items = [
      {
          key: '1',
          label: (
              <a target="_blank" onClick={() => goPath('/user')}>
                  个人中心
              </a>
          ),
      },
      {
          key: '2',
          label: (
              <a target="_blank" onClick={loginout}>
                  退出登录
              </a>
          ),
      }
  ];


  useEffect( () => {
      // init();
  }, []);

  function goPath(url, params = {}) {
    if (url.path) {
      navigate(url.path, { state: params });
    } else {
      navigate(url, { state: params });
    }
  }

  async function loginout() {
      setLocal('cookie', '');
      await logout();
      dispatch(setUser({}));
  }

  const showModal = (type = "phone") => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSearch = async (value, _e, info) => {
    // const res = await search({keywords: value})
    goPath("/search", { keywords: value });
  };

  return (
    <div className="header">
      <ul>
        {routeData.map((item) => {
          return (
            <li
              key={item.name}
              onClick={() => {
                goPath(item);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
      <Search
        placeholder="请输入..."
        allowClear
        onSearch={onSearch}
        style={{ width: 200 }}
      />
      <div className="right-box">
        {userInfo.data !== null && (
            <>
                <Dropdown menu={{items}}>
                    <Avatar size={40} src={userInfo.data.profile.avatarUrl}></Avatar>
                    {/*<span className="nickname">{userInfo.data.profile.nickname}</span>*/}
                </Dropdown>
            </>
        )}
        {userInfo.data === null && (
          <>
            <Button
              type="primary"
              onClick={() => {
                showModal();
              }}
            >
              登录
            </Button>
            <Button
              type="primary"
              onClick={() => {
                showModal("rq");
              }}
            >
              二维码登录
            </Button>
          </>
        )}
      </div>

      <Modal
        title="登录"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        width={360}
      >
        <Login type={modalType} close={handleCancel}></Login>
      </Modal>
    </div>
  );
}

export default Header;
