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
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: '1'}}}, this._initFilter);
        break;
      case 'books':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: '4'}}}, this._initFilter);
        break;
      case 'teaching_aids':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: '3'}}}, this._initFilter);
        break;
      case 'stationary':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: '6'}}}, this._initFilter);
        break;
      case 'student_rewards':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: '5'}}}, this._initFilter);
        break;
      case 'tutoring_services':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: '7'}}}, this._initFilter);
        break;
      case 'bundles':
        this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category: '2'}}}, this._initFilter);
        break;
      default:
        return;
    }
  }


  componentWillReceiveProps(nextProps){
    if (!nextProps.isActive) {
      this._resetAll();
    }

    if (nextProps.location.hash == '' && nextProps.location.key !== this.props.location.key) {
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
  };


  _selectFilter = (type,value,e) => {
      const {title} = e.currentTarget;
      let activeFilter = 'active_' + type;
      this.setState({[activeFilter]:title})
      this.setState({params: {...this.state.params, filter: {...this.state.params.filter, [type]: value,}}}, this._initFilter);
  };


  _initFilter = () => {
    let {params} = this.state;
    this.props.onChange(params);
  };


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
  };


  _selectSorterDesc = (name) => {
    let sorters = {};
    sorters[name] = 'desc';
    this.setState({sorters});
    this.setState({
      params: {
        ...this.state.params,
        filter: {...this.state.params.filter},
        orderBy: buildSortersQuery(sorters)
      }
    }, this._initFilter);
  };


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
                <span> { this.state.active_target ? this.state.active_target : 'Target  Age' }</span> <i className="m--margin-left-10 fa fa-chevron-down"></i>
              </Button>
              <Menu
                id="category-menu"
                anchorEl={categoryMenu}
                open={Boolean(categoryMenu)}
                onClose={(e) => {
                  this.handleMenuClose(e, 'categoryMenu')
                }}
              >
                {this.state.active_target &&  <MenuItem onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target','',e)
                }}>All</MenuItem>}
                <MenuItem title="Elementary Grade 1" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',1,e)
                }}>Elementary Grade 1</MenuItem>
                <MenuItem title="Kindy Starter" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',2,e)
                }}>Kindy Starter</MenuItem>
                <MenuItem title="Kindy Advanced" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',3,e)
                }}>Kindy Advanced</MenuItem>
                <MenuItem title="Elementary 1-3" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',4,e)
                }}>Elementary 1-3</MenuItem>
                <MenuItem title="Kindy Starter" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',5,e)
                }}>Elementary 4-6</MenuItem>
                <MenuItem title="Elementary 4-6" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',6,e)
                }}>Junior High School</MenuItem>
                <MenuItem title="Junior High School" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',7,e)
                }}>High School</MenuItem>
                <MenuItem title="High School" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',8,e)
                }}>Adult</MenuItem>
                <MenuItem title="Senior" onClick={(e) => {
                  this.handleMenuClose(e, 'categoryMenu'),this._selectFilter('target',9,e)
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
                  <span> { this.state.active_subject ? this.state.active_subject : 'Subject' }</span>  <i className="m--margin-left-10 fa fa-chevron-down"></i>
              </Button>
              <Menu
                id="subject-menu"
                anchorEl={subjectMenu}
                open={Boolean(subjectMenu)}
                onClose={(e) => {
                  this.handleMenuClose(e, 'subjectMenu')
                }}
              >
                  {this.state.active_subject &&
                  <MenuItem title="English for Kids" onClick={(e) => {
                      this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject','',e)
                  }}>All</MenuItem>}
                <MenuItem title="English for Kids" onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',1,e)
                }}>English for Kids</MenuItem>
                <MenuItem title="Language" onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',2,e)
                }}>Language</MenuItem>
                <MenuItem title="Safety" onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',3,e)
                }}>Safety</MenuItem>
                <MenuItem title="Fine Arts" onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',4,e)
                }}>Fine Arts</MenuItem>
                <MenuItem title="Flex" onClick={(e) => {
                  this.handleMenuClose(e, 'subjectMenu'),this._selectFilter('subject',5,e)
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
