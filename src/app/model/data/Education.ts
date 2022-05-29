interface desc {
    date: string,
    title: string
}

interface links{
    title: string,
    div: string
}

export interface Education {
    id: number,
    name: string,
    link: string,
    date: string,
    type: string,
    hasPosition: Boolean,
    position: desc[],
    hasAward: Boolean,
    award: desc[],
    hasRelatedProject: Boolean,
    relatedProject: links[]
}