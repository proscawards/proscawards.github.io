import { gql, Query } from 'apollo-angular';
import { Skill } from 'src/app/model/data/Skill';
import { Injectable } from '@angular/core';

export interface Response {
    getSkillList: Skill[]
}

@Injectable({
    providedIn: 'root',
})

export class GetSkillList extends Query<Response> {
    document = gql`{
        getSkillList {
            id
            name
            faIcon
            prefix
            labels
            data
            color
            type
        }
    }
    `    
}