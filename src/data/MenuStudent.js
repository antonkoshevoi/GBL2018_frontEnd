
export default  {
    multipleMenu: [
        {
            key: 'dashboard',
            title: 'dashboard',
            link: 'dashboard',
            icon: 'fa fa-dashboard',
            colorName: 'home'
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
                    link: 'messages'
                },
                {
                    key: 'sent',
                    title: 'sent',
                    link: 'messages/sent'
                }
            ]
        },
        {
            key: 'reports',
            title: 'reports',
            link: 'my-reports',
            icon: 'fa fa-line-chart',
            colorName: 'purple'
        },
        {
            key: 'parent',
            title: 'myParents',
            link: 'my-parents',
            icon: 'fa fa-user-circle',
            colorName: 'orange'
        }]
}