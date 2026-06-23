import { useEffect, useState } from "react";
import { Carousel, Spin } from "antd";
import Playlist from "../components/Playlist/Playlist";
import "./style.css";
import useHomeData from "../hooks/useHomeData";

function Home() {
  const [time, setTime] = useState(new Date());
  const { banner, playlist, artistslist, mvlist, loading } = useHomeData();
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000)
    return () => {
      clearInterval(timer);
    }
  }, []);

  const showList = [
    {title: '推荐歌单', object: playlist, type: 'playlist'},
    {title: '热门歌手', object: artistslist, type: 'singerlist'},
    {title: '推荐MV', object: mvlist, type: 'mv'}
  ]

  return (
    <div className={loading? 'loading':'home'}>
      <div className="time-box">{time.toLocaleTimeString()}</div>
      <Spin spinning={loading} size={'large'}>
        <Carousel autoplay number={6000} fade={true}>
          {banner.map((item) => 
            <div key={item.url} className="img-box">
              <img key={item.url} src={item.imageUrl} alt="" />
            </div>
          )}
        </Carousel>
        {
          showList.map((item, key) => (
            <Playlist key={key} title={item.title} object={item.object} type={item.type}></Playlist>
          ))
        }
      </Spin>
    </div>
  );
}

export default Home;
