import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-updateachat',
  templateUrl: './updateachat.page.html',
  styleUrls: ['./updateachat.page.scss'],
})
export class UpdateachatPage implements OnInit {

  id: number;
  titre = '';
  poids = 0;
  amount = 0;

  imgBijou = '';
  imgRecto = '';
  imgVerso = '';

  imgBijouName = '';
  imgRectoName = '';
  imgVersoName = '';

  @ViewChild('fileBijou') fileBijou: ElementRef;
  @ViewChild('fileRecto') fileRecto: ElementRef;
  @ViewChild('fileVerso') fileVerso: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toast: ToastController,
    private postPvdr: PostProvider,
    private plt: Platform
  ) {}

  ngOnInit() {
    this.plt.ready().then(() => {
      this.route.params.subscribe(function(p) {
        this.id = Number(p.id);
        this.titre = p.titre;
      }.bind(this));
    });
  }

  openFile(type) {
    if (type === 'bijou') {
      this.fileBijou.nativeElement.click();
    }
    if (type === 'recto') {
      this.fileRecto.nativeElement.click();
    }
    if (type === 'verso') {
      this.fileVerso.nativeElement.click();
    }
  }

  onFileSelected(event, type) {
    if (!event || !event.target || !event.target.files) {
      this.showToast('Aucun fichier détecté', 'warning');
      return;
    }

    var file = event.target.files[0];
    if (!file) {
      this.showToast('Aucun fichier sélectionné', 'warning');
      return;
    }

    var preview = URL.createObjectURL(file);

    if (type === 'bijou') this.imgBijou = preview;
    if (type === 'recto') this.imgRecto = preview;
    if (type === 'verso') this.imgVerso = preview;

    var serverName = new Date().getTime() + '.jpg';

    var formData = new FormData();
    formData.append('file', file, serverName);

    this.showToast('📤 Upload image...', 'warning');

    this.http.post(
      'https://mobile.bijouteriesal1.com/server_apisengoldprojet/upload.php',
      formData
    ).subscribe(
      function(res: any) {
        if (!res || res.success !== true) {
          this.showToast('❌ Échec upload image', 'danger');
          return;
        }

        if (type === 'bijou') this.imgBijouName = serverName;
        if (type === 'recto') this.imgRectoName = serverName;
        if (type === 'verso') this.imgVersoName = serverName;

        this.showToast('✅ Image uploadée', 'success');
      }.bind(this),
      function() {
        this.showToast('❌ Serveur upload indisponible', 'danger');
      }.bind(this)
    );
  }

  updateachatProses() {
    if (!this.imgBijouName || !this.imgRectoName || !this.imgVersoName) {
      this.showToast(
        'Photos manquantes → Bijou:' + !!this.imgBijouName +
        ' Recto:' + !!this.imgRectoName +
        ' Verso:' + !!this.imgVersoName,
        'danger'
      );
      return;
    }

    var body = {
      aksi: 'updateachat',
      achat_id: this.id,
      titre: this.titre,
      poids: this.poids,
      amount: this.amount,
      pic_filename: this.imgBijouName,
      pic_cni_recto: this.imgRectoName,
      pic_cni_verso: this.imgVersoName
    };

    this.showToast('💾 Mise à jour...', 'warning');

    this.postPvdr.postData(body, 'file_aksi.php')
      .subscribe(
        function(res: any) {
          if (res && res.success) {
            this.showToast('✅ Achat mis à jour', 'success');
            this.router.navigate(['/achats']);
          } else {
            this.showToast(res.msg || 'Erreur mise à jour', 'danger');
          }
        }.bind(this),
        function() {
          this.showToast('❌ API indisponible', 'danger');
        }.bind(this)
      );
  }

  showToast(message, color) {
    this.toast.create({
      message: message,
      duration: 2200,
      color: color,
      position: 'top'
    }).then(function(t) {
      t.present();
    });
  }
}