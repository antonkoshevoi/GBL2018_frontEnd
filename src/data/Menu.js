
export default  {
       multipleMenu:[
           {
               key:'dashboard',
               title:'Dashboard',
               link:'dashboard',
               icon:'flaticon flaticon-line-graph',
               colorName:'home',
           },
           {
               key:'reports',
               title:'Reports',
               link:'reports/schools',
               icon:'la la-bar-chart-o',
               colorName:'orange',
           },
           {
               key:'studentsAndStaff',
               title:'Students & Staff',
               link:'dashboard',
               icon:'la la-university',
               colorName:'purple',
               subMenu:[
                   {
                       key:'administration',
                       title:'Administration',
                       link:'administration/list',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       key:'teachers',
                       title:'Teachers',
                       link:'teachers/list',
                       icon:'flaticon flaticon-user-ok',
                   },
                   {
                       key:'students',
                       title:'Students',
                       link:'students/list',
                       icon:'flaticon	flaticon-technology-1',
                   }
               ]
           },
           {
               key:'learningAreas',
               title:'Learning Areas',
               link:'dashboard',
               icon:'la la-book',
               colorName:'red',
               subMenu:[
                   {
                       key:'classrooms',
                       title:'Classrooms',
                       link:'classrooms',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       key:'demoCourses',
                       title:'Demo courses',
                       link:'courses',
                       icon:'flaticon flaticon-user-ok',
                   },
                   {
                       key:'homerooms',
                       title:'Homerooms',
                       link:'homerooms/list',
                       icon:'flaticon	flaticon-technology-1',
                   },
                   {
                       key:'professionalTrainings',
                       title:'Professional Trainings',
                       link:'trainings',
                       icon:'flaticon	flaticon-technology-1',
                   }
               ]
           },
           {
               key:'sharing',
               title:'Sharing',
               link:'dashboard',
               icon:'la la-share-alt',
               colorName:'green',
               subMenu:[
                   {
                       key:'inbox',
                       title:'Inbox',
                       link:'inbox',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       key:'labels',
                       title:'Labels',
                       link:'labels',
                       icon:'flaticon flaticon-user-ok',
                   },
                   {
                       key:'sent',
                       title:'Sent',
                       link:'sent',
                       icon:'flaticon	flaticon-technology-1',
                   },
                   {
                       key:'compose',
                       title:'Compose',
                       link:'compose',
                       icon:'flaticon flaticon-technology-1',
                   },
                   {
                       key:'drafts',
                       title:'Drafts',
                       link:'drafts',
                       icon:'flaticon flaticon-technology-1',
                   },
                   {
                       key:'chat',
                       title:'Chat',
                       link:'chat',
                       icon:'flaticon flaticon-technology-1',
                   }
               ]
           },
           {
               key:'acounts',
               title:'Acounts',
               link:'accounts',
               icon:'la la-usd',
               colorName:'blue',
               subMenu:[
                   {
                       key:'open_invoices',
                       title:'Open Invoices',
                       link:'invoices',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       key:'history',
                       title:'History',
                       link:'history',
                       icon:'flaticon flaticon-user-ok',
                   }
               ]
           }
       ],
       singleMenu:[
           {
               key:'sCap',
               title:'S-CAP',
               link:'scap',
               icon:'la  la-credit-card',
           },
           {
               key:'howToMovies',
               title:'How To Movies',
               link:'movies',
               icon:'la  la-film',
           },
       ]
}