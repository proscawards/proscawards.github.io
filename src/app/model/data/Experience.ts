interface jobScope{
    title: string,
    desc: string[]
}

interface links{
    title: string,
    div: string
}

export interface Experience {
    id: number,
    name: string,
    link: string,
    date: string,
    type: string,
    info: jobScope[],
    hasRelatedProject: Boolean,
    relatedProject: links[]
}