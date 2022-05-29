import { gql, Query } from 'apollo-angular';
import { Experience } from 'src/app/model/data/Experience';
import { Injectable } from '@angular/core';

export interface Response {
    getExpList: Experience[]
}

@Injectable({
    providedIn: 'root',
})

export class GetExperienceList extends Query<Response> {
    document = gql`{
        getExpList{
            id
            name
            link
            date
            type
            info {
                title
                desc
            }
            hasRelatedProject
            relatedProject {
                title
                div
            }
        }
    }
    `    
}