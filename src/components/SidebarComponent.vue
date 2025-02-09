<script setup lang="ts">
import type { IArtwork, ArtworkMetaData, UnsplashImage } from '@/artwork.ts'
import { ref } from 'vue';

import SidebarGalleryList from './SidebarGalleryListComponent.vue';
import SidebarArtworkDetails from './SidebarArtworkDetailsComponent.vue';

const { getImage, getImages } = defineProps<{ getImage: CallableFunction, getImages: CallableFunction }>()
const artworks: UnsplashImage[] = await getImages()

const activeArtwork = ref<IArtwork | null>()

const activateArtwork = async (artworkId: string): Promise<IArtwork | void> => {
    try {
        const image: UnsplashImage = await getImage(artworkId)
        
        if(image) {
            const artwork: IArtwork = { 
                id: image.id,
                image: image.urls.regular, 
                name: image.user.name, 
                altDescription: image.alt_description, 
                completedOn: image.created_at, 
                dimensions: { metric: "px", height: image.height, width: image.width }, 
                type: "digital",
            }
            console.log(artwork)
            activeArtwork.value = artwork
            return artwork
        }
    } catch(err) {
        console.log("Error while retrieving the artwork data", err)
        throw err 
    }
}

const deactivateArtwork = (): void => { activeArtwork.value = activeArtwork.value ? null : activeArtwork.value}

let artworkMetadata: ArtworkMetaData[] = [];

if(!activeArtwork.value ){
    artworkMetadata = artworks.map((artwork: UnsplashImage) => ({ 
        id: artwork.id ?? "999", 
        name: artwork.user.name ?? "...",
        completedOn: artwork.created_at ? new Date(artwork.created_at).getFullYear().toString() :  "--/--/--"
    }))
}
</script>

<template>
    <div id="sidebar">
        <div id="title-seciton">
            <h1 id="artist-name">Clem Wittaker</h1>
        </div>
        <main id="sidebar-body">
            <section id="gallery-menu">
                <div id="gallery-nav-tabs">
                    <button class="gallery-tab-btn">Pieces</button>
                    <button class="gallery-tab-btn">Collections</button>
                </div>

                <SidebarArtworkDetails v-if="activeArtwork" :artworkData="activeArtwork" :deactivateArtwork="deactivateArtwork"/>
                <SidebarGalleryList v-else :metadata="artworkMetadata" :activateArtwork="activateArtwork" :deactivateArtwork="deactivateArtwork"/>
            </section>
            <section id="main-menu">
                <ul id="menu-options">
                    <li class="main-menu-option"><a href="" class="menu-option-link">Gallery</a></li>
                    <li class="main-menu-option"><a href="" class="menu-option-link">contact</a></li>
                    <li class="main-menu-option"><a href="" class="menu-option-link">News</a></li>
                </ul>
            </section>
        </main>
        <footer id="sidebar-footer">
            <p class="copyright-declaration">© 2018 Clem Witter, All Right Reserved</p>
        </footer>
    </div>
</template>

<style>
#sidebar {
    height: 100vh;
    max-width: 30rem;
    min-width: 25rem;
    width: 100%;
    padding: 10rem 5rem 5.625rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 2rem;
    justify-content: space-between;
}

#sidebar#title-seciton {
    width: max-content;
    max-width: 100%;
}

#sidebar-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 2;
}

#sidebar-body > #gallery-menu > * {
    padding-left: 0;
}

#gallery-nav-tabs {
    display: flex;
    gap: 1.2rem;
    max-width: 100%;
    margin-bottom: 0.765rem;
}

.gallery-tab-btn {
    background-color: transparent;
    color: #ffffff33;
    border: none;
    outline: none;
    width: max-content;
    padding: 0;
}

.gallery-tab-btn.active-tab {
    color: #ffffff;
}

.gallery-tab-btn:hover {
    color: #ffffffdd;
}

.gallery-tab-btn:active {
    color: #ffffffff;
}


.main-menu-option > a,
.main-menu-option > a:visited {
    color: revert;
    color: white;
    text-decoration: none;
}

</style>