import React, { Component } from 'react';
import { Button, Input } from 'antd';

import styles from './Header.less';

class Header extends Component {
  render() {
    const { name, searchBtn, handleFormSubmit } = this.props;
    return (
      <div className={styles.searchs}>
        <Input
          className={styles.serchk}
          value={name}
          onChange={handleFormSubmit}
          placeholder="输入部名关键字搜索"
        />
        <Button className={styles.serch} type="primary" icon="search" onClick={searchBtn} />
      </div>
    );
  }
}

export default Header;
