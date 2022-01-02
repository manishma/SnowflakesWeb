import { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { Snowflake } from "./snowflakesSlice";
import styles from "./Snowflakes.module.css"

interface SnowflakesStateProps {
  snowflakes: (Snowflake)[];
}

interface SnowflakesDispatchProps {
}

interface SnowflakesOwnProps {

}

class SnowflakesRaw extends Component<SnowflakesStateProps & SnowflakesDispatchProps &SnowflakesOwnProps> {

  render() {
    return this.props.snowflakes.map((snowflake) => <img src={snowflake.imgDataUrl} style={{left: snowflake.left, top: snowflake.top, transform: `rotate(${snowflake.rotation}deg)`, height: snowflake.size, width: snowflake.size}} className={styles.snowflake} key={snowflake.id} />);
  }
}

export const Snowflakes = connect<SnowflakesStateProps, SnowflakesDispatchProps, SnowflakesOwnProps, RootState>( 
  (state: RootState) => {
    return {
      snowflakes: state.snowflakes.snowflakes,
    };
  }, 
  (dispatch) => {
    return {
    };
  }, 
  )(SnowflakesRaw)