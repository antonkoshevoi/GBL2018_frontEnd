
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
           key:'studentsAndStaff',
           title:'Students & Staff',
           link:'dashboard',
           icon:'fa fa-group',
           colorName:'orange',
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
           colorName:'red',
           subMenu:[
             {
               key:'classrooms',
               title:'Classrooms',
               link:'classrooms/list',
               icon:'flaticon flaticon-user-settings',
             },
             {
               key:'classInvitations',
               title:'Demo courses',
               link:'courses',
               icon:'flaticon flaticon-user-ok',
             },
             {
               key:'autoClass',
               title:'Auto Class',
               link:'classrooms/auto',
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
               key:'reports',
               title:'Reports',
               link:'reports',
               icon:'fa  fa-line-chart ',
               colorName:'purple',
           },
           {
           key:'sharing',
           title:'Sharing',
           link:'dashboard',
           icon:'fa fa-share-alt',
           colorName:'blue',
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
               key:'store',
               title:'Store',
               link:'/store',
               icon:'fa fa-shopping-cart ',
               colorName:'green',
               subMenu:[
                   {
                       key:'courses',
                       title:'Courses',
                       link:'store/category/courses',
                       icon:'flaticon flaticon-user-settings',
                       subMenu:[
                           {
                               key:'single_courses',
                               title:'Single Courses',
                               link:'store/category/courses/single',
                               icon:'flaticon flaticon-user-settings',
                               subMenu:[
                                   {
                                       key:'by_age',
                                       title:'By Age',
                                       link:'store/category/courses/single/by_age',
                                       icon:'flaticon flaticon-user-settings',
                                   },
                                   {
                                       key:'by_subject',
                                       title:'By Subject',
                                       link:'store/category/courses/single/by_subject',
                                       icon:'flaticon flaticon-user-settings',
                                   }
                               ]
                           },
                           {
                               key:'bundles',
                               title:'Bundles',
                               link:'store/category/courses/bundles',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'companion_courses',
                               title:'Companion Courses',
                               link:'store/category/courses/companion_courses',
                               icon:'flaticon flaticon-user-ok',
                           },
                       ]
                   },
                   {
                       key:'books',
                       title:'Books',
                       link:'store/category/books',
                       icon:'flaticon flaticon-user-ok',
                       subMenu:[
                           {
                               key:'physically_printed_books',
                               title:'Physically Printed Books',
                               link:'store/category/books/physically_printed_books',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'digital_downloads',
                               title:'Digital Downloads',
                               link:'store/category/books/digital_downloads',
                               icon:'flaticon flaticon-user-ok',
                           },
                       ]
                   },
                   {
                       key:'teaching_aids',
                       title:'Teaching Aids',
                       link:'store/category/teaching_aids',
                       icon:'flaticon	flaticon-technology-1',
                       subMenu:[
                           {
                               key:'flashcards',
                               title:'Flashcards',
                               link:'store/category/teaching_aids/flashcards',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'activity_props',
                               title:'Activity Props',
                               link:'store/category/teaching_aids/activity_props',
                               icon:'flaticon flaticon-user-ok',
                           },
                       ]
                   },
                   {
                       key:'stationary',
                       title:'Stationary',
                       link:'store/category/stationary',
                       icon:'flaticon	flaticon-technology-1',
                       subMenu:[
                           {
                               key:'notebooks',
                               title:'Notebooks',
                               link:'store/category/stationary/notebooks',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'penscils',
                               title:'Penscils',
                               link:'store/category/stationary/penscils',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'pens',
                               title:'Pens',
                               link:'store/category/stationary/pens',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'pencil_crayons',
                               title:'Pencil Crayons',
                               link:'store/category/stationary/pencil_crayons',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'crayons',
                               title:'Crayons',
                               link:'store/category/stationary/crayons',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'duotangs',
                               title:'Duotangs',
                               link:'store/category/stationary/duotangs',
                               icon:'flaticon flaticon-user-ok',
                           },
                       ]
                   },
                   {
                       key:'student_rewards',
                       title:'Student Rewards',
                       link:'store/category/student_rewards',
                       icon:'flaticon	flaticon-technology-1',
                       subMenu:[
                           {
                               key:'toys',
                               title:'Toys',
                               link:'store/category/student_rewards/toys',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'unit_badges',
                               title:'Unit Badges',
                               link:'store/category/student_rewards/unit_badges',
                               icon:'flaticon flaticon-user-ok',
                           }
                       ]
                   },
                   {
                       key:'tutoring_services',
                       title:'Tutoring Services ',
                       link:'store/category/tutoring_services',
                       icon:'flaticon	flaticon-technology-1',
                       subMenu:[
                           {
                               key:'hire_teacher_by_the_hour',
                               title:'Hire Teacher By The Hour',
                               link:'store/category/tutoring_services/hire_teacher_by_the_hour',
                               icon:'flaticon flaticon-user-ok',
                           }
                       ]
                   },
                   {
                       key:'bundles',
                       title:'Bundles',
                       link:'store/category/bundles',
                       icon:'flaticon	flaticon-technology-1',
                       subMenu:[
                           {
                               key:'a_set_of_courses',
                               title:'A Set Of Courses ',
                               link:'store/category/bundles/a_set_of_courses',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'single_book',
                               title:'A single book with student rewards badges',
                               link:'store/category/bundles/single_book',
                               icon:'flaticon flaticon-user-ok',
                           },
                           {
                               key:'pack_of_teaching',
                               title:'A pack of teaching aids for an entire course',
                               link:'store/category/bundles/pack_of_teaching',
                               icon:'flaticon flaticon-user-ok',
                           }
                       ]
                   }
               ]
           },
           {
               key:'accounts',
               title:'Accounts',
               link:'accounts',
               icon:'fa fa-dollar ',
               colorName:'grey',
               subMenu:[
                   {
                       key:'open_invoices',
                       title:'Open Invoices',
                       link:'accounts/invoices',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       key:'unassigned_credits',
                       title:'Unassigned Credits',
                       link:'accounts/unassigned_credits',
                       icon:'flaticon flaticon-user-settings',
                   },
                   {
                       key:'history',
                       title:'History (Transactions)',
                       link:'accounts/transactions',
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