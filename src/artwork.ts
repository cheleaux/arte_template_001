type Metric = 'cm' | 'px' | 'in'

interface IArtworkDimensions {
    metric: Metric,
    height: number,
    width: number,
}

type ArtworkType = 'digital' | 'pyrography' | 'texile' | 'sculpture' | 'painting' | 'sketch'

export type ArtworkMetaData = Pick<IArtwork, "id" | "name" | "completedOn">

export interface IArtwork {
    id: string,
    name: string,
    type: ArtworkType,
    dimensions: IArtworkDimensions,
    image: string, // | Blob --- replace with Blob type
    description?: string,
    altDescription?: string,
    completedOn?: string
}

export type UnsplashImage = {
    id: string,
    urls: { regular: string },
    alt_description?: string,
    description?: string,
    width: number,
    height: number,
    user: { name: string },
    created_at: string,
}

export interface ICollection {
    id: string,
    name: string,
    quantity: number,
    artworks: Array<IArtwork>,
    description?: string,
}

export class Collection {
    id: string
    name: string
    quantity: number
    artworks: Array<IArtwork>
    description?: string
    thumbnailId?: IArtwork['id'] | string

    constructor(id: string, name: string, quantity: number, artworks: Array<IArtwork>, description: string | null = null, thumbnailId: string | null = null){
        this.id = id
        this.name = name
        this.quantity = quantity
        this.artworks = artworks

        if(description) this.description = description;

        if(thumbnailId) {
            this.thumbnailId = thumbnailId;
        } else {
            this.thumbnailId = artworks[0].id
        }
    }
}