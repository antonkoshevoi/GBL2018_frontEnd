import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button, ClickAwayListener, Grow, Icon, IconButton, Input, InputAdornment, Menu, MenuItem, MenuList, Paper,
  withStyles
} from "material-ui";
import {Manager, Popper, Target} from "react-popper";
import classNames from 'classnames';
import {NavLink} from "react-router-dom";
import {Search} from "material-ui-icons";
import red from "material-ui/es/colors/red";
import {buildSortersQuery} from "../../../helpers/utils";

const styles = {
  root: {
    display: 'flex',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  inputLabelFocused: {
    color: red[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: red[500],
    },
  }
};


class Filter extends Component {

  state = {
    categoryIsOpen: false,
    subjectIsOpen: false,
    sotByIsOpen: false,
    categoryMenu: null,
    subjectMenu: null,
    sortMenu: null,
    params: {
      filter: {
        name: '',
        title: ''
      },
      orderBy: {}
    },
    sorters: {}
  };


  componentDidMount(){
    const {type} = this.props;
    if (type === 'newest') {
      this._selectSorterDesc('created');
    }
  }


  componentWillReceiveProps(nextProps){
    if (!nextProps.isActive) {
      this._resetAll();
    }
  }


  _resetFilters() {
    this.setState({
        params:{...this.state.params,
        filter:{name:'',title:''},
      }
    })
  }

  _resetSorters() {
    this.setState({
          params:{...this.state.params,
          orderBy:{}
        },
          sorters:{}
    })
  }

  _resetAll(){
    this._resetFilters();
    this._resetSorters();
  }


  handleMenuClick = (event, menu) => {
    this.setState({[menu]: event.currentTarget});
  };

  handleMenuClose = (event, menu) => {
    this.setState({[menu]: null});
  };


  _searchBarChange = (e) => {
    this.setState({params: {...this.state.params, filter: {...this.state.params.filter, title: e.target.value}}});
  }

  _initFilter = () => {
    let {params} = this.state;
    this.props.onChange(params);
  }

  _selectSorter = (name) => {
    let sorters = {};

    if (this.state.sorters[name]) {
      sorters[name] = this.state.sorters[name] === 'asc' ? 'desc' : 'asc';
    } else {
      sorters[name] = 'desc';
    }

    this.setState({sorters})
    this.setState({
      params: {
        ...this.state.params,
        filter: {...this.state.params.filter},
        orderBy: buildSortersQuery(sorters)
      }
    }, this._initFilter);
  }

  _selectSorterDesc = (name) => {
    let sorters = {};

    sorters[name] = 'desc';

    this.setState({sorters})
    this.setState({
      params: {
        ...this.state.params,
        filter: {...this.state.params.filter},
        orderBy: buildSortersQuery(sorters)
      }
    }, this._initFilter);
  }


  render() {
    const {classes, isActive, type} = this.props;
    const {categoryMenu, subjectMenu, sortMenu, sorters} = this.state;

    return (
      <div className="col-md-12 ">
        <div className="row">
          <div className="col-md-12 col-lg-8 store-filter left-block">

            <div className="filterMenu">
              <Button
                aria-owns={categoryMenu ? 'category-menu' : null}
                aria-haspopup="true"
                onClick={(e) => {
                  this.handleMenuClick(e, 'categoryMenu')
                }}
              >
                Category > Age <i className="m--margin-left-10 fa fa-chevron-down"></i>
              </Button>
              <Menu
                id="category-menu"
                anchorEl={categoryMenu}
                open={Boolean(categoryMenu)}
                onClose={(e) => {
                  this.handleMenuClose(e, 'categoryMenu')
                }}
              >
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu')
                }}>Any</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu')
                }}>Kindergarten</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu')
                }}>Elementary</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu')
                }}>High School</MenuItem>
              </Menu>
            </div>
            <div className="store-filter-divider"></div>
            <div className="filterMenu">
              <Button
                aria-owns={subjectMenu ? 'subject-menu' : null}
                aria-haspopup="true"
                onClick={(e) => {
                  this.handleMenuClick(e, 'subjectMenu')
                }}
              >
                Subject <i className="m--margin-left-10 fa fa-chevron-down"></i>
              </Button>
              <Menu
                id="subject-menu"
                anchorEl={subjectMenu}
                open={Boolean(subjectMenu)}
                onClose={(e) => {
                  this.handleMenuClose(e, 'subjectMenu')
                }}
              >
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu')
                }}>English as a second Language</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu')
                }}>Arithmetic</MenuItem>
              </Menu>
            </div>

            <div className="store-filter-divider"></div>
            <div className="filter-buttons">
              <NavLink to="/store/category/course" className={(!isActive && type !== 'details') ? ' activeFilter' : ''}><Button>All</Button></NavLink>
              <NavLink to="/store/products/course/newest" className={(sorters.created == 'desc') ? ' activeFilter' : ''}><Button>Newest</Button></NavLink>
              <NavLink to="/store/products/course/popular"><Button>Most Popular</Button></NavLink>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 store-filter right-block">
            <div className="row">
              <div className="col-xs-6 search-field col-sm-6 col-md-6 col-lg-8 text-right">
                <Input
                  className=" store-search"
                  id="search"
                  type='search'
                  onChange={(e) => this._searchBarChange(e)}
                  placeholder="Search"
                  classes={{
                    inkbar: classes.inputInkbar,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={(e) => {
                        this._initFilter(e)
                      }}
                      >
                        <Search/>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4 text-right">
                <div className="filterMenu">
                  <Button
                    aria-owns={sortMenu ? 'category-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => {
                      this.handleMenuClick(e, 'sortMenu')
                    }}
                  >
                    Sort By: <i className="m--margin-left-10 fa fa-sort-amount-desc"></i>
                  </Button>
                  <Menu
                    id="category-menu"
                    anchorEl={sortMenu}
                    open={Boolean(sortMenu)}
                    onClose={(e) => {
                      this.handleMenuClose(e, 'sortMenu')
                    }}
                  >
                    <MenuItem onClick={(e) => {
                      this._selectSorter('price')
                    }}>Price</MenuItem>
                    <MenuItem onClick={(e) => {
                      this._selectSorter('created')
                    }}>Date</MenuItem>
                    <MenuItem onClick={(e) => {
                      this._selectSorter('rating')
                    }}>Rating</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

Filter.propTypes = {};

Filter.defaultProps = {
  type:'',
  isActive:false
}

export default withStyles(styles)(Filter);
