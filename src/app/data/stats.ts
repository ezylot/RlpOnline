import {Stats} from "../classes/stats";
import {Immutable} from "immer";

export function standardArray(): Immutable<Stats> { return new Stats(10, 9, 9, 7, 5, 4, 3); }
export function zeroStats(): Immutable<Stats> { return new Stats(0,0,0,0,0,0,0); }
