import { useState, useEffect } from "react";
import { getBanner, getPlaylist, getArtists, getMv } from "../utils/service";


const useHomeData = () => {
    const [homeData, setHomeData] = useState({
        banner: [],
        playlist: [],
        artistslist: [],
        mvlist: [],
        loading: false
    });

    useEffect(() => {
        const init = async () => {
            setHomeData(pre => ({...pre, loading: true}));
            const res = await Promise.all([getBanner(), getPlaylist(), getArtists(), getMv()]);
            setHomeData({
                banner: res[0].banners,
                playlist: res[1].result,
                artistslist: res[2].artists,
                mvlist: res[3].data,
                loading: false
            });
        }
        init();
    }, []);

    return homeData;
}

export default useHomeData;