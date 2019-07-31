import React, {Component} from 'react';
import {Button, Menu, MenuItem} from '@material-ui/core';
import {withTranslation} from 'react-i18next';
import {NavLink, withRouter} from "react-router-dom";
import {buildSortersQuery} from "../../helpers/utils";
import SearchInput from "../ui/SearchInput";

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
      const categories = {
          books: 4,
          printables: 7,
          teaching_aids: 3,
          student_rewards: 5,
          stationary: 6,
          courses: 1
      };
      
      const categoryId = categories[category] || 0;
        
      if (categoryId > 0) {
         this.setState({params: {...this.state.params, filter: {...this.state.params.filter, category:categoryId}}}, this._initFilter);
      }
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.isActive) {
      this._resetAll();
    }
    if (nextProps.location.hash === '' && nextProps.location.key !== this.props.location.key) {
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
      console.log(e);
    this.setState({params: {...this.state.params, filter: {...this.state.params.filter, title: e}}}, this._initFilter);
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
    const {isActive, type, isShow, t} = this.props;
    const {categoryMenu, subjectMenu, sortMenu, sorters} = this.state;

      return (
     
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 store-filter left-block">
              {isShow.filters && <>
              <div>
                <Button
                    aria-owns={categoryMenu ? 'category-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => { this.handleMenuClick(e, 'categoryMenu') }}
                >
                  <span> {this.state.active_target ? this.state.active_target : t('targetAge')}</span> <i className="ml-3 fa fa-chevron-down"></i>
                </Button>
                <Menu
                    id="category-menu"
                    anchorEl={categoryMenu}
                    open={Boolean(categoryMenu)}
                    onClose={(e) => { this.handleMenuClose(e, 'categoryMenu') }}
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
              <div className="store-filter-divider"></div>              
              <div>
                <Button
                    aria-owns={subjectMenu ? 'subject-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => { this.handleMenuClick(e, 'subjectMenu') }}
                >
                  <span> {this.state.active_subject ? this.state.active_subject : t('subject')}</span> <i className="ml-3 fa fa-chevron-down"></i>
                </Button>
                <Menu
                    id="subject-menu"
                    anchorEl={subjectMenu}
                    open={Boolean(subjectMenu)}
                    onClose={(e) => { this.handleMenuClose(e, 'subjectMenu') }}
                >
                {this.state.active_subject &&
                  <MenuItem title={t('all')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', '', e) }}>{t('all')}</MenuItem>}
                  <MenuItem title={t('englishForKids')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 1, e) }}>{t('englishForKids')}</MenuItem>
                  <MenuItem title={t('language')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 2, e) }}>{t('language')}</MenuItem>
                  <MenuItem title={t('safety')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 3, e) }}>{t('safety')}</MenuItem>
                  <MenuItem title={t('fineArts')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 4, e) }}>{t('fineArts')}</MenuItem>
                  <MenuItem title={t('flex')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 5, e) }}>{t('flex')}</MenuItem>
                  <MenuItem title={t('math')} onClick={(e) => { this.handleMenuClose(e, 'subjectMenu'); this._selectFilter('subject', 6, e) }}>{t('math')}</MenuItem>
                </Menu>
              </div>
              <div className="store-filter-divider"></div>
            </>}
            <div className="filter-buttons">
                { isShow.all &&
                    <NavLink to="/store" className={(!isActive && type !== 'details') ? ' activeFilter' : ''}><Button>{t('all')}</Button></NavLink>
                }
                {isShow.newest &&
                    <NavLink to="/store/products/course/newest" className={(sorters.created === 'desc') ? ' activeFilter' : ''}><Button>{t('newest')}</Button></NavLink>
                }
            </div>
          </div>          
          <div className="col-lg-6 col-md-6 col-sm-12 store-filter">                            
                { isShow.sort &&              
                <div className="float-right">
                  <Button
                    aria-owns={sortMenu ? 'category-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => { this.handleMenuClick(e, 'sortMenu') }}
                  >
                    {t('sortBy')}: <i className="ml-3 fa fa-sort-amount-desc"></i>
                  </Button>
                  <Menu
                    id="category-menu"
                    anchorEl={sortMenu}
                    open={Boolean(sortMenu)}
                    onClose={(e) => { this.handleMenuClose(e, 'sortMenu') }}
                  >
                    <MenuItem onClick={(e) => { this._selectSorter('price') }}>{t('price')}</MenuItem>
                    <MenuItem onClick={(e) => { this._selectSorter('created') }}>{t('date')}</MenuItem>
                    <MenuItem onClick={(e) => { this._selectSorter('title') }}>{t('title')}</MenuItem>
                  </Menu>
                </div>              
                }
                { isShow.search &&
                <div className="float-right">
                    <SearchInput
                      className="store-search mt-3 mr-3"
                      id="search"
                      type='search'
                      placeholder={t('search')}
                      onChange={(e) => { this._searchBarChange(e) }}/>
                </div>
              }
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
    filters: true,
    search: true,
    newest: true
  }
}

export default withRouter(withTranslation('translations')(Filter));
