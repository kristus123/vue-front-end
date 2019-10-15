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
                            title: "Person",
                            icon: 'fas fa-user',
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
                            title: "Association",
                            icon: 'fas fa-arrows-alt',
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
                            title: "Coach",
                            icon: 'fas fa-user-shield',
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
                            title: "Owner",
                            icon: 'fas fa-user-tie',
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
                            title: "Contact",
                            icon: 'fas fa-address-book',
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
                            title: "Location",
                            icon: 'fas fa-map-marked-alt',
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
                            title: "Season",
                            icon: 'fas fa-calendar-alt',
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