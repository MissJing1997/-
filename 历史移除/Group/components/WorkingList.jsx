import React, { Component } from 'react';
import { Table } from 'antd';
import { Link } from 'dva/router';
import TextLbel from 'src/components/TextLabel';
import AutoIcon from 'src/components/AutoIcon';
import { getPageQuery } from 'src/utils/utils';
import styles from './WorkingList.less';

const { teamName } = getPageQuery();

const columns = startCount => [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'number',
    render: (text, record, index) => {
      const count = startCount + index;
      return count < 10 ? `0${count}` : count;
    },
  },
  {
    title: '工人姓名',
    dataIndex: 'workerName',
    render: value => <TextLbel className={styles.overflow} text={value} />,
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    align: 'center',
  },
  {
    title: '联系电话',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '工种',
    align: 'center',
    dataIndex: 'workerTypeText',
  },
  {
    title: '有效出勤',
    dataIndex: 'attendanceDays',
    key: 'address',
    align: 'center',
  },
  {
    title: '异常出勤',
    dataIndex: 'abnormalDays',
    align: 'center',
  },
  {
    title: '入场状态',
    align: 'center',
    dataIndex: 'approachStatuText',
    render: text => {
      return <span style={{ color: text === '在组' ? '#333333' : '#FF5B3B' }}>{text}</span>;
    },
  },
  {
    title: '操作',
    align: 'center',
    render: (value, record) => (
      <span>
        <Link
          to={`/attend/teamworking/detail/${record.teamId}/${record.workerId}?teamName=${teamName}`}
        >
          <AutoIcon style={{ fontSize: '24px', color: '#BBBBBB' }} type="icon-details" />
        </Link>
      </span>
    ),
  },
];

class WorkingList extends Component {
  render() {
    const { workerAttendanceList, startCount } = this.props;
    return (
      <div className={styles.root}>
        <Table columns={columns(startCount)} dataSource={workerAttendanceList} pagination={false} />
      </div>
    );
  }
}

export default WorkingList;
