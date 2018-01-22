import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, ClickAwayListener, Grow, Icon, MenuItem, MenuList, Paper, withStyles} from "material-ui";
import {Manager, Popper, Target} from "react-popper";
import classNames from 'classnames';
import {NavLink} from "react-router-dom";

const styles = {
    root: {
        display: 'flex',
    },
    popperClose: {
        pointerEvents: 'none',
    },
};

class Filter extends Component {

    state = {
        categoryIsOpen: false,
    };



    handleClose = () => {
        this.setState({ categoryIsOpen: false });
    };




    handleClick = () => {
        this.setState({ categoryIsOpen: true });
    };


    render() {
        const { classes } = this.props;
        const {categoryIsOpen} = this.state;

        return (
            <div className="col-md-12 store-filter">
                <Manager>
                    <Target>
                        <Button
                            className={classes.button}
                            aria-owns={categoryIsOpen ? 'menu-list' : null}
                            aria-haspopup="true"
                            style={{height:'50px'}}
                            onClick={this.handleClick}
                        >
                            Category
                            <span className="btn-icon la la-angle-down"></span>
                        </Button>
                    </Target>
                <Popper
                    placement="bottom-start"
                    eventsEnabled={categoryIsOpen}
                    className={classNames({ [classes.popperClose]: !categoryIsOpen },'popperDropMenu') }
                >
                    <ClickAwayListener  onClickAway={this.handleClose}>
                        <Grow in={categoryIsOpen} style={{ transformOrigin: '0 0 0' }}>
                            <Paper>
                                <MenuList role="menu">
                                    <MenuItem onClick={this.handleClose}>Any</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Kindergarten</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Elementary</MenuItem>
                                    <MenuItem onClick={this.handleClose}>High School</MenuItem>
                                </MenuList>
                            </Paper>
                        </Grow>
                    </ClickAwayListener>
                </Popper>
            </Manager>
                <div className="store-filter-divider"></div>
                <div className="filter-buttons">
                    <NavLink to="/store"><Button>All</Button></NavLink>
                    <NavLink to="/store/products/newest"><Button>Newest</Button></NavLink>
                    <NavLink to="/store/products/newest"><Button>Most Popular</Button></NavLink>
                </div>

            </div>
        );
    }
}

Filter.propTypes = {};

export default withStyles(styles)(Filter);
