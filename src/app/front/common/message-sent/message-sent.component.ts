import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-message-sent',
  templateUrl: './message-sent.component.html',
  styleUrls: ['./message-sent.component.scss']
})
export class MessageSentComponent implements OnInit {
  @Input() public contactPage = false;
  @Output() public resetFormEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  resetForm() {
    this.resetFormEvent.emit(true);
  }
}
