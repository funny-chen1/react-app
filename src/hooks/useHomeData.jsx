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
            const [bannerRes, playlistRes, artistsRes, mvRes] = await Promise.allSettled([
                getBanner(), getPlaylist(), getArtists(), getMv()
            ]);
            setHomeData({
                banner: bannerRes.status === 'fulfilled' ? bannerRes.value.banners : [],
                playlist: playlistRes.status === 'fulfilled' ? playlistRes.value.result : [],
                artistslist: artistsRes.status === 'fulfilled' ? artistsRes.value.artists : [],
                mvlist: mvRes.status === 'fulfilled' ? mvRes.value.data : [],
                loading: false
            });
        }
        init();
    }, []);

    return homeData;
}

export default useHomeData;