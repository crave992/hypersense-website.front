import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'category'
})
export class CategoryPipe implements PipeTransform {

    transform(value: any[]) {

        let title = '';
        if (value.length > 0) {
            if (value[0].title) {
                title = value[0].title;
            }
        }
        return title;
    }

}
