<script setup lang="ts">
import artworkListComponent from '@/components/artworkListComponent.vue';
import type { IArtwork } from '@/artwork';
import { onMounted, ref, defineProps } from 'vue';

const { getImages }= defineProps<{ getImages: CallableFunction }>()

const images = ref<IArtwork[]>([])
const artists = ref<Array<{name: string, artworkId: string}>>([])


const getArtistName = (artworkId: string): string => {
  const artist = artists.value.find((artist) => {
    if(!artist) return false;
    return artist.artworkId === artworkId
  })

  return artist ? artist.name : "[ARTIST_NAME]"
}

onMounted(async () => {
  try{
    const unsplashPhotos = await getImages();
    
    if(Array.isArray(unsplashPhotos)) { 
      for(const img of unsplashPhotos){
        images.value.push({ 
          id: img.id, 
          name: img.description || "[artwork name]", 
          type: "digital", 
          dimensions: {metric: "px", height: img.height, width: img.width},
          image: img.urls.regular
        })

        artists.value.push({ name: img.user.name, artworkId: img.id})
      }
    }
  } catch(err) {
    console.log('Error while pushing to image array', err)
  }
})

</script>

<template>
  <div class="gallery">
    <ul id="artwork-list">
      <artworkListComponent v-for="artwork in images" :key="artwork.id" :artwork="artwork" :artist-name="getArtistName(artwork.id)"/>
    </ul>
  </div>
</template>

<style>
  .gallery {
    min-height: 100vh;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow-x: scroll;
    padding-top: 10rem;
  }

  .gallery::-webkit-scrollbar {
    display: none;
  }

  #artwork-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    display: flex;
    gap: 1.5rem;
    padding: 0;
  }
</style>
