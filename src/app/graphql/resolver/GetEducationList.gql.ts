import { gql, Query } from 'apollo-angular';
import { Education } from 'src/app/model/data/Education';
import { Injectable } from '@angular/core';

export interface Response {
    getEduList: Education[]
}

@Injectable({
    providedIn: 'root',
})

export class GetEducationList extends Query<Response> {
    document = gql`{
        getEduList {
            id
            name
            link
            date
            type
            hasPosition
            position {
                date
                title
            }
            hasAward
            award {
                date
                title
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