import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ScriptStore} from '../../_configs/dinamicLoadScripts';


declare let document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    if (this.checkIsBrowser()) {
      const promises: any[] = [];
      scripts.forEach((script) => promises.push(this.loadScript(script)));
      return Promise.all(promises);
    } else {
      return Promise.all([null]);
    }
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.async = true;
        if (script.readyState) {  // IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  // Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

  public checkIsBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
