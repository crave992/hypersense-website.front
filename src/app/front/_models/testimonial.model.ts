import {Deserializable} from './deserializable.model';

export class TestimonialModel implements Deserializable {

    id: number;
    updatedAt: number;
    createdAt: number;
    sourceURL: string;
    source: string;
    name: string;
    src: string;
    location: string;
    title: string;
    company: string;
    description: string;
    rank: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}
