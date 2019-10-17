<template>
<b-container>
    <b-row class="justify-content-center">
        <b-col cols="8">
            <div class="flexDropdown" :style="{backgroundImage: 'url(' + image + ')'}">
                <b-form class="customDropdownForm" v-on:submit.prevent="submitForm">
                    <b-form-row class="justify-content-center">
                        <b-col cols="8">
                            <b-form-group>
                                <b-input-group>
                                    <b-form-select v-if="options.length > 0" v-model="selected" :options="options" v-on:change="onSelected"></b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row id="personCard" v-if="cardType == 'person' && this.onShow" class="justify-content-center" style="padding-bottom: 20px;">
                        <b-col cols="8">
                            <person-card :info="selected"/>
                        </b-col>
                    </b-form-row>

                    <b-form-row v-if="cardType == 'player' && this.onShow" class="justify-content-center" style="padding-bottom: 20px;">
                        <b-col cols="8">
                            <player-card/>
                        </b-col>
                    </b-form-row>

                    <b-form-row id="buttons" class="justify-content-center" align-h="between" v-if="this.onShow">
                        <b-col cols="3">
                            <b-btn pill variant="outline-danger" size="lg" type="submit" value="submit">Delete</b-btn>
                        </b-col>
                        <b-col cols="3">
                            <b-btn pill variant="outline-secondary" size="lg" v-on:click="resetForm">Cancel</b-btn>
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
import animateService from '@/services/AnimateService'


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
            onShow: false,
        }
    },

    methods: {

        onSelected() {

            this.onShow = true;
            
        },
        submitForm() {
            
            this.$emit("clicked", this.selected);

            animateService.animate('personCard', 'zoomOutRight', null, () => {
                this.onShow = false;
                this.selected = null;
            });
        },
        resetForm() {

            this.onShow = false;
            this.selected = null;

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
}

#buttons {
    padding-bottom: 20px;
}

</style>