import type {
  ArtifactSlotKey,
  ElementKey,
  StatKey,
} from '@genshin-builder/consts'
import type { SvgIconProps } from '@mui/material'

import { CircletIcon } from './icons/ArtifactSlot/CircletIcon'
import { FlowerIcon } from './icons/ArtifactSlot/FlowerIcon'
import { GobletIcon } from './icons/ArtifactSlot/GobletIcon'
import { PlumeIcon } from './icons/ArtifactSlot/PlumeIcon'
import { SandsIcon } from './icons/ArtifactSlot/SandsIcon'
import { AnemoIcon } from './icons/Element/AnemoIcon'
import { CryoIcon } from './icons/Element/CryoIcon'
import { DendroIcon } from './icons/Element/DendroIcon'
import { ElectroIcon } from './icons/Element/ElectroIcon'
import { GeoIcon } from './icons/Element/GeoIcon'
import { HydroIcon } from './icons/Element/HydroIcon'
import { PyroIcon } from './icons/Element/PyroIcon'
import { AtkIcon } from './icons/Stats/AtkIcon'
import { CritDmgIcon } from './icons/Stats/CritDmgIcon'
import { CritRateIcon } from './icons/Stats/CritRateIcon'
import { DefIcon } from './icons/Stats/DefIcon'
import { EleMasIcon } from './icons/Stats/EleMasIcon'
import { EnerRechIcon } from './icons/Stats/EnerRechIcon'
import { HealingBonusIcon } from './icons/Stats/HealingBonusIcon'
import { HpIcon } from './icons/Stats/HpIcon'
import { PhysicalIcon } from './icons/Element/PhysicalIcon'

export * from './icons/ArtifactSlot/CircletIcon'
export * from './icons/ArtifactSlot/FlowerIcon'
export * from './icons/ArtifactSlot/GobletIcon'
export * from './icons/ArtifactSlot/PlumeIcon'
export * from './icons/ArtifactSlot/SandsIcon'

export * from './icons/Element/AnemoIcon'
export * from './icons/Element/CryoIcon'
export * from './icons/Element/DendroIcon'
export * from './icons/Element/ElectroIcon'
export * from './icons/Element/GeoIcon'
export * from './icons/Element/HydroIcon'
export * from './icons/Element/PhysicalIcon'
export * from './icons/Element/PyroIcon'

export * from './icons/Stats/AtkIcon'
export * from './icons/Stats/CdRedIcon'
export * from './icons/Stats/CritDmgIcon'
export * from './icons/Stats/CritRateIcon'
export * from './icons/Stats/DefIcon'
export * from './icons/Stats/EleMasIcon'
export * from './icons/Stats/EnerRechIcon'
export * from './icons/Stats/HealAddIcon'
export * from './icons/Stats/HealingBonusIcon'
export * from './icons/Stats/HpIcon'
export * from './icons/Stats/ShieldStrIcon'
export * from './icons/Stats/StaminaIcon'

export function SlotIcon({
  key,
  iconProps = {},
}: {
  key: ArtifactSlotKey
  iconProps?: SvgIconProps
}) {
  switch (key) {
    case 'flower':
      return <FlowerIcon {...iconProps} />
    case 'plume':
      return <PlumeIcon {...iconProps} />
    case 'sands':
      return <SandsIcon {...iconProps} />
    case 'goblet':
      return <GobletIcon {...iconProps} />
    case 'circlet':
      return <CircletIcon {...iconProps} />
  }
}

export function ElementIcon({
  key,
  iconProps = {},
}: {
  key: ElementKey
  iconProps?: SvgIconProps
}) {
  switch (key) {
    case 'anemo':
      return <AnemoIcon {...iconProps} />
    case 'cryo':
      return <CryoIcon {...iconProps} />
    case 'dendro':
      return <DendroIcon {...iconProps} />
    case 'electro':
      return <ElectroIcon {...iconProps} />
    case 'geo':
      return <GeoIcon {...iconProps} />
    case 'hydro':
      return <HydroIcon {...iconProps} />
    case 'pyro':
      return <PyroIcon {...iconProps} />
  }
}

export function StatIcon({
  key,
  iconProps = {},
}: {
  key: StatKey
  iconProps?: SvgIconProps
}) {
  switch (key) {
    case 'atk':
    case 'atk_':
      return <AtkIcon {...iconProps} />
    case 'critDMG_':
      return <CritDmgIcon {...iconProps} />
    case 'critRate_':
      return <CritRateIcon {...iconProps} />
    case 'def':
    case 'def_':
      return <DefIcon {...iconProps} />
    case 'eleMas':
      return <EleMasIcon {...iconProps} />
    case 'enerRech_':
      return <EnerRechIcon {...iconProps} />
    case 'heal_':
      return <HealingBonusIcon {...iconProps} />
    case 'hp':
    case 'hp_':
      return <HpIcon {...iconProps} />
    case 'physical_dmg_':
      return <PhysicalIcon {...iconProps} />
    case 'electro_dmg_':
      return <ElectroIcon {...iconProps} />
    case 'geo_dmg_':
      return <GeoIcon {...iconProps} />
    case 'pyro_dmg_':
      return <PyroIcon {...iconProps} />
    case 'hydro_dmg_':
      return <HydroIcon {...iconProps} />
    case 'cryo_dmg_':
      return <CryoIcon {...iconProps} />
    case 'anemo_dmg_':
      return <AnemoIcon {...iconProps} />
    case 'dendro_dmg_':
      return <DendroIcon {...iconProps} />
  }
}
