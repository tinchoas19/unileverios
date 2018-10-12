import { Observable } from 'rxjs/Observable';
import { ManagedataProvider } from './../../providers/managedata/managedata';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {

  data : Observable <any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public manager: ManagedataProvider
  ) {
  }

  showAlert(){
    const alert = this.alertCtrl.create({
      title: '¿Cómo participar?',
      cssClass: 'custom-alert',
      message: 
      `
        <p>Es muy sencillo:</p>
        <p>Tenés que apretar el botón “Empezar”, tomarte una foto en familia con nuestro filtro "Bajo el agua" y ya estás participando por uno de los pases para 4 personas para vivir una noche única en el acuario de Temaiken.</p>
        <p>¡Las fotos más divertidas ganan! Tenés tiempo hasta el 4 de noviembre.</p>
        <p>¿Estás listo?</p>
      `,
      buttons:[
        {
          text: 'OK',
          role: 'cancel',
          handler: ()=>{
          }
        }
      ]
    })

    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

  async showAlertEmpezar(){
    const alertEmpezar = this.alertCtrl.create({
      title: 'Ingresá tus datos para continuar',
      cssClass: 'custom-alert-empezar',
      inputs: [
        {
          name:'nombre',
          placeholder: 'Nombre',
          type: 'text'
        },
        {
          name: 'apellido',
          placeholder: 'Apellido',
          type: 'text'
        },
        {
          name: 'id',
          placeholder: 'ID Empleado',
          type: 'number'
        }
      ],
      buttons:[
        {
          text: 'Continuar',
          role: 'cancel',
          handler: data =>{
            if(data.nombre != "" && data.apellido != "" && data.id != ""){
              this.data = this.manager.crearParticipante(data.nombre, data.apellido, data.id);
              this.data.subscribe(result => {
                console.log('saf',result.json().status);
                let status = result.json().status;
              if(status == 200){
                this.manager.setUserId(data.id);
                console.log("go home");
                this.gotoHome();
                
              }else{
                this.showAlertError();
              }
            });
          }else{
            this.showAlertError();
          }
             
              
              /*  
 */
            
            /* console.log('algoo',req)
                
            console.log(data); */
          }
        }
      ]
    });
    alertEmpezar.present();
  }

  /* getAccess(nombre, apellido, id){
    this.manager.crearParticipante(nombre, apellido, id)
      .su
  } */

  gotoHome(){
    this.navCtrl.push(HomePage);
  }

  showAlertError(){
    const alert = this.alertCtrl.create({
      title: '¡Oops...!',
      cssClass: 'custom-alert',
      message: 
      `
        <p>Parece que hubo un error</p>
        <p>Revisá tu conexión a internet e intentalo nuevamente más tarde.</p>
      `,
      buttons:[
        {
          text: 'OK',
          role: 'cancel',
          handler: ()=>{}
        }
      ]
    })
  
    alert.present();
  }

}
