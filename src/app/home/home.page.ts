import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs'
import { ShowDataPage } from '../show-data/show-data.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dataFromService: any = "";
  url: any = "../../assets/data.json";
  images: any = [];
  constructor(public http: HttpClient, private toastController: ToastController,
    private modal: ModalController) {}

  ngOnInit(){
    this.GetImages();
  }
  
  async GetImages(){
  
   this.ParseData().subscribe((dataReturnFromService) => {
   this.dataFromService = JSON.stringify(dataReturnFromService);
   console.log(this.dataFromService);
   for (let i = 0; i < dataReturnFromService.length; i++) {
   this.images.push(dataReturnFromService[i])
}
   }, error => { console.log('oops', error);
  this.GetToast('Something went Wrong');
  });
  }
  async GetToast(text){
    const toast = await this.toastController.create ({
      message: text,
      duration: 3000

    });
    console.log(toast);
    toast.present();
   }
   ParseData(): Observable<any> {
    console.log('get json');
    return this.http.get(this.url);
}
async OpenOfferModal(){
  const Modal = await this.modal.create({component: ShowDataPage, cssClass: "filter-modal"});
Modal.onDidDismiss()
  .then((data) => {
    console.log(data);
    if (data !== null) {
  }
});
return await Modal.present();
}
}       
