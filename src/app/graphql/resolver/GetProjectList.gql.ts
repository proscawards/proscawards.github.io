import { gql, Query } from 'apollo-angular';
import { Project } from 'src/app/model/data/Project';
import { Injectable } from '@angular/core';

export interface Response {
    getProjectList: Project[]
}

@Injectable({
    providedIn: 'root',
})

export class GetProjectList extends Query<Response> {
    document = gql`{
        getProjectList {
            id
            title
            type
            lang
            desc
            date
            filter
            source
            img
            isWIP
            progImg {
                name
                img
            }
        }
    }
    `    
}