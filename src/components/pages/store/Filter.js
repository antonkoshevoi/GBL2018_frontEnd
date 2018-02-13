import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button, ClickAwayListener, Grow, Icon, IconButton, Input, InputAdornment, Menu, MenuItem, MenuList, Paper,
  withStyles
} from "material-ui";
import {Manager, Popper, Target} from "react-popper";
import classNames from 'classnames';
import {NavLink, withRouter} from "react-router-dom";
import {Search} from "material-ui-icons";
import red from "material-ui/es/colors/red";
import {buildSortersQuery, getUrlLastName} from "../../../helpers/utils";

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
        title: '',
        category:''
      },
      orderBy: {}
    },
    sorters: {}
  };


  componentDidMount(){
    const {type, match} = this.props;
    if (type === 'newest') {
      this._selectSorterDesc('created');
    }
    this._setCategoryFilter(match.params.category)
  }


  _setCategoryFilter(category){
    switch (category){
      case 'courses':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: 'courses'}}}, this._initFilter);
        break;
      case 'books':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: 'books'}}}, this._initFilter);
        break;
      case 'teaching_aids':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: 'teaching_aids'}}}, this._initFilter);
        break;
      case 'stationary':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: 'stationary'}}}, this._initFilter);
        break;
      case 'student_rewards':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: 'student_rewards'}}}, this._initFilter);
        break;
      case 'tutoring_services':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: 'tutoring_services'}}}, this._initFilter);
        break;
      case 'bundles':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: 'bundles'}}}, this._initFilter);
        break;
      default:
        return;
    }
  }


  componentWillReceiveProps(nextProps){
    if (!nextProps.isActive) {
      this._resetAll();
    }
    if (nextProps.location.key !== this.props.location.key) {
      this._setCategoryFilter(nextProps.match.params.category);
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


  _selectFilter = (type,value) => {
    this.setState({params: {...this.state.params, filter: {...this.state.params.filter, [type]: value}}}, this._initFilter);
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
                Target > Age <i className="m--margin-left-10 fa fa-chevron-down"></i>
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
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target','')
                }}>All</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',1)
                }}>Elementary Grade 1</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',2)
                }}>Kindy Starter</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',3)
                }}>Kindy Advanced</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',4)
                }}>Elementary 1-3</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',5)
                }}>Elementary 4-6</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',6)
                }}>Junior High School</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',7)
                }}>High School</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',8)
                }}>Adult</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',9)
                }}>Senior</MenuItem>
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
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',1)
                }}>English for Kids</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',2)
                }}>Language</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',3)
                }}>Safety</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',4)
                }}>Fine Arts</MenuItem>
                <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',5)
                }}>Flex</MenuItem>
              </Menu>
            </div>

            <div className="store-filter-divider"></div>
            <div className="filter-buttons">
              <NavLink to="/store" className={(!isActive && type !== 'details') ? ' activeFilter' : ''}><Button>All</Button></NavLink>
              <NavLink to="/store/products/course/newest" className={(sorters.created == 'desc') ? ' activeFilter' : ''}><Button>Newest</Button></NavLink>
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

export default withRouter(withStyles(styles)(Filter));
