import React, { Component } from 'react';
import { Modal, Button, Collapse, Radio } from 'antd';
import styles from './TeamList.less';

const { Panel } = Collapse;
const { Group } = Radio;

export default class TeamList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      teamIdTarget: '',
      departmentIdTarget: '',
      departmentTargetId: '',
    };
  }

  onChange = ({ teamIdTarget, departmentIdTarget }) => {
    this.setState({
      teamIdTarget,
      departmentIdTarget,
    });
  };

  target = e => {
    this.setState({
      departmentTargetId: e,
    });
  };

  handleOk = () => {
    const { handleOk } = this.props;

    this.setState({
      teamIdTarget: '',
      departmentIdTarget: '',
    });
    handleOk(this.state);
  };

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      teamIdTarget: '',
      departmentIdTarget: '',
    });
    onCancel(this.state);
  };

  render() {
    const { visible, loading, onOk, onCancel, provinceList, record } = this.props;
    const { list } = provinceList;
    let { teamIdTarget, departmentTargetId } = this.state;
    if (!teamIdTarget && record.teamId) {
      teamIdTarget = record.teamId;
    }
    if (!departmentTargetId && record.departmentId) {
      departmentTargetId = record.departmentId;
    }
    return (
      <div>
        <Modal
          visible={visible}
          title="请选择要将人员移动到的班组"
          onOk={onOk}
          onCancel={onCancel}
          className={styles.box}
          footer={[
            <Button key="back" onClick={this.onCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              确认
            </Button>,
          ]}
        >
          <Collapse bordered={false} activeKey={departmentTargetId} onChange={this.target}>
            {list &&
              list.map(department => (
                <Panel
                  disabled={department.teamList.length === 0}
                  key={department.departmentId}
                  header={department.departmentName}
                >
                  <Group
                    value={teamIdTarget}
                    onChange={e =>
                      this.onChange({
                        teamIdTarget: e.target.value,
                        departmentIdTarget: department.departmentId,
                      })
                    }
                  >
                    {department.teamList.map(group => (
                      <Radio key={group.teamId} className={styles.choice} value={group.teamId}>
                        {group.teamName}
                      </Radio>
                    ))}
                  </Group>
                </Panel>
              ))}
          </Collapse>
        </Modal>
      </div>
    );
  }
}
