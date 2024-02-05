import "./Header.css";
import { useNavigate } from "react-router-dom";
import routes from "../../router/index";
import { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Avatar } from "antd";
import Login from "../../views/LoginView";
import { search } from "../../utils/service";
import { useSelector } from "react-redux";

const { Search } = Input;

function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const userInfo = useSelector((state) => state.user);
  const routeData = routes.filter(item => {
    return item.isActive;
  })

  function goPath(url, params = {}) {
    if (url.path) {
      navigate(url.path, { state: params });
    } else {
      navigate(url, { state: params });
    }
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
        {userInfo.data && (
          <>
            <Avatar size={40} src={userInfo.data.profile.avatarUrl}></Avatar>
            <span className="nickname">{userInfo.data.profile.nickname}</span>
          </>
        )}
        {!userInfo.data && (
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
