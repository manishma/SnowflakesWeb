import { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../app/store";
import styles from './Stage.module.css';
import { getStageBackgroundColor } from "./stageAPI";
import { tick } from "./stageSlice";

interface StageStateProps {
  background: any;
}

interface StageDispatchProps {
  tick():void;
}

interface StageOwnProps {

}

class StageRaw extends Component<StageStateProps & StageDispatchProps & StageOwnProps> {

  requestAnimationFrame() {
    this.props.tick();
    window.requestAnimationFrame(() => this.requestAnimationFrame());
  }
  
  componentDidMount() {
    this.requestAnimationFrame();
  }

  render() {
    return <div style={{background: this.props.background}} className={styles.stage}> + {this.props.children} + </div>;
  }
}
export const Stage = connect<StageStateProps, StageDispatchProps, StageOwnProps, RootState>(
  (state) => {
    return {
      background: getStageBackgroundColor(state.stage.timestamp),
    };
  },
  (dispatch) => {
    return {
      tick: () => dispatch(tick( {
        timestamp: new Date().getTime(),
        stageWidth: window.innerWidth,
        stageHeight: window.innerHeight,
      })),
    };
  }
)(StageRaw)