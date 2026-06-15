import {Empty, Table} from "antd";

function AppTable(props) {
    const { data, columns } = props
    return (
        <>
            {data.length > 0 && <Table columns={columns} dataSource={data}></Table>}
            {data.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
        </>
    )
}

export default AppTable;
