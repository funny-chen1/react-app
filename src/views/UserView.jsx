import {
  Card,
  Col,
  Row,
  Space,
  Spin,
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  DatePicker,
  Tabs,
} from "antd";
import { useState, useEffect } from "react";
import { checkLogin, getUserArtist, getUserPlaylist } from "../utils/service";
import { getLocal } from "../utils/public";
import Playlist from "../components/Playlist/Playlist";

function User() {
  const [state, setState] = useState({
    data: {},
    isLoading: false,
    playlist: [],
    artist: []
  });

  const init = async () => {
    setState((pre) => ({ ...pre, isLoading: true }));
    const cookie = getLocal("cookie");
    const { data } = await checkLogin({ cookie: cookie });
    const { playlist } = await getUserPlaylist({uid: data.profile.userId})
    const res = await getUserArtist()
    console.log(res);
    setState((pre) => ({ ...pre, data: data, playlist: playlist, artist: res.data, isLoading: false }));
  };

  useEffect(() => {
    init();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const tabList = [
    {label: '个人信息', key: 1, children: 'Content of Tab 1'},
    {label: '收藏歌单', key: 2, children: <Playlist title={'歌单'} object={state.playlist} type={'playlist'}></Playlist>},
    {label: '收藏歌手', key: 3, children: <Playlist title={'歌手'} object={state.artist} type={'singerlist'}></Playlist>},
    {label: '收藏专辑', key: 4, children: 'Content of Tab 4'}
  ]

  return (
    <div className="container">
      <Spin spinning={state.isLoading}>
        <Row>
          <Col span={24}>
            {/* <Card style={{width: '1280px'}}>
                            {state.data.profile &&<Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 400,
                                }}
                                initialValues={state.data.profile}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="用户昵称"
                                    name="nickname"
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item label="性别" name="gender">
                                    <Radio.Group>
                                        <Radio value={0}> 保密 </Radio>
                                        <Radio value={1}> 男 </Radio>
                                        <Radio value={2}> 女 </Radio>
                                    </Radio.Group>
                                </Form.Item>


                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        保存
                                    </Button>
                                </Form.Item>
                            </Form>
                            }
                        </Card> */}
            <Card style={{ width: "1280px" }}>
              <Tabs
                tabPosition="left"
                items={tabList}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default User;
