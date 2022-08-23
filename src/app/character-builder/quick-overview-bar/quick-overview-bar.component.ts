import {Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {DODGE_TEXT, HEALTH_TEXT, MANA_TEXT, NOTICE_TEXT, STAMINA_TEXT, WILLPOWER_TEXT} from "../../data/texts";

@Component({
  selector: 'quick-overview-bar',
  templateUrl: './quick-overview-bar.component.html',
  styleUrls: ['./quick-overview-bar.component.scss']
})
export class QuickOverviewBarComponent extends CharacterInjectingComponent{
    _HEALTH_TEXT = HEALTH_TEXT;
    _STAMINA_TEXT = STAMINA_TEXT;
    _MANA_TEXT = MANA_TEXT;
    _DODGE_TEXT = DODGE_TEXT;
    _NOTICE_TEXT = NOTICE_TEXT;
    _WILLPOWER_TEXT = WILLPOWER_TEXT;
    _VALUE_LEVEL_DEPENDENT = "<br /><br /><b>Values is different from shown while in Combat/Adventure/Social. More details on overview screen</b>";
}
