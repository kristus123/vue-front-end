<template>
<b-container>
    <b-row class="justify-content-center">
        <b-col cols="8">
            <div class="flexDropdown" :style="{backgroundImage: 'url(' + image + ')'}">
                <b-form class="customDropdownForm">
                    <b-form-row class="justify-content-center">
                        <b-col cols="8">
                            <b-form-group>
                                <b-input-group>
                                    <b-form-select v-model="selected" :options="options" v-on:change="onSelected"></b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row v-if="cardType == 'person'" class="justify-content-center" style="padding-bottom: 20px;">
                        <b-col cols="8">
                            <person-card :info="selected"/>
                        </b-col>
                    </b-form-row>

                    <b-form-row v-if="cardType == 'player'" class="justify-content-center" style="padding-bottom: 20px;">
                        <b-col cols="8">
                            <player-card/>
                        </b-col>
                    </b-form-row>

                    <b-form-row class="justify-content-center" v-if="showBtn">
                        <b-col cols="8">
                            <b-btn variant="danger" type="submit" value="submit">Delete</b-btn>
                            <b-btn variant="light">Cancel</b-btn>
                        </b-col>
                    </b-form-row>
                </b-form>
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<script>

import PersonCard from '@/components/cards/person/PersonCard'
import PlayerCard from '@/components/cards/player/PlayerCard'

export default {
    name: 'FlexibleDropdownMenu',

    props: ["options", "cardType", "image"],
    components: {
        PersonCard,
        PlayerCard
    },

    data() {
        return {
            selected: null,
            showBtn: false
        }
    },

    methods: {

        onSelected() {
            this.showBtn = true;
        }

    }
    
}
</script>

<style>

.flexDropdown {
    margin: 20px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
}

.customDropdownForm {
    padding-top: 20px;
    padding-bottom: 20px;
}

</style>