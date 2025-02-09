<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import type { IArtwork } from '@/artwork';


const { artworkData, deactivateArtwork } = defineProps<{ artworkData: IArtwork, deactivateArtwork: CallableFunction }>()

type ArtworkDisplayState = "expanded" | "compact"
const isExpanded = ref<ArtworkDisplayState>("compact")

const artworkExpandedState = computed({
    get(): ArtworkDisplayState {
        return isExpanded.value
    },
    set(state: ArtworkDisplayState) {
        isExpanded.value = state
    }
})

let artworkDimensionsStr: string = '';
if(artworkData.dimensions){
    artworkDimensionsStr = [ artworkData.dimensions.height, artworkData.dimensions.height ].join(" x ") + ` (${artworkData.dimensions.metric})`
}

</script>

<template>
    <div id="artwork-header">
        <div id="artwork-header-main">
            <i id="nav-back-icon" class="pi pi-angle-left" style="font-size: 1.3rem;" @click="deactivateArtwork()"></i>
            <h2 id="artwork-header-name">{{ artworkData.name }}</h2>
        </div>
        <i id="artwork-header-expand-btn" class="pi pi-expand" v-if="artworkExpandedState === 'compact'" @click="artworkExpandedState = 'expanded'"></i>
        <i id="artwork-header-expand-btn" class="pi pi-arrow-down-left-and-arrow-up-right-to-center" v-else-if="artworkExpandedState === 'expanded'" @click="artworkExpandedState = 'compact'"></i>
    </div>
    <ul id="artwork-details">
        <div id="artwork-name-field" class="artwork-detail-field">
            <span class="artwork-detail-field-name">Name:</span><span class="artwork-detail-field-value">{{ artworkData.name }}</span>
        </div>
        <div id="artwork-type-field" class="artwork-detail-field">
            <span class="artwork-detail-field-name">Type:</span><span class="artwork-detail-field-value">{{ artworkData.type }}</span>
        </div>
        <div id="artwork-dimensions-field" class="artwork-detail-field">
            <span class="artwork-detail-field-name">Dimensions:</span><span class="artwork-detail-field-value">{{ artworkDimensionsStr }}</span>
        </div>
        <div id="artwork-date-field" class="artwork-detail-field">
            <span class="artwork-detail-field-name">Created:</span><span class="artwork-detail-field-value">{{ artworkData.completedOn ? new Date(artworkData.completedOn).toLocaleDateString(undefined, { month: "numeric", year: "numeric", day: "numeric"})  : '' }}</span>
        </div>
        <div id="artwork-description" class="artwork-detail-field">
            <p class="artwork-detail-field-value">{{ artworkData.description }}</p>
        </div>
    </ul>
</template>

<style>
#artwork-header,
#artwork-header-main {
    display: flex;
    flex-direction: row;
    align-items: center;
}

#artwork-header {
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;
}

#artwork-header-main {
    gap: 1rem;
}

#artwork-details {
    margin-left: 2.4rem;
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    gap: 0.3rem;
}

.artwork-detail-field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
}
</style>