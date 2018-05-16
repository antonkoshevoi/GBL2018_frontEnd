
export default  {
    multipleMenu: [
        {
            key: 'dashboard',
            title: 'Dashboard',
            link: 'dashboard',
            icon: 'fa fa-dashboard',
            colorName: 'home',
        },
        {
            key: 'learningAreas',
            title: 'Learning Areas',
            link: 'dashboard',
            icon: 'fa fa-institution',
            colorName: 'red',
            subMenu: [
                {
                    key: 'classrooms',
                    title: 'Classrooms',
                    link: 'classrooms/list',
                    icon: 'flaticon flaticon-user-settings',
                },
                {
                    key: 'homerooms',
                    title: 'Homerooms',
                    link: 'homerooms/list',
                    icon: 'flaticon	flaticon-technology-1',
                }
            ]
        },
        {
            key: 'reports',
            title: 'Reports',
            link: 'reports',
            icon: 'fa  fa-line-chart ',
            colorName: 'purple',
        }
    ]
}