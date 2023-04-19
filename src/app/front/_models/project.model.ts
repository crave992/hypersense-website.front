import {Deserializable} from './deserializable.model';

export class ProjectModel implements Deserializable {
    id: number;
    order: number;
    updatedAt: number;
    createdAt: number;
    publishedAt?: number;
    publishURLPath?: string;
    status?: number;
    title: string;
    project?: string;
    excerpt?: string;
    imageURL?: string;
    folder: string;
    content?: string;
    contentRight?: string;
    industry?: string;
    technologiesList?: string[];
    backgroundGradientColors?: string;
    duration?: number;
    userID: number;
    caseStudy: number;
    slug: string;
    seoMetatitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    seoImageURL?: string;

    deserialize?(input: any) {
        Object.assign(this, input);
        if (input.technologies) {
            try {
                this.technologiesList = JSON.parse(input.technologies);
            } catch {
                this.technologiesList = input.technologies.split(',');
            }

        }

        return this;
    }
}



