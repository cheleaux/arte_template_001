import type { IArtwork } from "./artwork"


const metadata: Array<Partial<Omit<IArtwork, "image">>> = [
    {
    id: '087240574',
    name: "Sharktide",
    type: "digital",
    dimensions: {
      metric: "px",
      height: 8754,
      width: 14235,
    },
    completedOn: '2025-07-20'
  },
  {
    id: '098345723',
    name: "Eclipse Mirage",
    type: "digital",
    dimensions: {
      metric: "px",
      height: 6000,
      width: 9000,
    },
    completedOn: '2024-11-15'
  },
  {
    id: '023987654',
    name: "Golden Hour",
    type: "painting",
    dimensions: {
      metric: "cm",
      height: 80,
      width: 120,
    },
    completedOn: '2023-06-10'
  },
  {
    id: '076542198',
    name: "Urban Decay",
    type: "digital",
    dimensions: {
      metric: "px",
      height: 4000,
      width: 6000,
    },
    completedOn: '2024-03-05'
  },
  {
    id: '054321987',
    name: "Dreamscape",
    type: "digital",
    dimensions: {
      metric: "px",
      height: 100,
      width: 150,
    },
    completedOn: '2023-09-25'
  },
  {
    id: '098761234',
    name: "Celestial Dance",
    type: "digital",
    dimensions: {
      metric: "px",
      height: 5000,
      width: 8000,
    },
    completedOn: '2025-01-30'
  },
  {
    id: '045678912',
    name: "Frozen Echo",
    type: "sculpture",
    dimensions: {
      metric: "in",
      height: 2.5,
      width: 1.2,
    },
    completedOn: '2022-12-14'
  },
  {
    id: '067234890',
    name: "Silent Tempest",
    type: "sketch",
    dimensions: {
      metric: "in",
      height: 42,
      width: 59.4,
    },
    completedOn: '2023-08-08'
  }
]

export default metadata;