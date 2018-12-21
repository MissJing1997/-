import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import QueryPagination from 'src/components/QueryPagination';
import styles from './teamList.less';

class TeamList extends Component {
  render() {
    const { pageCount, total, list, curPage, pageSize } = this.props;
    return (
      <div className={styles.center}>
        <Row gutter={16}>
          {list.map((val, index) => {
            const key = `key-${index}`;
            return (
              <Col key={key} lg={6} md={12} sm={12} xs={24}>
                <div className={styles.banner}>
                  <Link to={`/staffManage/classList/${val.id}?departmentName=${val.name}`}>
                    <div className={styles.division}>
                      {/* <span className={styles.firstWord}>木</span> */}
                      <span className={styles.teamName}>{val.name}</span>
                    </div>
                    <div className={styles.newclass}>
                      <div className={styles.setof}>
                        <p className={styles.newName}>拥有小组</p>
                        <span className={styles.newNumber}>{val.teamCount}</span>
                      </div>
                      <div className={styles.setofs}>
                        <p className={styles.newName}>在场人数</p>
                        <span className={styles.newNumber}>{val.inCount}</span>
                      </div>
                      <div>
                        <p className={styles.newName}>离场人数</p>
                        <span className={styles.newNumber}>{val.outCount}</span>
                      </div>
                    </div>
                    <div className={styles.time}>
                      <span className={styles.creationTime}>创建时间 : </span>
                      <span> {moment(this.time).format('YYYY/MM/DD')} </span>
                    </div>
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
        {!!list.length && (
          <QueryPagination
            className={styles.pagings}
            showQuickJumper
            showSizeChanger
            current={curPage}
            pageSize={pageSize}
            defaultCurrent={pageCount}
            total={total}
          />
        )}
      </div>
    );
  }
}

export default TeamList;
