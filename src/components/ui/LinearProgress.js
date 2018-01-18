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