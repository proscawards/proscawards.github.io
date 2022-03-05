import { NgModule } from '@angular/core';
import { Social3dComponent } from './social3d.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
    return player;
}

@NgModule({
    imports: [LottieModule.forRoot({ player: playerFactory })],
    exports: [Social3dComponent],
    declarations: [Social3dComponent],
    providers: [],
 })

export class Social3dModule { }
