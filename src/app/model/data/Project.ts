interface progImg{
    name: string,
    img: string
}

export interface Project {
    _id: string,
    id: number,
    title: string,
    type: string,
    lang: string,
    desc: string,
    date: string,
    filter: string,
    source: string,
    img: string,
    isWIP: boolean,
    progImg: progImg[]
}