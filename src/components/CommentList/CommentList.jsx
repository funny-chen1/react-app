import './CommentList.css'
import {Avatar, Space, Row, Col, Card, Divider} from 'antd';

function CommentList({data}) {

    console.log(data);


    return (
        <div className="comment-list">
            <h2>评论</h2>
            <ul>
                {data && data.map((item, key) =>
                    <div key={key}>
                        <li>
                            <Row>
                                <Col span={4}>
                                    <Space
                                        direction="vertical"
                                        size="middle"
                                    >
                                        <Avatar size={64} src={item.user.avatarUrl}/>
                                        <span>{item.user.nickname}</span>
                                        <span>{item.timeStr}</span>
                                    </Space>
                                </Col>
                                <Col span={20}>
                                    <p>{item.content}</p>
                                </Col>
                            </Row>
                        </li>
                        {key < data.length -1 && <Divider/>}
                    </div>
                )}
            </ul>
        </div>
    )
}

export default CommentList;
