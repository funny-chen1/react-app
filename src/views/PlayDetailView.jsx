import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  playlistDetail,
  playlistInfo,
  getComment,
  collectPlaylist,
  getUrl
} from "../utils/service";
import AppTable from "../components/app-table/AppTable";
import CommentList from "../components/CommentList/CommentList";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Spin,
  Card,
  Row,
  Col,
  Empty,
  Table,
  Space,
  Button,
  Avatar,
} from "antd";
import { playMusic } from "../store/actions";
import { useDispatch } from "react-redux";
const { Meta } = Card;

function PlayDetail(params) {
  const { id } = useParams();
  const [state, setState] = useState({
    songs: [],
    info: {},
    isLoading: false,
  });
  const dispatch = useDispatch()
  const play = async (record) => {
    console.log(record);
    const res = await getUrl({id: record.id})
    dispatch(playMusic(res.data[0].url))
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
      width: 100,
      fixed: "left",
    },
    {
      title: "歌名",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => play(record)}
            shape="circle"
            icon={<CaretRightOutlined />}
          ></Button>
          <Button shape="circle" icon={<PlusOutlined />}></Button>
        </Space>
      ),
    },
  ];
  const init = async () => {
    setState((pre) => ({ ...pre, isLoading: true }));
    const info = await playlistInfo({ id: id });
    const res = await playlistDetail({ id: id });
    const { hotComments } = await getComment({ id: id });
    res.songs.forEach((value, index) => {
      value["key"] = index + 1;
    });
    setState((pre) => ({
      ...pre,
      songs: res.songs,
      info: info.playlist,
      hotComments: hotComments,
      isLoading: false,
      isLoadingT: false,
    }));
  };

  const collect = async (type) => {
    setState((pre) => ({ ...pre, isLoadingT: true }));
    const res = await collectPlaylist({
      t: type,
      id: state.info.id,
      cookie: localStorage.getItem("cookie"),
    });
    const info = await playlistInfo({ id: id });
    setState((pre) => ({ ...pre, info: info.playlist, isLoadingT: false }));
  };

  const tableOptions = {
    columns: columns,
    data: state.songs,
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="container">
      <Spin spinning={state.isLoading}>
        {state.isLoading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {!state.isLoading && (
          <Row gutter={16}>
            <Col span={6}>
              <Spin spinning={state.isLoadingT}>
                {state.info && (
                  <Card hoverable cover={<img src={state.info.coverImgUrl} />}>
                    <Meta
                      title={state.info.name}
                      description={state.info.description}
                    />
                    {state.info.subscribed ? (
                      <Button
                        className="mt20"
                        type="primary"
                        danger
                        onClick={() => {
                          collect("2");
                        }}
                      >
                        取消收藏
                      </Button>
                    ) : (
                      <Button
                        className="mt20"
                        type="primary"
                        danger
                        onClick={() => {
                          collect("1");
                        }}
                      >
                        收藏
                      </Button>
                    )}
                  </Card>
                )}
              </Spin>
            </Col>
            <Col span={16}>
              <Space direction="vertical" size="middle">
                <Card>
                  {state.songs.length > 0 && (
                    <AppTable {...tableOptions}></AppTable>
                  )}
                </Card>
                <Card>
                  <CommentList data={state.hotComments}></CommentList>
                </Card>
              </Space>
            </Col>
          </Row>
        )}
      </Spin>
    </div>
  );
}

export default PlayDetail;
