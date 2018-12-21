import React, { Component } from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';
import { getPageQuery } from 'src/utils/utils';

import styles from '../index.less';

const { MonthPicker } = DatePicker;

class Header extends Component {
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
    const defDate = dateString ? moment(dateString) : null;
    return (
      <div>
        <MonthPicker
          className={styles.month}
          onChange={this.onChange}
          placeholder="请选择月份"
          value={defDate}
        />
        <Button
          className={styles.search}
          type="primary"
          icon="search"
          onClick={this.handleFormSubmit}
        />
      </div>
    );
  }
}

export default Header;
