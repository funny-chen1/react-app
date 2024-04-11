import { useEffect, useState } from "react";
import { getMvDetail, getMvUrl, getMvComment } from "../utils/service";
import { useParams } from "react-router-dom";
import { Spin, Card, Row, Col, Space, Button, Avatar } from "antd";
import CommentList from "../components/CommentList/CommentList";

function Mv() {
  const { id } = useParams();
  const [state, setState] = useState({
    isLoading: false,
    info: [],
    hotComments: [],
    mvUrl: "",
  });

  const init = async () => {
    setState((pre) => ({ ...pre, isLoading: true }));
    const res = await getMvDetail({ id: id });
    const url = await getMvUrl({ id: id });
    const comment = await getMvComment({ id: id });
    console.log(res);
    setState((pre) => ({
      ...pre,
      info: res.data,
      url: url.data.url,
      hotComments: comment.comments,
      isLoading: false,
    }));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="container">
      <Spin spinning={state.isLoading}>
        <Card>
          <div style={{width: "600px",margin: '0 auto'}}>
            <h3 style={{ textAlign: "left", margin: "0" }}>
              {state.info.name}
            </h3>
            <video src={state.url} width={'100%'} height={400} controls></video>
            {state.info && (
              <div className="mv-info">
                <Space size="middle">
                  <span>发布时间: {state.info.publishTime}</span>
                  <span>播放次数：{state.info.playCount}</span>
                  <span>分享：{state.info.shareCount}</span>
                  <span>收藏：{state.info.subCount}</span>
                </Space>
                {state.info.artists && (
                  <Space size="middle">
                    <Avatar
                      size={50}
                      src={state.info.artists[0].img1v1Url}
                    ></Avatar>
                    <span>{state.info.artists[0].name}</span>
                  </Space>
                )}
              </div>
            )}
          </div>
        </Card>
        <Card>
          <CommentList data={state.hotComments}></CommentList>
        </Card>
      </Spin>
    </div>
  );
}

export default Mv;
