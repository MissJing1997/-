import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AutoIcon from 'src/components/AutoIcon';
import { getPageQuery } from 'src/utils/utils';

import styles from './list.less';

export default class List extends Component {
  render() {
    const { list } = this.props;
    const { departmentName } = getPageQuery();
    return (
      <div>
        {list.map((val, index) => {
          const key = `key-${index}`;
          return (
            <div key={key} className={styles.center}>
              <div>
                <span className={styles.groupName}>{val.name}</span>
                <div className={styles.shirts}>
                  {val.isSpecial === 1 ? (
                    <div className={styles.give}>
                      <span style={{ color: '#FFFFFF' }}>特批</span>
                    </div>
                  ) : null}
                </div>
                <div className={styles.attend}>
                  <span>在组人数</span>
                  <span style={{ color: '#5088FF' }}>{val.inCount ? val.inCount : 0}</span>人
                </div>
                <div className={styles.departure}>
                  <span>离组人数</span>
                  <span style={{ color: '#5088FF' }}>{val.outCount ? val.outCount : 0}</span>人
                </div>
                <Link
                  to={`/staffManage/groupWorkerList/${val.id}?groupName=${
                    val.name
                  }&departmentName=${departmentName} `}
                >
                  <AutoIcon className={styles.iconc} type="icon-details" />
                </Link>
              </div>
              <div className={styles.btn}>
                <div className={styles.leader1}>
                  <div>
                    <span style={{ marginRight: '16px' }}>组长 : </span>
                    <span>{val.teamLeader}</span>
                  </div>
                  <div className={styles.linkman}>
                    <span>联系人 : </span>
                    <span>
                      &nbsp;
                      {val.contacts}
                    </span>
                  </div>
                </div>
                <div className={styles.leaderPhone1}>
                  <div>
                    <span style={{ marginRight: '17px' }}>组长电话 : </span>
                    <span>{val.teamLeaderPhone}</span>
                  </div>
                  <div className={styles.linkmanPhone1}>
                    <span style={{ marginRight: '4px' }}>联系人电话 : </span>
                    <span>{val.contactsPhone}</span>
                  </div>
                </div>
                <div className={styles.creationTime}>
                  <span>班创建时间 : </span>
                  <span>{moment(val.gmtCreate).format('YYYY-MM-DD')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
