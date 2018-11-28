
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
                    title: 'mySubscriptions',
                    link: 'my-subscriptions'
                },
                {
                    key: 'buySubscription',
                    title: 'buySubscription',
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