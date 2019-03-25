import {Component, Injector, NgModuleFactory, OnDestroy, OnInit, SystemJsNgModuleLoader} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounce, debounceTime, tap} from 'rxjs/operators';
import {KonamiService} from '../konami/konami.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ShortenerDialogComponent} from '../url-shortener/shortener-dialog/shortener-dialog.component';

declare var particlesJS: any;

@Component({
  selector: 'dev-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit, OnDestroy {
  private dialogRef: MatDialogRef<ShortenerDialogComponent> = null;
  private konamiSubscription: Subscription;

  constructor(
    private konami: KonamiService,
    private dialog: MatDialog,
    private loader: SystemJsNgModuleLoader,
    private inj: Injector,
  ) { }

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json', null);
    this.konamiSubscription = this.konami.onCode().subscribe(() => {

      /*this.loader.load('./url-shortener/url-shortener.module#UrlShortenerModule')
        .then((moduleFactory: NgModuleFactory<any>) => {
          const moduleRef = moduleFactory.create(this.inj);
          const entryComponent = (<any>moduleFactory.moduleType).entry;
          const compFactory =
            moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
          this.dialog.open(compFactory.componentType);
        });*/
      if (this.dialogRef === null) {
        this.dialogRef = this.dialog.open(ShortenerDialogComponent, {minWidth: '60%', maxWidth: '80%'});
        this.dialogRef.afterClosed().subscribe(() => this.dialogRef = null);
      }
    });
  }

  ngOnDestroy(): void {
    this.dialogRef.close();
    this.konamiSubscription.unsubscribe();
  }

}
