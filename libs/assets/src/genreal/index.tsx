import bow from './icon_bow.png'
import catalyst from './icon_catalyst.png'
import claymore from './icon_claymore.png'
import polearm from './icon_polearm.png'
import sword from './icon_sword.png'

import circlet from './icon_slot_circlet.png'
import flower from './icon_slot_flower.png'
import goblet from './icon_slot_goblet.png'
import plume from './icon_slot_plume.png'
import sands from './icon_slot_sands.png'

import resin_condensed from './Item_Condensed_Resin.png'
import resin_fragile from './Item_Fragile_Resin.png'

import book1 from "./Item_Adventurer's_Experience.png"
import book2 from "./Item_Hero's_Wit.png"
import book3 from "./Item_Wanderer's_Advice.png"

import team1 from './icon_team_1.png'
import team2 from './icon_team_2.png'
import team3 from './icon_team_3.png'
import team4 from './icon_team_4.png'

import team1_coop from './icon_team_coop_1.png'
import team2_coop from './icon_team_coop_2.png'
import team3_coop from './icon_team_coop_3.png'
import team4_coop from './icon_team_coop_4.png'

export const generalAssets = {
  weaponType: {
    bow,
    catalyst,
    claymore,
    polearm,
    sword,
  },
  slot: {
    flower,
    plume,
    sands,
    goblet,
    circlet,
  },
  resin: {
    resin_fragile,
    resin_condensed,
  },
  exp_book: {
    book1,
    book2,
    book3,
  },
  team: {
    team1,
    team2,
    team3,
    team4,
  },
  team_coop: {
    team1_coop,
    team2_coop,
    team3_coop,
    team4_coop,
  },
} as const
