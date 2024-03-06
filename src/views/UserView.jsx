import {Card, Col, Row, Space, Spin, Button, Checkbox, Form, Input, Radio, DatePicker} from "antd";
import {useState, useEffect} from 'react';
import {checkLogin} from "../utils/service";
import {getLocal} from "../utils/public";

function User() {
    const [state, setState] = useState({
        data: {},
        isLoading: false
    });

    const init = async () => {
        setState(pre => ({ ...pre, isLoading: true }));
        const cookie = getLocal('cookie');
        const {data} = await checkLogin({cookie: cookie});
        console.log(data);
        setState(pre => ({...pre, data: data, isLoading: false}))
    };

    useEffect(() => {
        init();
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="container">
            <Spin spinning={state.isLoading}>
                <Row>
                    <Col span={24}>
                        <Card style={{width: '1280px'}}>
                            {state.data.profile &&<Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 400,
                                }}
                                initialValues={state.data.profile}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="用户昵称"
                                    name="nickname"
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item label="性别" name="gender">
                                    <Radio.Group>
                                        <Radio value={0}> 保密 </Radio>
                                        <Radio value={1}> 男 </Radio>
                                        <Radio value={2}> 女 </Radio>
                                    </Radio.Group>
                                </Form.Item>


                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        保存
                                    </Button>
                                </Form.Item>
                            </Form>
                            }
                        </Card>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default User
