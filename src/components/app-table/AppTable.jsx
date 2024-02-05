import {Empty, Table} from "antd";

function AppTable(props) {
    return (
        <>
            {props.data.length > 0 && <Table columns={props.columns} dataSource={props.data}></Table>}
            {props.data.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
        </>
    )
}

export default AppTable;
