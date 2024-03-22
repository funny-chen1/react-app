import { useEffect, useState } from "react";
import { Carousel, Spin } from "antd";
import { getBanner, getPlaylist, getArtists, getMv } from "../utils/service";
import Playlist from "../components/Playlist/Playlist";
import "./style.css";
import axios from "axios";

function Home() {
  const [banner, setBanner] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [artistslist, setArtistslist] = useState([]);
  const [mvlist, setMvlist] = useState([]);
  const [loading, setLoding] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const init = async () => {
      setLoding(true);
      const [res1, res2, res3, res4] = await Promise.all([getBanner(), getPlaylist(), getArtists(), getMv()]);
      setBanner(res1.banners);
      setPlaylist(res2.result);
      setArtistslist(res3.artists);
      setMvlist(res4.data);
      setLoding(false);
    };
    init();
    setInterval(() => {
      setTime(new Date());
    }, 1000)
  }, []);

  return (
    <div className={loading? 'loading':'home'}>
      <div className="time-box">{time.toLocaleTimeString()}</div>
      <Spin spinning={loading} size={'large'}>
        <Carousel autoplay number={6000} fade={true}>
          {banner.map((item) => (
            <div key={item.url} className="img-box">
              <img key={item.url} src={item.imageUrl} alt="" />
            </div>
          ))}
        </Carousel>
        <Playlist title={'推荐歌单'} object={playlist} type={'playlist'}></Playlist>
        <Playlist title={'热门歌手'} object={artistslist} type={'singerlist'}></Playlist>
        <Playlist title={'推荐MV'} object={mvlist} type={'mv'}></Playlist>
      </Spin>
    </div>
  );
}

export default Home;
