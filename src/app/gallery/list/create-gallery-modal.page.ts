import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
@Component({
  selector: 'create-gallery-modal-page',
  templateUrl: './create-gallery-modal.page.html',
  styleUrls: ['./create-gallery-modal.page.scss'],
})
export class CreateGalleryModalPage implements OnInit  {



  modalTitle: string;
  modelId: number;
  constructor(public modalController: ModalController, private nav: NavController) {

    this.modalTitle = "new Title";
  }

  ngOnInit() {
  }

  close() {
    this.closeModal();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  // createGallery() {
  //   const modal = await this.modalController.create({
  //     component: AddExpensePage,
  //     componentProps: {
  //       expense
  //     }
  //   });


  //   modal.onDidDismiss().then((dataReturned) => {
  //     if (dataReturned.data.id == null) {
  //       this.expenseService.saveExpense(dataReturned.data);
  //     } else {
  //       this.expenseService.updateExpense(dataReturned.data);
  //     }
  //     this.calculateTotalExpense();
  //   });
  //   return await modal.present();
  // }

}