interface infos{
    id: number,
    title: string,
    desc: desc[]
}

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
    info: infos[],
    hasRelatedProject: Boolean,
    relatedProject: links[]
}