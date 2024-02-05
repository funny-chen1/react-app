import { Spin, Card, Row, Col, Empty, Select, Space } from "antd";
import {useState, useEffect} from 'react'
import {getArtistCategory} from "../utils/service";
import Playlist from "../components/Playlist/Playlist";

function Singer() {
    const type = [
        {value: "-1", label: '全部'},
        {value: "1", label: '男歌手'},
        {value: "2", label: '女歌手'},
        {value: "3", label: '乐队'}
    ];

    const area = [
        {value: "-1", label: '全部'},
        {value: "7", label: '华语'},
        {value: "96", label: '欧美'},
        {value: "8", label: '日本'},
        {value: "16", label: '韩国'},
        {value: "0", label: '其他'}
    ];


    const params = {
        type: -1,
        area: -1
    };

    const [state, setState] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const init = async () => {
        setIsLoading(true);
        const res = await getArtistCategory(params);
        setState({...state, artists: res.artists});
        setIsLoading(false);
    };

    useEffect(() => {
        init();
    }, [])

    const changeType = (value) => {
        params.type = value;
        init();
    };

    const changeArea = (value) => {
        params.area = value;
        init();
    };


    return (
        <div className="container">
            <Row>
                <Col span={24}>
                    <Card style={{width: '1280px'}}>
                        <Space>
                            <Select
                                defaultValue="-1"
                                style={{
                                    width: 120,
                                }}
                                onChange={changeType}
                                options={type}
                            />
                            <Select
                                defaultValue="-1"
                                style={{
                                    width: 120,
                                }}
                                onChange={changeArea}
                                options={area}
                            />
                        </Space>
                        <Spin spinning={isLoading}>
                            {state.artists && <Playlist title={'歌手'} object={state.artists} type={'singerlist'}></Playlist>}
                        </Spin>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Singer;
