
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
               key:'students_staff',
               title:'Students & Staff',
               link:'dashboard',
               icon:'la la-university',
               colorName:'green',
               subMenu:[
                   {
                       title:'Administration',
                       link:'administration',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       title:'Teachers',
                       link:'teachers',
                       icon:'flaticon flaticon-user-ok',
                   },
                   {
                       title:'Students',
                       link:'students',
                       icon:'flaticon	flaticon-technology-1',
                   }
               ]
           },
           {
               key:'learning_areas',
               title:'Learning Areas',
               link:'dashboard',
               icon:'la la-book',
               colorName:'red',
               subMenu:[
                   {
                       title:'Classrooms',
                       link:'classrooms',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       title:'Demo Courses',
                       link:'courses',
                       icon:'flaticon flaticon-user-ok',
                   },
                   {
                       title:'Homerooms',
                       link:'homerooms',
                       icon:'flaticon	flaticon-technology-1',
                   },
                   {
                       title:'Professional Trainings',
                       link:'students',
                       icon:'flaticon	flaticon-technology-1',
                   }
               ]
           }
       ],
       singleMenu:[
           {
               title:'Reports',
               link:'reports',
               icon:'la la-bar-chart-o',
           },
           {
               title:'S-CAP',
               link:'scap',
               icon:'la  la-credit-card',
           },
           {
               title:'How To Movies',
               link:'movies',
               icon:'la  la-film',
           },
       ]
}