
export default  {
  multipleMenu:[
    {
      key:'dashboard',
      title:'Dashboard',
      link:'dashboard',
      icon:'fa fa-dashboard',
      colorName:'home'
    },
    {
        key: 'messages',
        title: 'messages',
        link: 'messages',
        icon: 'fa fa-weixin',
        colorName: 'green',
        subMenu: [
            {
                key: 'inbox',
                title: 'inbox',
                link: 'messages',
                icon: 'flaticon flaticon-user-settings'
            },
            {
                key: 'sent',
                title: 'sent',
                link: 'messages/sent',
                icon: 'flaticon flaticon-technology-1'
            }
        ]
    },
    {
        key: 'reports',
        title: 'Reports',
        link: 'my-reports',
        icon: 'fa fa-line-chart',
        colorName: 'purple'
    }]
}