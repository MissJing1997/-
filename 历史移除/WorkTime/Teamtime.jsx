import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { getPageQuery } from 'src/utils/utils';
import { Link } from 'dva/router';
import ListContent from 'src/components/ListContent/index';
import TextLbel from 'src/components/TextLabel';
import AutoIcon from 'src/components/AutoIcon';
import ProjectLayout from '../../../../layouts/ProjectLayout';
import Headerworking from './components/Headerworking';
import styles from './Teamtime.less';

@connect(({ workerAttendWorkingList }) => ({
  data: workerAttendWorkingList,
}))
export default class Teamtime extends Component {

  handleFormSubmit = data => {
    const { dispatch } = this.props;
    const month = data;
    dispatch({
      type: 'workerAttendWorkingList/getSearch',
      data: {month},
    });
  };

  render() {
    const { data, dispatch, match } = this.props;
    const { teamId } = match.params;
    const { curPage, workerStatisticalData, pageSize } = data;
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
        className: styles.table1,
        dataIndex: 'workerName',
        render: value => <TextLbel className={styles.overflow} text={value} />,
      },
      {
        title: '身份证号',
        align: 'center',
        dataIndex: 'idCard',
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
        title: '工时',
        dataIndex: 'totalWorkingHours',
        align: 'center',
        render: text => {
          return (
            <span>
              {text}
              工时
            </span>
          );
        },
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
              to={`/attend/teamtime/detail/${record.teamId}/${
                record.workerId
              }?worktime=1&teamName=${teamName}`}
            >
              <AutoIcon style={{ fontSize: '24px', color: '#BBBBBB' }} type="icon-details" />
            </Link>
          </span>
        ),
      },
    ];

    return (
      <ProjectLayout
        title={teamName}
        action={
          <>
            <Button type="primary">下载此表单</Button>
            <Button type="primary">打印此表单</Button>
          </>
        }
        content={
          <Headerworking
            working={{ workerStatisticalData }}
            handleFormSubmit={this.handleFormSubmit}
          />
        }
      >
        <ListContent
          columns={columns((curPage - 1) * pageSize + 1)}
          namespace="workerAttendWorkingList"
          initParams={{ teamId }}
          dispatch={dispatch}
          model={data}
          rowKey="teamId"
          emptyConfig={{
            icon: 'icon-man-hour',
            text: '您的项目下所属的各班组还没有人员的考勤记录',
          }}
        />
      </ProjectLayout>
    );
  }
}
