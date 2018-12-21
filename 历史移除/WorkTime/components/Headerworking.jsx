import React, { Component } from 'react';
import { Button, Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import { getPageQuery } from 'src/utils/utils';
import styles from '../Teamtime.less';

const { MonthPicker } = DatePicker;

class Headerworking extends Component {
  constructor(props) {
    super(props);
    const { month } = getPageQuery();
    this.state = {
      dateString: month,
    };
  }

  onChange = (date, dateString) => {
    this.setState({
      dateString,
    });
  };

  handleFormSubmit = () => {
    const { handleFormSubmit } = this.props;
    const { dateString } = this.state;

    const data = dateString;

    handleFormSubmit(data);
  };

  render() {
    const { dateString } = this.state;
    const { working } = this.props;
    const { workerStatisticalData } = working;
    const defDate = dateString ? moment(dateString) : null;
    return (
      <div>
        <Row>
          <MonthPicker
            className={styles.month}
            onChange={this.onChange}
            placeholder="请选择月份"
            value={defDate}
          />
          <Button
            className={styles.serch}
            type="primary"
            icon="search"
            onClick={this.handleFormSubmit}
          />
        </Row>
        {workerStatisticalData && (
          <Row className={styles.marTop}>
            <Col span={6} className={styles.time2}>
              <span>开始时间 </span> :{' '}
              <span> {moment(workerStatisticalData.startDate).format('YYYY-MM-DD')} </span>
              <span> ~ </span>
              <span> 结束时间 </span> :{' '}
              <span> {moment(workerStatisticalData.endDate).format('YYYY-MM-DD')} </span>
            </Col>
            <Col span={3}>
              <span className={styles.manhour}>累计工时</span>
              &nbsp;:&nbsp;
              <span className={styles.time}>{workerStatisticalData.totalAttendanceHours}天</span>
            </Col>
            <Col span={3}>
              <span className={styles.manhour}>技工工时</span>
              &nbsp;:&nbsp;
              <span className={styles.time}>
                {workerStatisticalData.totalTechnicalWorkingHours}天
              </span>
            </Col>
            <Col span={3}>
              <span className={styles.manhour}>普工工时</span>
              &nbsp;:&nbsp;
              <span className={styles.time}>
                {workerStatisticalData.totalGeneralWorkingHours}天
              </span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default Headerworking;
