import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import data from "./data";
import { Table, Switch, Space,Tag,Button } from "antd";

data?.map((content:any, index) => (content["key"] = index));
let datas:any = {};
data.forEach((content) => {
  if (content.reports_to) {
    if(!datas[content.reports_to]){
      datas[content.reports_to]={children:[]};
    }
    if (!datas[content.reports_to]?.children!)
      datas[content.reports_to]["children"] = [];
    datas[content.reports_to]?.children?.push({ ...content });
  } else {
    datas[content.mobile] = { ...content };
  }
});
let finalData :any[]= [];
Object.keys(datas).forEach((key) => {
  finalData.push(datas[key]);
});const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "mobile",
    dataIndex: "mobile",
    key: "mobile"
  },
  {
    title: "Role",
    dataIndex: "position",
    key: "position",
    width: "12%",
    render: (position:any) => {
     let color:any = position.length > 5 ? 'geekblue' : 'green';

     return( <>
        {/* {tags.map((tag:any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'Manager') {
            color = 'volcano';
          } */}

            <Tag color={color} key={position}>
              {position.toUpperCase()}
            </Tag>
          {/* ); */}
      </>);
    },
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "30%",
    key: "address"
  },
  {
    title: 'Action',
    key: 'action',
    render: (text:any, record:any) => (
      <Button size="middle" type="primary" onClick={()=>alert(record.name)}>
       Delete {record.name}
      </Button>
    ),
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys:any, selectedRows:any) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record:any, selected:any, selectedRows:any) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected:any, selectedRows:any, changeRows:any) => {
    console.log(selected, selectedRows, changeRows);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.position === 'Manager', // Column configuration not to be checked
    name: record.name,
  }),
};

const TreeData: React.FC = () => {
  const [checkStrictly, setCheckStrictly] = React.useState(false);
  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        CheckStrictly:{" "}
        <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={finalData}
      />
    </>
  );
}

export {TreeData}
