import {Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {DODGE_TEXT, HEALTH_TEXT, MANA_TEXT, NOTICE_TEXT, STAMINA_TEXT, WILLPOWER_TEXT} from "../../data/texts";
import {Character} from "../../classes/character";
import {DeepReadonly} from "ts-essentials";
import {DiceAndFixed} from "../../classes/dice-and-fixed";
import {DiceAndFixedAndLevel} from "../../classes/dice-and-fixed-and-level";

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
    _VALUE_LEVEL_DEPENDENT = "<br /><br /><b>* Values is different from shown while in Combat/Adventure/Social. More details on overview screen</b>";

    getDodgeTooltipText(dal: DeepReadonly<DiceAndFixedAndLevel>) {
        return QuickOverviewBarComponent.getUpperLowerText(dal) + this._DODGE_TEXT + (dal.hasLevelSpecificValues() ? this._VALUE_LEVEL_DEPENDENT : '')
    }

    getNoticeTooltipText(dal: DeepReadonly<DiceAndFixedAndLevel>) {
        return QuickOverviewBarComponent.getUpperLowerText(dal) + this._NOTICE_TEXT + (dal.hasLevelSpecificValues() ? this._VALUE_LEVEL_DEPENDENT : '')
    }

    getWillpowerTooltipText(dal: DeepReadonly<DiceAndFixedAndLevel>) {
        return QuickOverviewBarComponent.getUpperLowerText(dal) + this._WILLPOWER_TEXT + (dal.hasLevelSpecificValues() ? this._VALUE_LEVEL_DEPENDENT : '')
    }

    private static getUpperLowerText(dal: DeepReadonly<DiceAndFixedAndLevel>): string {
        return `Range you need to roll in: ${dal.increaseFixed(8).min()} - ${dal.increaseFixed(20).max()} <br /><br />`;
    }
}
