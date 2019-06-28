
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
            key: 'subscriptions',
            title: 'subscriptions',
            link: 'my-subscriptions',
            icon: 'fa fa-calendar-check-o',
            colorName: 'purple',
            subMenu: [
                {
                    key: 'mySubscriptions',
                    title: 'manage',
                    link: 'my-subscriptions'
                },
                {
                    key: 'buySubscription',
                    title: 'buy',
                    link: 'subscriptions'
                }
            ]
        },
        {
            key: 'store',
            title: 'store',
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
                }
            ]
        },
        {
            key: 'connections',
            title: 'myConnections',
            link: 'connections',
            icon: 'fa fa-group',
            colorName: 'orange'
        },
        {
            key: 'gifts',
            title: 'myGifts',
            link: 'gifts',
            icon: 'fa fa-gift',
            colorName: 'purple'
        },
        {
            key: 'downloads',
            title: 'myDownloads',
            link: 'downloads',
            icon: 'fa fa-download',
            colorName: 'violet'
        },        
        {
            key: 'orders',
            title: 'myOrders',
            link: 'store/shopping-cart',
            icon: 'fa fa-shopping-cart',
            colorName: 'red',
        },
        {
            key: 'transactions',
            title: 'transactions',
            link: 'accounts/transactions',
            icon: 'fa fa-dollar',
            colorName: 'grey'
        }
    ]
}