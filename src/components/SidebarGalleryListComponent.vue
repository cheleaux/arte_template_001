<script setup lang="ts">
import { defineProps } from 'vue';
import type { ArtworkMetaData } from '@/artwork';

const { metadata, activateArtwork } = defineProps<{ metadata: ArtworkMetaData[], deactivateArtwork: CallableFunction, activateArtwork: CallableFunction }>()
</script>

<template>
    <ul id="gallery-artwork-list">
        <li class="artwork-list-item" v-for="art in metadata" :key="art.id" @click="activateArtwork(art.id)">
            <span class="artwork-date">{{ art.completedOn }}</span>
            <h2 class="artwork-item-title">{{ art.name }}</h2>
        </li>
    </ul>
</template>

<style>
#gallery-artwork-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    height: 40rem;
    overflow-x: scroll;
}

#gallery-artwork-list::-webkit-scrollbar {
    display: none;;
}

.artwork-list-item {
    list-style-type: none;

}

#main-menu > #menu-options {
    list-style-type: none;
    margin-bottom: 2rem;
    padding-left: 0;
}
</style>