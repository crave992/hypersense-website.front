import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {first} from 'rxjs/operators';

import {Field} from '../../models/field.interface';
import {FieldConfig} from '../../models/field-config.interface';
import {AwsStorageService} from '../../../../_services/aws.storage.service';
import {ToastService} from '../../../../../front/shared/core/toasts/toast.service';
import {SettingsService} from '../../../../../front/_services/settings.service';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{header: 1}, {header: 2}],               // custom button values
    [{list: 'ordered'}, {list: 'bullet'}],
    [{script: 'sub'}, {script: 'super'}],      // superscript/subscript
    [{indent: '-1'}, {indent: '+1'}],          // outdent/indent
    [{direction: 'rtl'}],                         // text direction
    [{size: ['small', false, 'large', 'huge']}],  // custom dropdown
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    [{color: []}, {background: []}],          // dropdown with defaults from theme
    [{font: []}],
    [{align: []}],
    ['clean'],                                         // remove formatting button
    ['link', 'image', 'video']                         // link and image, video
];

@Component({
    selector: 'form-quill',
    styleUrls: ['form-quill.component.css'],
    templateUrl: 'form-quill.component.html'
})
export class FormQuillComponent implements Field, OnInit, OnDestroy {
    config: FieldConfig;
    group: FormGroup;
    quillConfig;
    groupSubscribe;
    currentEditor = null;
    itemHtml = null;
    public wordsCount;
    public baseUrl;
    public imageBucket;
    public apiKey;

    /*quill configuration*/
    quillConfigDefault = {
        modules: {
            toolbar: toolbarOptions
        },
        scrollingContainer: '.scrolling-container', // optional
        placeholder: 'Compose your article',
        theme: 'snow',
    };

    constructor(
        private awsStorageService: AwsStorageService,
        private settingsService: SettingsService,
        private toastService: ToastService,
    ) {
        this.showToolbarQuill = this.showToolbarQuill.bind(this);
    }

    ngOnInit() {
        this.settingsService.getFileStorageUrl().then((data) => this.baseUrl = data);
        this.groupSubscribe = this.group.valueChanges.pipe(first()).subscribe((data) => {
            if (data[this.config.name]) {
                this.itemHtml = data[this.config.name];
                if (this.currentEditor) {
                    this.currentEditor.clipboard.dangerouslyPasteHTML(this.itemHtml);
                }
            }
        });

        this.quillConfig = Object.assign(this.quillConfigDefault, this.quillConfig);
        if (this.config.parameters && this.config.parameters.imageBucket) {
            this.imageBucket = this.config.parameters.imageBucket;
        }
        if (this.config.parameters && this.config.parameters.apiKey) {
            this.apiKey = this.config.parameters.apiKey;
        }

    }


    selectLocalImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        // Listen upload local image and save to server
        input.onchange = () => {
            const file = input.files[0];
            // file type is only image.
            if (/^image\//.test(file.type)) {
                this.getAwsLink(file);
            } else {
                this.toastService.warning('You could upload only images.');

            }
        };
    }

    getAwsLink(file: File) {
        const key = this.imageBucket + '/' + file.name;
        const url = this.baseUrl + '/' + key;

        // get signed url
        this.awsStorageService.getCustomSignedUrl(file.type, key, this.apiKey).subscribe(
            (data: any) => {
                if (data.response) {
                    if (data.response.exists) {
                        this.insertToEditor(url);
                    } else {
                        this.awsStorageService.uploadFileAWSS3(data.response.url, file).then(
                            response => {
                                this.insertToEditor(url);
                            });
                    }
                }

            });
    }

    insertToEditor(url: string) {
        // push image url to rich editor.
        const range = this.currentEditor.getSelection();
        this.currentEditor.insertEmbed(range.index, 'image', url);
    }


    onContentChanged(response) {
        if (this.itemHtml !== response.html) {
            this.itemHtml = response.html;
            this.wordsCount = this.count(response.text, 'word');
            this.group.controls[this.config.name].setValue(response.html);
        }
    }

    showToolbarQuill() {
        this.currentEditor.theme.tooltip.edit();
        this.currentEditor.theme.tooltip.show();
    }


    onEditorCreated(response) {
        this.currentEditor = response;
        // quill editor add image handler
        this.currentEditor.getModule('toolbar').addHandler('image', () => {
            this.selectLocalImage();
        });
        if (this.itemHtml) {
            this.currentEditor.clipboard.dangerouslyPasteHTML(this.itemHtml);
        }

    }

    count(text, unit) {
        if (unit === 'word') {
            return text.split(/\s+/).length + ' words';
        } else {
            return text.length + ' characters';
        }
    }

    ngOnDestroy() {
        this.groupSubscribe.unsubscribe();
    }

}
