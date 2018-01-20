
export default  {
       multipleMenu:[
           {
               key:'dashboard',
               title:'Dashboard',
               link:'dashboard',
               icon:'fa fa-dashboard',
               colorName:'home',
           },
           {
               key:'reports',
               title:'Reports',
               link:'reports/schools',
               icon:'fa  fa-line-chart ',
               colorName:'orange',
           },
           {
               key:'store',
               title:'Store',
               link:'store',
               icon:'fa fa-shopping-cart ',
               colorName:'green',
           },
           {
               key:'studentsAndStaff',
               title:'Students & Staff',
               link:'dashboard',
               icon:'fa fa-group',
               colorName:'red',
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
               icon:'fa fa-institution',
               colorName:'grey',
               subMenu:[
                   {
                       key:'classrooms',
                       title:'Classrooms',
                       link:'classrooms/list',
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
               icon:'fa fa-share-alt',
               colorName:'orange',
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
               icon:'fa fa-dollar ',
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
               icon:'fa fa-id-card',
           },
           {
               key:'howToMovies',
               title:'How To Movies',
               link:'movies',
               icon:'fa fa-film',
           },
       ]
}