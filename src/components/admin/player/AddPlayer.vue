<template>
    <b-container>
        <h1>Add a player</h1>
        <flexible-form :inputs="inputs" width="100%" :image="image" :color="textColor"/>
    </b-container>
</template>

<script>

import FlexibleForm from '@/components/forms/FlexibleForm'

export default {
    name: 'Addplayer',
    components: {
        FlexibleForm
    },
    data() {
        return {
            textColor: "text-black",
            image: require(`@/assets/action-adult-athlete-1311619.jpg`),
            inputs: [
                {
                    title: "Player ID",
                    placeholder: "Enter a player ID",
                    type: "number",
                    required: true,
                    disabled: true,
                    icon: "fas fa-running"
                },
                {
                    title: "Person ID",
                    placeholder: "Enter a person ID",
                    type: "number",
                    required: true,
                    disabled: true,
                    icon: "fas fa-user"
                },
                {
                    title: "Team ID",
                    placeholder: "Enter a team ID",
                    type: "number",
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "Normal Position",
                    placeholder: "Enter a position",
                    type:"text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-layer-group"
                },
                {
                    title: "Player Number",
                    placeholder: "Enter a player number",
                    type: "number",
                    required: "required",
                    disabled: false,
                    icon: "fas fa-hashtag"
                }
            ]
        }
    }    
}
</script>

<style>

</style>