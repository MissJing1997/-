import React, { Component } from 'react';
import { Button, Input } from 'antd';

import styles from '../ClassList.less';

class Header extends Component {
  render() {
    const { name, searchBtn, handleFormSubmit } = this.props;
    return (
      <div>
        <Input
          className={styles.month}
          value={name}
          onChange={handleFormSubmit}
          placeholder="输入班名关键字搜索"
        />
        <Button className={styles.search} type="primary" icon="search" onClick={searchBtn} />
      </div>
    );
  }
}

export default Header;
