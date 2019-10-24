<template>
<b-container>
    <sidebar-menu  style="text-align: left;" :menu="menu"/>
    <router-view style="margin: 20px;"/>
</b-container>

</template>

<script>
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import {SidebarMenu} from 'vue-sidebar-menu'
import Separator from '@/components/Nav/admin/Separator'


export default {
    components: {
        SidebarMenu,
        Separator
    },

    data() {
        return {
            menu: [
                {
                    header: true,
                    title: "Admin",
                    hiddenOnCollapse: true
                },
                {
                    href: {
                        path: '/admin'
                    },

                    title: "Dashboard",
                    icon: "fas fa-columns"
                },
                {
                    title: "Tables",
                    icon: "fas fa-table",
                    child: [
                        {
                            title: "Player",
                            icon: 'fas fa-running',
                            child: [
                                {
                                    href: {
                                        path:"/admin/add/player"
                                    },
                                    title: "Add",
                                    icon: 'fas fa-plus-circle'
                                },
                                {

                                    href: {
                                        path: "/admin/update/player"
                                    },
                                    title: "Update",
                                    icon: "fas fa-wrench"
                                }
                            ]
                        },
                        {
                            title: "Person",
                            icon: 'fas fa-user',
                            child: [
                                {
                                    href: {
                                        path: "/admin/add/person"
                                    },
                                    title: "Add",
                                    icon: 'fas fa-plus-circle'
                                },
                                {
                                    href: {
                                        path: "/admin/delete/person"
                                    },
                                    title: "Delete",
                                    icon: 'fas fa-minus-circle'
                                },
                                {
                                    href: {
                                        path: "/admin/update/person"
                                    },
                                    title: "Update",
                                    icon: "fas fa-wrench"
                                }
                            ]
                        }, 
                        {
                            title: "Association",
                            icon: 'fas fa-arrows-alt',
                            href : {path: '/admin/all/association'}
                        },
                        {
                            title: "Coach",
                            icon: 'fas fa-user-shield',
                            href: {path: "/admin/all/coach"}
                        },
                        {
                            title: "Owner",
                            icon: 'fas fa-user-tie',
                            href : {path : "/admin/all/owner"}
                        },
                        {
                            title: "Match Position",
                            icon: 'fas fa-list-ol',
                            child: [
                                {
                                    href: "#",
                                    title: "Add",
                                    icon: 'fas fa-plus-circle'
                                },
                                {
                                    href: "#",
                                    title: "Delete",
                                    icon: 'fas fa-minus-circle'
                                },
                                {
                                    href:"#",
                                    title: "Update",
                                    icon: "fas fa-wrench"
                                }
                            ]
                        },
                        {
                            title: "Result",
                            icon: 'fas fa-medal',
                            href: {
                                path: "/admin/result"
                            }
                        },
                        {
                            title: "Team",
                            icon: 'fas fa-users',
                            child: [
                                {
                                    href: "#",
                                    title: "Add",
                                    icon: 'fas fa-plus-circle'
                                },
                                {
                                    href: "#",
                                    title: "Delete",
                                    icon: 'fas fa-minus-circle'
                                },
                                {
                                    href:"#",
                                    title: "Update",
                                    icon: "fas fa-wrench"
                                }
                            ]
                        },
                        {
                            title: "Address",
                            icon: 'fas fa-address-card',
                            href: {path: "/admin/show/address"}
                        },
                        {
                            title: "Location",
                            icon: 'fas fa-map-marked-alt',
                            href: {path: '/admin/all/location'}
                             
                        },
                        {
                            title: "Season",
                            icon: 'fas fa-calendar-alt',
                            href: {
                                path: '/admin/season'
                            }
                        },
                        {
                            title: "Goal Type",
                            icon: 'fas fa-crosshairs',
                            child: [
                                {
                                    href: "#",
                                    title: "Add",
                                    icon: 'fas fa-plus-circle'
                                },
                                {
                                    href: "#",
                                    title: "Delete",
                                    icon: 'fas fa-minus-circle'
                                },
                                {
                                    href:"#",
                                    title: "Update",
                                    icon: "fas fa-wrench"
                                }
                            ]
                        },
                        {
                            title: "Match Goal",
                            icon: 'fas fa-futbol',
                            child: [
                                {
                                    href: "#",
                                    title: "Add",
                                    icon: 'fas fa-plus-circle'
                                },
                                {
                                    href: "#",
                                    title: "Delete",
                                    icon: 'fas fa-minus-circle'
                                },
                                {
                                    href:"#",
                                    title: "Update",
                                    icon: "fas fa-wrench"
                                }
                            ]
                        },
                        {
                            title: "Match",
                            icon: 'fas fa-fire-alt',
                            href: {
                                path: "/admin/match"
                            }
                        },
                        {
                            title: "History",
                            icon: 'fas fa-history',
                            child: [
                                {
                                    href: "#",
                                    title: "Add",
                                    icon: 'fas fa-plus-circle'
                                },
                                {
                                    href: "#",
                                    title: "Delete",
                                    icon: 'fas fa-minus-circle'
                                },
                                {
                                    href:"#",
                                    title: "Update",
                                    icon: "fas fa-wrench"
                                }
                            ]
                        }
                    ]
                },
                {
                    component: Separator
                },
                {
                    header: true,
                    title: "Settings",
                    hiddenOnCollapse: true

                },
                {
                    href:"#",
                    title: "Database",
                    icon: "fas fa-database"
                }
            ]
        }
    }
    
}
</script>

<style>

</style>