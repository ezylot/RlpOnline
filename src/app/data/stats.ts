import {Stats} from "../classes/stats";
import {DeepReadonly} from "ts-essentials";
import {deepFreeze} from "../definitions";

export const STANDARD_ARRAY: DeepReadonly<Stats> = deepFreeze(new Stats(10, 9, 9, 7, 5, 4, 3));
export const ZERO_STATS: DeepReadonly<Stats> = deepFreeze(new Stats(0,0,0,0,0,0,0));
