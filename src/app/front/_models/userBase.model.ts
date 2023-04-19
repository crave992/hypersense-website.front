import {Deserializable} from './deserializable.model';

export class UserBaseModel implements Deserializable {
    avatarURL: string;
    email: string;
    emailRejected: number;
    emailVerificationsRequest: number;
    emailVerified: boolean;
    facebookID: number;
    id: number;
    role: string;
    storageFolder: string;
    topic: string;
    username: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}


