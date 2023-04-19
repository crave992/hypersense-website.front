import {Deserializable} from './deserializable.model';

import {Inject, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';


export class UserModel implements Deserializable {

    id: number;
    status: number;
    avatarURL: string;
    role: string;
    updatedAt: number;
    createdAt: number;
    topic: string;
    storageFolder: string;
    parentID: number;
    secondaryEmail: string;
    isCompany: number;
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    state: string;
    country: string;
    billingData: number;
    billingIsCompany: number;
    billingFirstName: string;
    billingLastName: string;
    billingAddress: string;
    billingZipCode: string;
    billingState: string;
    billingCountry: string;
    subscriptionType: number;
    subscriptionDueDate: number;
    subscriptionPriceType: number;
    subscriptionPrice: number;
    stripeCustomerID: string;
    cardNumberLast4: string;
    cardExpireMonth: number;
    cardExpireYear: number;
    emailNotification: number;
    secondaryEmailNotification: number;
    username: string;
    email: string;
    emailVerified: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any){
        // used to inject
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getImage(small = true): { src: string; srcSet: string; default: string } {
        if (isPlatformBrowser(this.platformId)) {
            const appSettings = JSON.parse(localStorage.getItem('appSettings'));
            let userImage: string;
            let defaultImage: string;
            let userImageSrcSet: string;

            userImage = 'assets/images/icons/avatar.png';
            userImageSrcSet = 'assets/icons/avatar.png 1x, \n' +
                'assets/images/icons/avatar@2x.png 2x, \n' +
                'assets/images/icons/avatar@3x.png 3x" ';
            defaultImage = userImage;

            if (this.avatarURL && appSettings.fileStorage.url) {
                const extension = this.avatarURL.split('.').pop();
                const regex = new RegExp('.' + extension + '$');

                if (small) {
                    userImage = appSettings.fileStorage.url + '/' + this.avatarURL.replace(regex, '_thumb.' + extension);
                    userImageSrcSet = appSettings.fileStorage.url + '/' + this.avatarURL.replace(regex, '_thumb.' + extension);
                } else {
                    userImage = appSettings.fileStorage.url + '/' + this.avatarURL;
                    userImageSrcSet = appSettings.fileStorage.url + '/' + this.avatarURL;
                }
            }

            return {src: userImage, srcSet: userImageSrcSet, default: defaultImage};
        }

    }
}
// avatarURL: null
// email: "niculescu.adriana@yahoo.com"
// emailRejected: 0
// emailVerificationsRequest: 0
// emailVerified: false
// facebookID: null
// id: 2
// role: "admin"
// storageFolder: "storageFolder"
// topic: "development_Personal_798f16e3-ea90-4857-ad4d-aa6fa2949234"
// username: "niculescu.adriana"
