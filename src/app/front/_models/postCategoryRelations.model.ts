import {Deserializable} from './deserializable.model';
import {PostCategoryModel} from './postCategory.model';

export class PostCategoryRelationsModel implements Deserializable {
  id: number;
  postID: number;
  postCategoriesID: number;
  updatedAt: number;
  createdAt: number;
  category: PostCategoryModel;

  deserialize(input: any) {
      Object.assign(this, input);
      return this;

      if (this.category) {
        this.category = input.category;
      }

  }

}
