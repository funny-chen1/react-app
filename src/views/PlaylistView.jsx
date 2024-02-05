import { Spin, Card, Row, Col, Empty, Select, Space } from "antd";
import {useState, useEffect} from 'react'
import {getPlaylistCategory, getTopPlaylist} from "../utils/service";
import Playlist from "../components/Playlist/Playlist";

function PlaylistView() {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({});
    let type = [
        {value: '全部', label: '全部'}
    ];

    const params = {
        cat: '全部'
    };


    const init = async () => {
        setIsLoading(true);
        const {sub} = await getPlaylistCategory();
        const {playlists} = await getTopPlaylist(params);
        const cate = sub.map(item => {
            return {value: item.name, label: item.name};
        });
        setState({...state, playlists: playlists, type: type.concat(cate)});
        setIsLoading(false);
    };

    const changeType = (value) => {
        params.cat = value;
        init();
    };


    useEffect(() => {
        init();
    }, []);

    return (
        <div className="container">
            <Row>
                <Col span={24}>
                    <Card style={{width: '1280px'}}>
                        <Space>
                            <Select
                                defaultValue="全部"
                                style={{
                                    width: 120,
                                }}
                                onChange={changeType}
                                options={state.type}
                            />
                            {/*<Select*/}
                                {/*defaultValue="-1"*/}
                                {/*style={{*/}
                                    {/*width: 120,*/}
                                {/*}}*/}
                                {/*onChange={changeArea}*/}
                                {/*options={area}*/}
                            {/*/>*/}
                        </Space>
                        <Spin spinning={isLoading}>
                            {state.playlists && <Playlist title={'歌单'} object={state.playlists} type={'playlist'}></Playlist>}
                        </Spin>
                    </Card>
                </Col>
            </Row>
        </div>

    )
}

export default PlaylistView;
