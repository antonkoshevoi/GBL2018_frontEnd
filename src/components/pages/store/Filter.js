import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button, ClickAwayListener, Grow, Icon, IconButton, Input, InputAdornment, MenuItem, MenuList, Paper,
    withStyles
} from "material-ui";
import {Manager, Popper, Target} from "react-popper";
import classNames from 'classnames';
import {NavLink} from "react-router-dom";
import {Search} from "material-ui-icons";

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
        subjectIsOpen: false,
        sotByIsOpen: false,
    };



    handleClose = (menu) => {
        this.setState({ [menu]: false });
    };




    handleClick = (menu) => {
        this.setState({ [menu]: true });
    };


    render() {
        const { classes } = this.props;
        const {categoryIsOpen,subjectIsOpen,sortByIsOpen} = this.state;

        return (
            <div className="col-md-12 ">
                <div className="row">
                    <div className="col-md-8 store-filter">
                        <Manager>
                            <Target>
                                <Button
                                    className={classes.button}
                                    aria-owns={categoryIsOpen ? 'menu-list' : null}
                                    aria-haspopup="true"
                                    style={{height:'50px'}}
                                    onClick={() => {this.handleClick("categoryIsOpen")}}
                                >
                                    Category > Age
                                    <span className="btn-icon la la-angle-down"></span>
                                </Button>
                            </Target>
                            <Popper
                                placement="bottom-start"
                                eventsEnabled={categoryIsOpen}
                                className={classNames({ [classes.popperClose]: !categoryIsOpen },'popperDropMenu') }
                            >
                                <ClickAwayListener  onClickAway={() => {this.setState({categoryIsOpen:false})}}>
                                    <Grow in={categoryIsOpen} style={{ transformOrigin: '0 0 0' }}>
                                        <Paper>
                                            <MenuList role="menu">
                                                <MenuItem  onClick={() => {this.handleClose("categoryIsOpen")}}>Any</MenuItem>
                                                <MenuItem  onClick={() => {this.handleClose("categoryIsOpen")}}>Kindergarten</MenuItem>
                                                <MenuItem  onClick={() => {this.handleClose("categoryIsOpen")}}>Elementary</MenuItem>
                                                <MenuItem  onClick={() => {this.handleClose("categoryIsOpen")}}>High School</MenuItem>
                                            </MenuList>
                                        </Paper>
                                    </Grow>
                                </ClickAwayListener>
                            </Popper>
                        </Manager>
                        <div className="store-filter-divider"></div>
                        <Manager>
                            <Target>
                                <Button
                                    className={classes.button}
                                    aria-owns={subjectIsOpen ? 'menu-list' : null}
                                    aria-haspopup="true"
                                    style={{height:'50px'}}
                                    onClick={() => {this.handleClick("subjectIsOpen")}}
                                >
                                    Subject
                                    <span className="btn-icon la la-angle-down"></span>
                                </Button>
                            </Target>
                            <Popper
                                placement="bottom-start"
                                eventsEnabled={subjectIsOpen}
                                className={classNames({ [classes.popperClose]: !subjectIsOpen },'popperDropMenu') }
                            >
                                <ClickAwayListener  onClickAway={() => {this.setState({subjectIsOpen:false})}}>
                                    <Grow in={subjectIsOpen} style={{ transformOrigin: '0 0 0' }}>
                                        <Paper>
                                            <MenuList role="menu">
                                                <MenuItem  onClick={() => {this.handleClose("subjectIsOpen")}}>English as a second Language</MenuItem>
                                                <MenuItem  onClick={() => {this.handleClose("subjectIsOpen")}}>Arithmetic</MenuItem>
                                            </MenuList>
                                        </Paper>
                                    </Grow>
                                </ClickAwayListener>
                            </Popper>
                        </Manager>
                        <div className="store-filter-divider"></div>
                        <div className="filter-buttons">
                            <NavLink to="/store/category/courses"><Button>All</Button></NavLink>
                            <NavLink to="/store/products/newest"><Button>Newest</Button></NavLink>
                            <NavLink to="/store/products/newest"><Button>Most Popular</Button></NavLink>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-xs-8 col-md-8 text-right">
                                <Input
                                    className=" store-search"
                                    id="search"
                                    type='search'
                                    placeholder="Search"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            >
                                                <Search/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                            <div className="col-xs-4 col-md-4 text-right">
                                <Manager>
                                    <Target>
                                        <Button
                                            className={classes.button}
                                            aria-owns={sortByIsOpen ? 'menu-list' : null}
                                            aria-haspopup="true"
                                            style={{height:'50px'}}
                                            onClick={() => {this.handleClick("sortByIsOpen")}}
                                        >
                                            Sort By:
                                            <span className="btn-icon la la-sort-amount-desc"></span>
                                        </Button>
                                    </Target>
                                    <Popper
                                        placement="bottom-start"
                                        eventsEnabled={sortByIsOpen}
                                        className={classNames({ [classes.popperClose]: !sortByIsOpen },'popperDropMenu') }
                                    >
                                        <ClickAwayListener  onClickAway={() => {this.setState({sortByIsOpen:false})}}>
                                            <Grow in={sortByIsOpen} style={{ transformOrigin: '0 0 0' }}>
                                                <Paper>
                                                    <MenuList role="menu">
                                                        <MenuItem  onClick={() => {this.handleClose("sortByIsOpen")}}>Price: lowest to high</MenuItem>
                                                        <MenuItem  onClick={() => {this.handleClose("sortByIsOpen")}}>Price: high to lowest</MenuItem>
                                                        <MenuItem  onClick={() => {this.handleClose("sortByIsOpen")}}>Latest added</MenuItem>
                                                        <MenuItem  onClick={() => {this.handleClose("sortByIsOpen")}}>High rating</MenuItem>
                                                    </MenuList>
                                                </Paper>
                                            </Grow>
                                        </ClickAwayListener>
                                    </Popper>
                                </Manager>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

Filter.propTypes = {};

export default withStyles(styles)(Filter);
