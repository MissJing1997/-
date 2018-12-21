import React, { Component } from 'react';
import { connect } from 'dva';
import ProjectLayout from 'src/layouts/ProjectLayout';
import { getPageQuery } from 'src/utils/utils';
import ListContent from 'src/components/ListContent/index';
import GroupList from 'src/pages/components/Attend/AttendanceList/GroupList';
import Header from './components/HeaderClassList';
import styles from './ClassList.less';

@connect(({ workerAttendClassList, projectList }) => ({
  workerAttendClassList,
  projectList,
}))
export default class ClassList extends Component {
  constructor(props) {
    super(props);
    const { name } = getPageQuery();
    this.state = {
      name,
    };
    /* this.statisticsTime = query === '/attend/classlist' ? '出勤统计时间' : '工时统计时间';
    this.pathName = query === '/attend/classlist' ? '/attend/group' : '/attend/worktime';
    this.time =
      query === '/attend/classlist' ? props.workerAttendClassList.attendanceDate : props.workerAttendClassList.workHoursDate; */
  }

  handleFormSubmit = e => {
    this.setState({
      name: e.target.value,
    });
  };

  searchBtn = () => {
    const { name } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'workerAttendClassList/getSearch',
      data:{name},
    });
  };

  render() {
    const { workerAttendClassList, dispatch, projectList } = this.props;
    return (
      <ProjectLayout title="部名录">
        <div className={styles.center}>
          <Header
            {...this.state}
            searchBtn={this.searchBtn}
            handleFormSubmit={this.handleFormSubmit}
          />
          <ListContent
            renderItem={(item) => <GroupList {...item} />}
            namespace="workerAttendClassList"
            initParams={{ projectId: projectList.currPro ? projectList.currPro.id : '' }}
            dispatch={dispatch}
            model={workerAttendClassList}
            rowKey="id"
            listConfig={{grid: { gutter: 16, column: 4 }}}
            emptyConfig={{
              icon: 'icon-man-hour',
              text: '您的项目下所属的各班组还没有人员的考勤记录',
            }}
          />
        </div>
      </ProjectLayout>
    );
  }
}
