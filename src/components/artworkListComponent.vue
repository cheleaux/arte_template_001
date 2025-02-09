<script setup lang="ts">
import type { IArtwork } from '@/artwork';

const { artwork, artistName } = defineProps<{
  artwork: IArtwork,
  artistName: string
}>()

const { id, image, altDescription } = artwork

const imageURL: string = typeof image === "string" ? image : URL.createObjectURL(image);
</script>

<template>
  <li :id="id" class="artwork">
      <img :src="imageURL" :alt="altDescription || `artwork made by ${artistName}`">
    <h3 id="artwork-name">{{ artistName }}</h3>
  </li>
</template>

<style scoped>
.artwork {
  width: 20rem;
  margin-bottom: 2rem;
  list-style-type: none;
}

.artwork > img {
  margin-bottom: 1.5rem;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
  height: 22rem;
}
</style>
