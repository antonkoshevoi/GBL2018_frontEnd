import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress as BaseLinearProgress, withStyles } from 'material-ui';

function LinearProgress({ classes, ...rest }) {
  return (
    <BaseLinearProgress
      {...rest}
      classes={classes}>
    </BaseLinearProgress>
  );
}

LinearProgress.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

LinearProgress = withStyles({
  primaryColor: {
    backgroundColor: '#c0d7ef'
  },
  primaryColorBar: {
    backgroundColor: '#589ee4'
  },
})(LinearProgress);

export default LinearProgress;


export const OldProgressBar = ({ ...props }) => {
    return (
        (props.type === 'performance') ?
        <div className="progress m-progress--sm">
              <div  title="Correct" className="progress-bar bg-danger" role="progressbar" style={{width: props.correctValue + '%'}}></div>
              <div title="In Correct" className="progress-bar bg-success" role="progressbar" style={{width: 100 - props.correctValue + '%'}}></div>
        </div>  :
            <div className="progress m-progress--sm">
              <div title="Complete" className="progress-bar bg-warning" role="progressbar" style={{width: props.complateValue + '%'}}></div>
              <div title="In Progress" className="progress-bar bg-success" role="progressbar" style={{width: props.progressValue + '%'}}></div>
            </div>
    )
}