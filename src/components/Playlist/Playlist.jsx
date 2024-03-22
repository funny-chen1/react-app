import { useNavigate } from 'react-router-dom';
import './Playlist.css'
import { Space } from 'antd';

function Playlist({title, object, type}) {
    const navigate = useNavigate();
    const goPath = (item) => {
        navigate(`/${type}/${item.id}`, {state: item})
    };


    return (
        <div className="playlist">
            <h1>{title}</h1>
            <ul>
                {object.map(item =>
                    <li key={item.id} onClick={() => {goPath(item)}}>
                        <img src={item.picUrl || item.coverImgUrl || item.cover} alt="" />
                        <span style={{fontSize: 18}}>{item.name}</span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Playlist;
