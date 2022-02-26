interface cert{
    name: string,
    date: string
}

interface org{
    name: string,
    thumbnail: string
}

interface cred{
    id: string,
    url: string
}
  
export interface Certification {
    cert: cert,
    org: org,
    uni: org,
    cred: cred,
    hasUni: boolean,
    tag: string[]
}