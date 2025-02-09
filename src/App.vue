<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SidebarComponent.vue'
import type { UnsplashImage } from './artwork';

// extract create a state machine for each view to map out and manage to state for each component
// Not all components between state machine and the state user with need access to the state, so conider creating state inteface within parent component
// This could be added to the machine at runtime, if and when its need.

const getImages = async (): Promise<UnsplashImage[]> => {
  try {
    const publicKey: string = "Ye8G9BmKQivaWd_bTm4drEqfErTD_AcNIQ_V4pZX-cU"
    const res = await fetch(`https://api.unsplash.com/photos?page=1&per_page=20&client_id=${publicKey}`)

    const data = (await res.json()) as UnsplashImage[]
    return data
  } catch(err){
    console.log("error fetching images", err)
    return []
  }
}

const getImage = async (ID: string): Promise<UnsplashImage | []> => {
  try {
    const publicKey: string = "Ye8G9BmKQivaWd_bTm4drEqfErTD_AcNIQ_V4pZX-cU"
    const res = await fetch(`https://api.unsplash.com/photos/${ID}?client_id=${publicKey}`)

    if(!res.ok){
      throw new Error(`Failed Request to: https://api.unsplash.com/photos/${ID}`)
    }
    
    const data = (await res.json()) as UnsplashImage
    return data
  } catch(err){
    console.log("Error fetching images", err)
    throw err
  }
}

</script>

<template>
  <Suspense>
    <Sidebar :getImage="getImage" :getImages="getImages"/>
  </Suspense>
  <RouterView :getImages="getImages"/>
</template>

<style scoped></style>
