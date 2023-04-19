import {Injectable} from '@angular/core';
import { ToastService } from '../../shared/core/toasts/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    public toast: ToastService
  ) {

  }

  static log(msg: string): void {
    // console.log(msg);
  }

  public error(msg: string, obj: any = {}): void {

    if (obj.status === 504 || obj.status === 0) {
      this.toast.error('Server is not responding or you have no internet connection.', 'Gateway Timeout.');
    }

    // console.error(msg, obj);
  }
}
