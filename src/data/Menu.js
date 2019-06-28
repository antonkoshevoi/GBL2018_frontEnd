
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
            key: 'studentsAndStaff',
            title: 'studentsAndStaff',
            link: 'dashboard',
            icon: 'fa fa-group',
            colorName: 'orange',
            subMenu: [
                {
                    key: 'administration',
                    title: 'administration',
                    link: 'administration/list'
                },
                {
                    key: 'teachers',
                    title: 'teachers',
                    link: 'teachers/list'
                },
                {
                    key: 'students',
                    title: 'students',
                    link: 'students/list'
                },
                {
                    key: 'parents',
                    title: 'parents',
                    link: 'parents/list'
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
                    link: 'classrooms/list'
                },
                {
                    key: 'classInvitations',
                    title: 'classInvitations',
                    link: 'courses'
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
            title: 'reports',
            link: 'reports',
            icon: 'fa fa-line-chart ',
            colorName: 'purple'
        },
        {
            key: 'messages',
            title: 'messages',
            link: 'messages',
            icon: 'fa fa-weixin',
            colorName: 'blue',
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
                },
                {
                    key: 'groups',
                    title: 'groups',
                    link: 'messages/groups',
                    icon: 'fa fa-users',
                    colorName: 'grey'
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
                    link: 'store/category/courses'
                },
                {
                    key: 'books',
                    title: 'books',
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
                    key: 'printables',
                    title: 'printables',
                    link: 'store/category/printables'
                }
            ]
        },
        {
            key: 'downloads',
            title: 'myDownloads',
            link: 'downloads',
            icon: 'fa fa-download',
            colorName: 'violet'
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