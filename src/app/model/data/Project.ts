interface progImg{
    name: string,
    img: string
}

export interface Project {
    id: number,
    title: string,
    type: string,
    lang: string,
    desc: string,
    date: string,
    icon: string,
    source: string,
    img: string,
    isWIP: boolean,
    progImg: progImg[]
}