
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
               key:'studentsAndStaff',
               title:'Students & Staff',
               link:'dashboard',
               icon:'la la-university',
               colorName:'green',
               subMenu:[
                   {
                       key:'administration',
                       title:'Administration',
                       link:'administration',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       key:'teachers',
                       title:'Teachers',
                       link:'teachers',
                       icon:'flaticon flaticon-user-ok',
                   },
                   {
                       key:'students',
                       title:'Students',
                       link:'students',
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
                       title:'Demo Courses',
                       link:'courses',
                       icon:'flaticon flaticon-user-ok',
                   },
                   {
                       key:'homerooms',
                       title:'Homerooms',
                       link:'homerooms',
                       icon:'flaticon	flaticon-technology-1',
                   },
                   {
                       key:'professionalTrainings',
                       title:'Professional Trainings',
                       link:'students',
                       icon:'flaticon	flaticon-technology-1',
                   }
               ]
           }
       ],
       singleMenu:[
           {
               key:'reports',
               title:'Reports',
               link:'reports',
               icon:'la la-bar-chart-o',
           },
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