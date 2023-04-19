import {Deserializable} from './deserializable.model';
import {UserModel} from './user.model';
import {PostCategoryModel} from './postCategory.model';

export class PostModel implements Deserializable {
    id: number;
    updatedAt: number;
    createdAt: number;
    publishedAt: number;
    publishURLPath: number;
    status: number;
    title: string;
    excerpt: string;
    imageURL: string;
    imageURLCard: string;
    folder: string;
    content: string;
    duration: number;
    userID: number;
    slug: string;
    seoMetatitle: string;
    seoDescription: string;
    seoKeywords: string;
    seoImageURL: string;
    clickToAction: number;
    user: UserModel;
    categories: PostCategoryModel[];

    deserialize(input: any) {
        Object.assign(this, input);

        if (this.categories) {
            this.categories = input.categories.map(
              (category: PostCategoryModel) => category
            );
        }

        return this;
    }

    category() {
        let title = '';
        if (this.categories.length > 0) {
            if (this.categories[0].title) {
                title = this.categories[0].title;
            }
        }
        return title;
    }
}
