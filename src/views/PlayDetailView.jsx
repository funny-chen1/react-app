import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  playlistDetail,
  playlistInfo,
  getComment,
  collectPlaylist,
  getUrl,
} from "../utils/service";
import AppTable from "../components/app-table/AppTable";
import CommentList from "../components/CommentList/CommentList";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Spin, Card, Empty, Space, Button } from "antd";
import { playMusic } from "../store/actions";
import { useDispatch } from "react-redux";
import "./PlayDetailView.css";
import { render } from "react-dom";

function PlayDetail() {
  const { id } = useParams();
  const [state, setState] = useState({
    songs: [],
    info: {},
    hotComments: [],
    isLoading: false,
  });
  const [loadingT, setLoadingT] = useState(false);
  const dispatch = useDispatch();

  const play = async (record) => {
    const res = await getUrl({ id: record.id });
    dispatch(playMusic(res.data[0].url));
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
      width: 80,
    },
    {
      title: "歌名",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "歌手",
      key: "artist",
      ellipsis: true,
      render: (_, record) => record.ar?.map((a) => a.name).join(" / ")
    },
    {
      title: "",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => play(record)}
            shape="circle"
            type="primary"
            ghost
            icon={<CaretRightOutlined />}
          />
          <Button shape="circle" icon={<PlusOutlined />} />
        </Space>
      ),
    },
  ];

  const init = async () => {
    setState((pre) => ({ ...pre, isLoading: true }));
    try {
      const [infoResult, detailResult, commentResult] =
        await Promise.allSettled([
          playlistInfo({ id }),
          playlistDetail({ id }),
          getComment({ id }),
        ]);

      const info = infoResult.status === "fulfilled" ? infoResult.value : null;
      const res =
        detailResult.status === "fulfilled" ? detailResult.value : null;
      const hotComments =
        commentResult.status === "fulfilled"
          ? commentResult.value?.hotComments
          : [];

      if (res?.songs) {
        res.songs.forEach((value, index) => {
          value["key"] = index + 1;
        });
      }

      setState((pre) => ({
        ...pre,
        songs: res?.songs ?? [],
        info: info?.playlist ?? {},
        hotComments: hotComments ?? [],
      }));
    } finally {
      setState((pre) => ({ ...pre, isLoading: false }));
    }
  };

  const collect = async (type) => {
    setLoadingT(true);
    try {
      await collectPlaylist({
        t: type,
        id: state.info.id,
        cookie: localStorage.getItem("cookie"),
      });
      const info = await playlistInfo({ id });
      setState((pre) => ({ ...pre, info: info.playlist }));
    } finally {
      setLoadingT(false);
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  const { info, songs, hotComments, isLoading } = state;
  const coverUrl = info.coverImgUrl || "";

  return (
    <div className="play-detail">
      {isLoading ? (
        <div className="play-detail__loading">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {info.name && (
            <header
              className="play-detail__hero"
              style={
                coverUrl ? { "--hero-cover": `url(${coverUrl})` } : undefined
              }
            >
              <img
                className="play-detail__cover"
                src={coverUrl}
                alt={info.name}
              />
              <div className="play-detail__meta">
                <span className="play-detail__label">歌单</span>
                <h1 className="play-detail__title">{info.name}</h1>
                <div className="play-detail__stats">
                  {info.trackCount != null && (
                    <span>{info.trackCount} 首歌曲</span>
                  )}
                  {info.playCount != null && (
                    <span>
                      {info.playCount >= 10000
                        ? `${(info.playCount / 10000).toFixed(1)}万`
                        : info.playCount}{" "}
                      次播放
                    </span>
                  )}
                  {info.creator?.nickname && (
                    <span>by {info.creator.nickname}</span>
                  )}
                </div>
                {info.description && (
                  <p className="play-detail__desc">{info.description}</p>
                )}
                <div className="play-detail__actions">
                  <Spin spinning={loadingT}>
                    {info.subscribed ? (
                      <Button onClick={() => collect("2")} size="large">
                        取消收藏
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => collect("1")}
                        size="large"
                      >
                        收藏歌单
                      </Button>
                    )}
                  </Spin>
                </div>
              </div>
            </header>
          )}

          <section className="play-detail__section">
            <h2 className="play-detail__section-title">歌曲列表</h2>
            <Card className="play-detail__card" bordered={false}>
              {songs.length > 0 ? (
                <AppTable columns={columns} data={songs} />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="暂无歌曲"
                />
              )}
            </Card>
          </section>

          <section className="play-detail__section">
            <Card className="play-detail__card" bordered={false}>
              <CommentList data={hotComments} />
            </Card>
          </section>
        </>
      )}
    </div>
  );
}

export default PlayDetail;
