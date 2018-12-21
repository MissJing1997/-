import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { getPageQuery } from 'src/utils/utils';
import ListContent from 'src/components/ListContent/index';
import TeamList from 'src/pages/components/Attend/AttendanceList/TeamList';
import ProjectLayout from '../../../../layouts/ProjectLayout';
import Header from './components/Header';

@connect(({ workerAttendTeamList }) => ({
  data: workerAttendTeamList,
}))
export default class GropAttendance extends Component {

  handleFormSubmit = data => {
    const { dispatch } = this.props;
    const month = data;
    dispatch({
      type: 'workerAttendTeamList/getSearch',
      data:{month},
    });
  };

  render() {
    const { data, dispatch, match } = this.props;
    const { departmentId } = match.params;
    const { name } = getPageQuery();
    return (
      <ProjectLayout
        title={name}
        action={
          <>
            <Button type="primary">下载此表单</Button>
            <Button type="primary">打印此表单</Button>
          </>
        }
        content={<Header handleFormSubmit={this.handleFormSubmit} />}
      >
        <ListContent
          renderItem={item => <TeamList {...item} />}
          namespace="workerAttendTeamList"
          initParams={{ departmentId }}
          dispatch={dispatch}
          model={data}
          rowKey="departmentId"
          emptyConfig={{
            icon: 'icon-man-hour',
            text: '您的项目下所属的各班组还没有人员的考勤记录',
          }}
        />
      </ProjectLayout>
    );
  }
}
