import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingController: LoadingController) { }

  async loadingPresent(message: string = null, duration: number = null) {
    const loading = await this.loadingController.create({ message, duration });
    return await loading.present();
}

async loadingDismiss() {
  return await this.loadingController.dismiss(null);
}

}
