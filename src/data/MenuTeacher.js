
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
            key: 'students',
            title: 'students',
            link: 'students/list',
            icon: 'fa fa-group',
            colorName: 'orange'
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
                    link: 'classrooms/list'
                },
                {
                    key: 'homerooms',
                    title: 'homerooms',
                    link: 'homerooms/list'
                }
            ]
        },
        {
            key: 'reports',
            title: 'Reports',
            link: 'reports',
            icon: 'fa  fa-line-chart',
            colorName: 'purple',
        },
        {
            key: 'messages',
            title: 'messages',
            link: 'messages',
            icon: 'fa fa-weixin',
            colorName: 'blue',
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
                },
                {
                    key: 'compose',
                    title: 'compose',
                    link: 'messages/new'
                },
                {
                    key: 'drafts',
                    title: 'drafts',
                    link: 'messages/drafts'
                }
            ]
        },
        {
            key: 'store',
            title: 'Store',
            link: '/store',
            icon: 'fa fa-shopping-cart',
            colorName: 'green',
            subMenu: [
                {
                    key: 'courses',
                    title: 'courses',
                    link: 'store/category/courses'
                },
                {
                    key: 'books',
                    title: 'Books',
                    link: 'store/category/books'
                },
                {
                    key: 'teaching_aids',
                    title: 'teachingAids',
                    link: 'store/category/teaching_aids'
                },
                {
                    key: 'stationary',
                    title: 'stationary',
                    link: 'store/category/stationary'
                },
                {
                    key: 'student_rewards',
                    title: 'studentRewards',
                    link: 'store/category/student_rewards'
                },
                {
                    key: 'tutoring_services',
                    title: 'tutoringServices',
                    link: 'store/category/tutoring_services'
                },
                {
                    key: 'bundles',
                    title: 'bundles',
                    link: 'store/category/bundles'
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
                    link: 'accounts/invoices'
                },
                {
                    key: 'unassigned_credits',
                    title: 'unassignedCredits',
                    link: 'accounts/unassigned_credits'
                },
                {
                    key: 'history',
                    title: 'historyTransactions',
                    link: 'accounts/transactions'
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