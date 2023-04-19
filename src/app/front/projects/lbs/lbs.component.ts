import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-lbs',
  templateUrl: './lbs.component.html',
  styleUrls: ['./lbs.component.scss']
})
export class LbsComponent implements OnInit {
  imageSizes: any[];

  constructor() { }

  ngOnInit(): void {
    this.imageSizes = environment.imageSizes;
  }

  imageSizeList(name: string, path: string = 'images', extensions: string[] = ['webp', 'png']): {media: string; type: string; srcSet: string}[] {
    const list = [];

    for (const entry of this.imageSizes) {

      for (const extension of extensions) {
        const source: {media: string; type: string; srcSet: string} = {media: '', type: '', srcSet: ''};
        source.media = entry.media;
        source.type = `image/${extension}`;
        source.srcSet = `assets/${path}${entry.folder}${name}.${extension}    1x, ` +
          `assets/${path}${entry.folder}${name}@2x.${extension} 2x, ` +
          `assets/${path}${entry.folder}${name}@3x.${extension} 3x  `;

        list.push(source);
      }

    }

    return list;
  }

}
