
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
                    key: 'alerts',
                    title: 'alerts',
                    link: 'messages/alerts',
                    icon: 'la la-warning',
                    colorName: 'red'
                },
                {
                    key: 'announcements',
                    title: 'announcements',
                    link: 'messages/announcements',
                    icon: 'la la-bullhorn',
                    colorName: 'blue'
                },
                {
                    key: 'assignments',
                    title: 'assignments',
                    link: 'messages/assignments',
                    icon: 'la la-pencil',
                    colorName: 'green'
                },
                {
                    key: 'chats',
                    title: 'chats',
                    link: 'messages/chats',
                    icon: 'fa fa-weixin',
                    colorName: 'violet'
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