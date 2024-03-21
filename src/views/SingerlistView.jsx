import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  artistDesc,
  artistDetail,
  getArtistsSongs,
  collectArtist,
} from "../utils/service";
import AppTable from "../components/app-table/AppTable";
import { isEmpty } from "../utils/public";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Spin, Card, Row, Col, Empty, Space, Button, Tabs } from "antd";
const { Meta } = Card;

function SingerList(params) {
  const { id } = useParams();
  const location = useLocation();
  const [state, setState] = useState({
    briefDesc: "",
    introduction: [],
    songs: [],
    isLoading: false,
    isLoadingT: false,
  });

  const play = (record) => {
    console.log(record);
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

  const tableOptions = {
    columns: columns,
    data: state.songs,
  };

  const collect = async (type) => {
    setState((pre) => ({ ...pre, isLoadingT: true }));
    const res = await collectArtist({
      id: id,
      t: type,
      cookie: localStorage.getItem("cookie"),
    });
    const { artist } = await getArtistsSongs({ id: id });
    setState((pre) => ({ ...pre, artist: artist, isLoadingT: false }));
  };

  const init = async () => {
    setState({ ...state, isLoading: true });
    const { briefDesc, introduction } = await artistDesc({ id: id });
    const detail = await artistDetail({ id: id });
    const { artist, hotSongs } = await getArtistsSongs({ id: id });
    hotSongs.forEach((value, index) => {
      value["key"] = index + 1;
    });
    const tabItems = introduction.map((item, index) => {
      return { key: index + 1, label: item.ti, children: <p>{item.txt}</p> };
    });
    setState({
      ...state,
      briefDesc: briefDesc,
      introduction: tabItems,
      songs: hotSongs,
      artist: artist,
      isLoading: false,
    });
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
                {state.briefDesc && state.artist && (
                  <Card hoverable cover={<img src={state.artist.picUrl} />}>
                    <Meta
                      title={state.artist.name}
                      description={state.briefDesc}
                    />
                    {state.artist.followed ? (
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
              <Space
                direction="vertical"
                size="middle"
                style={{
                  display: "flex",
                }}
              >
                <Card>
                  <Tabs defaultActiveKey="1" items={state.introduction} />
                </Card>
                <Card>
                  <AppTable {...tableOptions}></AppTable>
                </Card>
              </Space>
            </Col>
          </Row>
        )}
      </Spin>
    </div>
  );
}

export default SingerList;
