import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";

@Component({
    selector: 'character-builder-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent extends CharacterInjectingComponent {

}
