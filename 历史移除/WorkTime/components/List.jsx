import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AutoIcon from 'src/components/AutoIcon';
import { getPageQuery } from 'src/utils/utils';
import styles from './List.less';

class List extends Component {
  render() {
    const { list } = this.props;
    const { name } = getPageQuery();
    return (
      <div>
        {list.map((val, index) => {
          const key = `item-${index}`;
          return (
            <div key={key} className={styles.center}>
              <Row>
                <Col span={24}>
                  <span className={styles.team}>{val.teamName}</span>
                </Col>
              </Row>
              <Link to={`/attend/teamtime/${val.teamId}?teamName=${val.teamName}&name=${name}`}>
                <AutoIcon
                  style={{ fontSize: '24px', color: '#BBBBBB', float: 'right' }}
                  type="icon-details"
                />
              </Link>
              <div className={styles.days}>
                <div className={styles.cumulative}>
                  <span>累计工时 : </span>
                  <span className={styles.hours} style={{ color: '#313131' }}>
                    {val.totalWorkingHours}
                    小时
                  </span>
                </div>
                <div className={styles.people} style={{ width: '150px' }}>
                  <span>技工工时 : </span>
                  <span className={styles.hours} style={{ color: '#313131' }}>
                    {val.totalTechnicalWorkingHours}
                    小时
                  </span>
                </div>
                <div className={styles.people} style={{ width: '140px' }}>
                  <span>普工工时 : </span>
                  <span className={styles.hours} style={{ color: '#313131' }}>
                    {val.totalGeneralWorkingHours}
                    小时
                  </span>
                </div>
                <div className={styles.people} style={{ width: '110px' }}>
                  <span>在组人数 : </span>
                  <span className={styles.hours} style={{ color: '#313131' }}>
                    {val.inCount}人
                  </span>
                </div>
                <div className={styles.people} style={{ width: '110px' }}>
                  <span>离组人数 : </span>
                  <span className={styles.hours} style={{ color: '#313131' }}>
                    {val.outCount}人
                  </span>
                </div>
                <div className={styles.people} style={{ width: '224px' }}>
                  <span>时间 : </span>
                  <span className={styles.hours} style={{ color: '#313131' }}>
                    {' '}
                    {moment(val.startDate).format('YYYY-MM-DD')}{' '}
                  </span>{' '}
                  ~
                  <span className={styles.hours} style={{ color: '#313131' }}>
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
