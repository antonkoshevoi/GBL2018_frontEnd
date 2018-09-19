
export default  {
    multipleMenu: [
        {
            key: 'dashboard',
            title: 'dashboard',
            link: 'dashboard',
            icon: 'fa fa-dashboard',
            colorName: 'home',
        },
        {
            key: 'studentsAndStaff',
            title: 'studentsAndStaff',
            link: 'dashboard',
            icon: 'fa fa-group',
            colorName: 'orange',
            subMenu: [
                {
                    key: 'administration',
                    title: 'administration',
                    link: 'administration/list',
                    icon: 'flaticon flaticon-user-settings',
                },
                {
                    key: 'teachers',
                    title: 'teachers',
                    link: 'teachers/list',
                    icon: 'flaticon flaticon-user-ok',
                },
                {
                    key: 'students',
                    title: 'students',
                    link: 'students/list',
                    icon: 'flaticon	flaticon-technology-1',
                }
            ]
        },
        {
            key: 'learningAreas',
            title: 'learningAreas',
            link: 'dashboard',
            icon: 'fa fa-institution',
            colorName: 'red',
            subMenu: [
                {
                    key: 'classrooms',
                    title: 'classrooms',
                    link: 'classrooms/list',
                    icon: 'flaticon flaticon-user-settings',
                },
                {
                    key: 'classInvitations',
                    title: 'classInvitations',
                    link: 'courses',
                    icon: 'flaticon flaticon-user-ok',
                },
                {
                    key: 'homerooms',
                    title: 'homerooms',
                    link: 'homerooms/list',
                    icon: 'flaticon	flaticon-technology-1',
                }
            ]
        },
        {
            key: 'reports',
            title: 'reports',
            link: 'reports',
            icon: 'fa  fa-line-chart ',
            colorName: 'purple',
        },
        {
            key: 'sharing',
            title: 'sharing',
            link: 'dashboard',
            icon: 'fa fa-share-alt',
            colorName: 'blue',
            subMenu: [
                {
                    key: 'inbox',
                    title: 'inbox',
                    link: 'messages',
                    icon: 'flaticon flaticon-user-settings',
                },
                {
                    key: 'sent',
                    title: 'sent',
                    link: 'sent',
                    icon: 'flaticon flaticon-technology-1',
                },
                {
                    key: 'compose',
                    title: 'compose',
                    link: 'compose',
                    icon: 'flaticon flaticon-technology-1',
                },
                {
                    key: 'drafts',
                    title: 'drafts',
                    link: 'drafts',
                    icon: 'flaticon flaticon-technology-1',
                },
                {
                    key: 'chat',
                    title: 'chat',
                    link: 'chat',
                    icon: 'flaticon flaticon-technology-1',
                }
            ]
        },
        {
            key: 'store',
            title: 'store',
            link: '/store',
            icon: 'fa fa-shopping-cart ',
            colorName: 'green',
            subMenu: [
                {
                    key: 'courses',
                    title: 'courses',
                    link: 'store/category/courses',
                    icon: 'flaticon flaticon-user-settings'
                },
                {
                    key: 'books',
                    title: 'books',
                    link: 'store/category/books',
                    icon: 'flaticon flaticon-user-ok'
                },
                {
                    key: 'teaching_aids',
                    title: 'teachingAids',
                    link: 'store/category/teaching_aids',
                    icon: 'flaticon flaticon-technology-1',
                },
                {
                    key: 'stationary',
                    title: 'stationary',
                    link: 'store/category/stationary',
                    icon: 'flaticon flaticon-technology-1'
                },
                {
                    key: 'student_rewards',
                    title: 'studentRewards',
                    link: 'store/category/student_rewards',
                    icon: 'flaticon flaticon-technology-1'
                },
                {
                    key: 'tutoring_services',
                    title: 'tutoringServices',
                    link: 'store/category/tutoring_services',
                    icon: 'flaticon	flaticon-technology-1'
                },
                {
                    key: 'bundles',
                    title: 'bundles',
                    link: 'store/category/bundles',
                    icon: 'flaticon flaticon-technology-1'
                }
            ]
        },
        {
            key: 'accounts',
            title: 'accounts',
            link: 'accounts',
            icon: 'fa fa-dollar',
            colorName: 'grey',
            subMenu: [
                {
                    key: 'open_invoices',
                    title: 'openInvoices',
                    link: 'accounts/invoices',
                    icon: 'flaticon flaticon-user-settings',
                },
                {
                    key: 'unassigned_credits',
                    title: 'unassignedCredits',
                    link: 'accounts/unassigned_credits',
                    icon: 'flaticon flaticon-user-settings',
                },
                {
                    key: 'history',
                    title: 'historyTransactions',
                    link: 'accounts/transactions',
                    icon: 'flaticon flaticon-user-ok',
                }
            ]
        },
        {
            key: 'sCap',
            title: 'sCap',
            link: 'scap',
            icon: 'fa fa-id-card',
            colorName: 'purple'
        }     
    ]
}