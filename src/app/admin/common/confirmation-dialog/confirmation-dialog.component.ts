import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

    @Input() public dialogTitle;
    @Input() public dialogText;
    @Output() public result = new EventEmitter<boolean>();

    constructor(
        public activeModal: NgbActiveModal
    ) {
    }

    ngOnInit() {

    }

    onSubmit() {
        this.result.emit(true);
    }

}
