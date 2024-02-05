import { useLocation, useNavigate } from 'react-router-dom'
import { Tag, Divider, Spin } from 'antd'
import { search } from '../utils/service'
import { useEffect, useState } from 'react';

function ItemList({title, data, type=null}) {
    const navigate = useNavigate();
    const goPath = (item) => {
        navigate(`/${type}/${item.id}`)
    };

    return (
        <div className='item-list'>
            <h2>{title}</h2>
            <ul>
                {data.map(item =>
                    <li key={item.id} onClick={() => {goPath(item)}}>
                        <img src={item.picUrl || item.coverImgUrl} alt="" />
                        <span>{item.name}</span>
                    </li>
                )}
            </ul>
            <Divider></Divider>
        </div>
    )
}

function Search() {
    const location = useLocation();
    const [state, setState] = useState({
        data: {},
        loading: false
    });

    useEffect(() => {
        const init = async() => {
            setState({...state, loading: true})
            const res = await search({keywords: location.state.keywords});
            setState({data: res.result, loading: false})
        }
        if (location.state.keywords !== '') {
            init();
        }
    }, [location.state.keywords])

    return (
        <div className='container'>
            <Spin spinning={state.loading} size={'large'}>
            {
                state.data.orders && state.data.orders.map(item =>
                    <Tag key={item} color="#2db7f5">{item}</Tag>
                )
            }
            {state.data.artist && <ItemList title={'歌手'} data={state.data.artist} type={'singerlist'} />}
            {state.data.album && <ItemList title={'专辑'} data={state.data.album} />}
            {state.data.playlist && <ItemList title={'歌单'} data={state.data.playlist} />}
            </Spin>
        </div>
    )
}

export default Search;
