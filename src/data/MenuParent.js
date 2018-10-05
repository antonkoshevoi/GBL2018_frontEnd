
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
      key:'subscriptions',
      title:'subscriptions',
      link:'my-subscriptions',
      icon:'fa fa-calendar-check-o',
      colorName:'purple',
      subMenu:[
        {
          key:'mySubscriptions',
          title:'mySubscriptions',
          link:'my-subscriptions',
          icon:'flaticon flaticon-user-ok'
        },          
        {
          key:'buySubscription',
          title:'buySubscription',
          link:'subscriptions',
          icon:'flaticon flaticon-user-settings'
        },
        {
          key:'subscriptionPayments',
          title:'subscriptionPayments',
          link:'subscriptions/payments',
          icon:'flaticon flaticon-user-settings'
        }
      ]
    },    
    {
      key:'store',
      title:'Store',
      link:'/store',
      icon:'fa fa-shopping-cart',
      colorName:'green',
      subMenu:[
        {
          key:'courses',
          title:'Courses',
          link:'store/category/courses',
          icon:'flaticon flaticon-user-settings'
        },
        {
          key:'books',
          title:'Books',
          link:'store/category/books',
          icon:'flaticon flaticon-user-ok'
        },
        {
          key:'teaching_aids',
          title:'teachingAids',
          link:'store/category/teaching_aids',
          icon:'flaticon flaticon-technology-1'
        },
        {
          key:'stationary',
          title:'Stationary',
          link:'store/category/stationary',
          icon:'flaticon flaticon-technology-1'
        },
        {
          key:'student_rewards',
          title:'studentRewards',
          link:'store/category/student_rewards',
          icon:'flaticon flaticon-technology-1'
        },
        {
          key:'tutoring_services',
          title:'tutoringServices',
          link:'store/category/tutoring_services',
          icon:'flaticon flaticon-technology-1',
        },
        {
          key:'bundles',
          title:'bundles',
          link:'store/category/bundles',
          icon:'flaticon flaticon-technology-1',
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
                link: 'messages',
                icon: 'flaticon flaticon-user-settings',
            },
            {
                key: 'sent',
                title: 'sent',
                link: 'messages/sent',
                icon: 'flaticon flaticon-technology-1',
            },
            {
                key: 'compose',
                title: 'compose',
                link: 'messages/new',
                icon: 'flaticon flaticon-technology-1',
            },
            {
                key: 'drafts',
                title: 'drafts',
                link: 'messages/drafts',
                icon: 'flaticon flaticon-technology-1',
            }
        ]
    },
    {
      key:'orders',
      title:'myOrders',
      link:'store/shopping-cart',
      icon:'fa fa-shopping-cart',
      colorName:'red',
    },
    {
      key:'transactions',
      title:'Transactions',
      link:'accounts/transactions',
      icon:'fa fa-dollar',
      colorName:'blue',
    }
  ],
  singleMenu:[
    {
      key:'sCap',
      title:'sCap',
      link:'scap',
      icon:'fa fa-id-card',
    },
    {
      key:'howToMovies',
      title:'howToMovies',
      link:'movies',
      icon:'fa fa-film',
    },
  ]
}