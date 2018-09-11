import React, {Component} from 'react';
import {Button, IconButton, Input, InputAdornment, Menu, MenuItem, withStyles} from '@material-ui/core';
import {translate} from 'react-i18next';
import {NavLink, withRouter} from "react-router-dom";
import {Search} from "@material-ui/icons";
import red from "@material-ui/core/es/colors/red";
import {buildSortersQuery} from "../../helpers/utils";

const styles = {
  root: {
    display: 'flex'
  },
  popperClose: {
    pointerEvents: 'none'
  },
  inputLabelFocused: {
    color: red[500]
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: red[500]
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
      console.log(activeFilter);
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
    const {classes, isActive, type, isShow, t} = this.props;
    const {categoryMenu, subjectMenu, sortMenu, sorters} = this.state;

      return (
      <div className="col-md-12 ">
        <div className="row">
          <div className="col-md-12 col-lg-8 store-filter left-block">
              {isShow.target &&
              <div className="filterMenu">
                <Button
                    aria-owns={categoryMenu ? 'category-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => {
                        this.handleMenuClick(e, 'categoryMenu')
                    }}
                >
                  <span> {this.state.active_target ? this.state.active_target : t('targetAge')}</span> <i className="m--margin-left-10 fa fa-chevron-down"></i>
                </Button>
                <Menu
                    id="category-menu"
                    anchorEl={categoryMenu}
                    open={Boolean(categoryMenu)}
                    onClose={(e) => {
                        this.handleMenuClose(e, 'categoryMenu')
                    }}
                >
                  {this.state.active_target && 
                     <MenuItem onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', '', e)}}>{t('all')}</MenuItem>
                  }
                  <MenuItem title={t('elementaryGrade1')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 1, e) }}>{t('elementaryGrade1')}</MenuItem>
                  <MenuItem title={t('KindyStarter')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 2, e) }}>{t('kindyStarter')}</MenuItem>
                  <MenuItem title={t('kindyAdvanced')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 3, e) }}>{t('kindyAdvanced')}</MenuItem>
                  <MenuItem title={t('elementary1to3')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 4, e) }}>{t('elementary1to3')}</MenuItem>
                  <MenuItem title={t('elementary4to6')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 5, e) }}>{t('elementary4to6')}</MenuItem>
                  <MenuItem title={t('juniorHighSchool')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 6, e) }}>{t('juniorHighSchool')}</MenuItem>
                  <MenuItem title={t('highSchool')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 7, e) }}>{t('highSchool')}</MenuItem>
                  <MenuItem title={t('adult')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 8, e) }}>{t('adult')}</MenuItem>
                  <MenuItem title={t('senior')} onClick={(e) => {this.handleMenuClose(e, 'categoryMenu'); this._selectFilter('target', 9, e) }}>{t('senior')}</MenuItem>
                </Menu>
              </div>
              }
            <div className="store-filter-divider"></div>
              {isShow.subject &&
              <div className="filterMenu">
                <Button
                    aria-owns={subjectMenu ? 'subject-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => {
                        this.handleMenuClick(e, 'subjectMenu')
                    }}
                >
                  <span> {this.state.active_subject ? this.state.active_subject : t('subject')}</span> <i className="m--margin-left-10 fa fa-chevron-down"></i>
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
                  <MenuItem title={t('all')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', '', e) }}>{t('all')}</MenuItem>}
                  <MenuItem title={t('englishForKids')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 1, e) }}>{t('englishForKids')}</MenuItem>
                  <MenuItem title={t('language')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 2, e) }}>{t('language')}</MenuItem>
                  <MenuItem title={t('safety')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 3, e) }}>{t('safety')}</MenuItem>
                  <MenuItem title={t('fineArts')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 4, e) }}>{t('fineArts')}</MenuItem>
                  <MenuItem title={t('flex')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 5, e) }}>{t('flex')}</MenuItem>
                </Menu>
              </div>
              }

            <div className="store-filter-divider"></div>
            <div className="filter-buttons">
                { isShow.all &&
                 <NavLink to="/store" className={(!isActive && type !== 'details') ? ' activeFilter' : ''}><Button>{t('all')}</Button></NavLink>
                }
                {isShow.newest &&
                <NavLink to="/store/products/course/newest" className={(sorters.created == 'desc') ? ' activeFilter' : ''}><Button>{t('newest')}</Button></NavLink>
                }
            </div>
          </div>
          <div className="col-lg-4 col-md-12 store-filter right-block">
            <div className="row">
                { isShow.search &&
                <div className="col-xs-6 search-field col-sm-6 col-md-6 col-lg-8 text-right">
                <Input
                  className=" store-search"
                  id="search"
                  type='search'
                  onChange={(e) => this._searchBarChange(e)}
                  placeholder={t('search')}
                  classes={{
                    inkbar: classes.inputInkbar,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={(e) => {this._initFilter(e)}}>
                        <Search/>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              }
             { isShow.sort &&
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4 text-right">
                <div className="filterMenu">
                  <Button
                    aria-owns={sortMenu ? 'category-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => {
                      this.handleMenuClick(e, 'sortMenu')
                    }}
                  >
                    {t('sortBy')}: <i className="m--margin-left-10 fa fa-sort-amount-desc"></i>
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
                    }}>{t('price')}</MenuItem>
                    <MenuItem onClick={(e) => {
                      this._selectSorter('created')
                    }}>{t('date')}</MenuItem>
                    <MenuItem onClick={(e) => {
                      this._selectSorter('rating')
                    }}>{t('rating')}</MenuItem>
                  </Menu>
                </div>
              </div>
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Filter.defaultProps = {
  type:'',
  isActive:false,
  isShow:{
    sort: true,
    all: true,
    subject: true,
    target: true,
    search: true,
    newest: true,
  },
}

export default withRouter(withStyles(styles)(translate('translations')(Filter)));
