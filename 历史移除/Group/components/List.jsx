import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import AutoIcon from 'src/components/AutoIcon';
import moment from 'moment';
import { getPageQuery } from 'src/utils/utils';
import styles from './List.less';

class List extends Component {
  render() {
    const { list } = this.props;
    const { name } = getPageQuery();
    return (
      <div>
        {list.map((val, index) => {
          const key = `key-${index}`;
          return (
            <div key={key} className={styles.center}>
              <Row>
                <Col span={24}>
                  <span className={styles.groupName}>{val.teamName}</span>
                </Col>
              </Row>
              <Link to={`/attend/teamworking/${val.teamId}?teamName=${val.teamName}&name=${name}`}>
                <AutoIcon
                  style={{ fontSize: '24px', color: '#BBBBBB', float: 'right' }}
                  type="icon-details"
                />
              </Link>
              <div className={styles.days}>
                <div className={styles.team}>
                  <span>班组总出勤天数 : </span>
                  <span style={{ color: '#313131' }}>{val.totalAttendanceDays}天</span>
                </div>
                <div className={styles.attendance}>
                  <span>异常出勤天数 : </span>
                  <span style={{ color: '#313131' }}>{val.totalAbnormalDays}天</span>
                </div>
                <div className={styles.personnel}>
                  <span>在组人数 : </span>
                  <span style={{ color: '#313131' }}>{val.inCount}人</span>
                </div>
                <div className={styles.personnel}>
                  <span>离组人数 : </span>
                  <span style={{ color: '#313131' }}>{val.outCount}人</span>
                </div>
                <div className={styles.timede}>
                  <span>时间 : </span>
                  <span style={{ color: '#313131' }}>
                    {' '}
                    {moment(val.startDate).format('YYYY-MM-DD')}{' '}
                  </span>{' '}
                  ~
                  <span style={{ color: '#313131' }}>
                    {' '}
                    {moment(val.endDate).format('YYYY-MM-DD')}{' '}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default List;
