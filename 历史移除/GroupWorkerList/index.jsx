import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Modal, Tooltip } from 'antd';
import { parse } from 'query-string';
import { getPageQuery } from 'src/utils/utils';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AutoIcon from 'src/components/AutoIcon';
import QueryPagination from 'src/components/QueryPagination';
import ProjectLayout from 'src/layouts/ProjectLayout';
import NoData from 'src/components/NoData';
import TeamList from './components/TeamList';
import Search from './components/Search.jsx';
import styles from './index.less';

@connect(({ groupWorkerList, teamList, loading }) => ({
  ...groupWorkerList,
  teamList,
  isLoading: loading.effects['groupWorkerList/detailList'],
}))
class GroupWorkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      record: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'groupWorkerList/detailList',
    });
  }

  showModal = record => {
    this.setState({
      visible: true,
      record,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'teamList/allTeam',
    });
  };

  handleOk = data => {
    const { record } = this.state;
    const { dispatch } = this.props;
    this.setState({ visible: false });
    dispatch({
      type: 'groupWorkerList/workerMoveTeam',
      payload: {
        ...data,
        teamId: record.teamId,
        departmentId: record.departmentId,
        workerId: record.workerId,
      },
    }).then(this.info1);
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  Stick = workerId => {
    const { dispatch, match } = this.props;
    const { teamId } = match.params;
    dispatch({
      type: 'groupWorkerList/workerEditTop',
      payload: {
        workerId,
        teamId,
      },
    });
  };

  info1 = () => {
    const { dispatch } = this.props;
    const { record } = this.state;
    dispatch({
      type: 'groupWorkerList/workerMove',
      payload: {
        workerId: record.workerId,
        teamId: record.teamId,
      },
    }).then(this.info2);
  };

  info2 = () => {
    const { params } = this.props;
    const { record } = this.state;
    Modal.info({
      width: '400px',
      iconType: 'none',
      centered: true,
      content: (
        <div>
          <h2 style={{ color: '#888888', marginLeft: '-24px' }}>温馨提示</h2>
          <p style={{ marginLeft: '-24px' }}>
            [{record.name}
            ]已成功移至[
            {params.departmentIdTargetName}] 下 [{params.teamIdTargetName}]
          </p>
        </div>
      ),
    });
  };

  info = () => {
    Modal.info({
      width: '400px',
      iconType: 'none',
      centered: true,
      content: (
        <div>
          <h2 style={{ color: '#888888', marginLeft: '-24px' }}>温馨提示</h2>
          <p style={{ marginLeft: '-24px' }}>该人员本月已移组，请勿再次操作</p>
        </div>
      ),
    });
  };

  info3 = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'groupWorkerList/workerMove',
      payload: {
        workerId: record.workerId,
        teamId: record.teamId,
      },
    });
  };

  onSubmit = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'groupWorkerList/detailList',
      values,
    });
  };

  render() {
    const { visible, record } = this.state;
    const { teamList, params } = this.props;
    const { provinceList } = teamList;
    const { list, curPage, pageSize, pageCount, total, isLoading } = this.props;
    const { search } = location;
    const { groupName } = getPageQuery();
    const columns = startCount => [
      {
        title: '序号',
        dataIndex: 'number',
        render: (text, record1, index) => {
          const count = startCount + index;
          return count < 10 ? `0${count}` : count;
        },
      },
      {
        title: '工人姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '身份证号',
        dataIndex: 'idCard',
        key: 'idCard',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '工种',
        align: 'center',
        dataIndex: 'workerTypeText',
        key: 'workerTypeText',
      },
      {
        title: '入场状态',
        align: 'center',
        dataIndex: 'inGroupState',
        key: 'inGroupState',
        render: (text, cord) =>
          text === 2 ? (
            <Tooltip
              title={
                params.leaveType === 1
                  ? `[${cord.name}]已成功移至[${params.departmentIdTargetName}] 下 [${
                      params.teamIdTargetName
                    }]`
                  : `[${cord.name}]已于[${moment(params.leaveTime).format('YYYY-MM-DD')}]离场`
              }
            >
              <span
                onMouseEnter={() => {
                  this.info3(cord);
                }}
                style={{ color: '#FF5B3B' }}
              >
                离组
              </span>
            </Tooltip>
          ) : (
            <span style={{ color: '#333333' }}>在组</span>
          ),
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'workerId',
        key: 'workerId',
        render: (text, record1, index) => {
          const isTop = (!curPage || curPage === 1) && index === 0;
          return (
            <div>
              <AutoIcon
                onClick={isTop ? null : () => this.Stick(text)}
                className={isTop ? styles.iconc : styles.iconc1}
                type="icon-top"
              />
              {record1.isCanMove === 1 ? (
                <AutoIcon
                  onClick={() => {
                    this.showModal(record1);
                  }}
                  className={styles.iconc2}
                  type="icon-move"
                />
              ) : (
                <AutoIcon onClick={this.info} className={styles.iconc3} type="icon-move" />
              )}
              <Link to={`/staffManage/groupWorkerDetail/${record1.teamId}/${record1.workerId}`}>
                <AutoIcon className={styles.iconc4} type="icon-details" />
              </Link>
            </div>
          );
        },
      },
    ];

    return (
      <ProjectLayout
        title={groupName}
        content={<Search {...parse(search)} onSubmit={this.onSubmit} />}
      >
        <div className={styles.contentBox}>
          {list.length ? (
            <div className={styles.content}>
              <Table
                dataSource={list}
                pagination={false}
                columns={columns((curPage - 1) * pageSize + 1)}
              />
              <div className={styles.page}>
                <QueryPagination
                  className={styles.paging}
                  showQuickJumper
                  current={curPage}
                  pageSize={pageSize}
                  defaultCurrent={pageCount}
                  total={total}
                />
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '20px' }}>
              <NoData
                icon="icon-group"
                Loading={isLoading}
                text="您的小组还没有成员，请到信息采集机那里去录入成员吧"
              />
            </div>
          )}
          <TeamList
            visible={visible}
            record={record}
            provinceList={provinceList}
            onOk={this.showModal}
            handleOk={this.handleOk}
            onCancel={this.onCancel}
          />
        </div>
      </ProjectLayout>
    );
  }
}

export default GroupWorkerList;
