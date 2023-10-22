// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { allStats } from '@genshin-builder/stats'
import { combinedAssets } from '@genshin-builder/assets'
import { ArtifactSetKey, ArtifactSlotKey, LocationCharacterKey, WeaponKey, weaponKeys } from '@genshin-builder/consts';
import ArtifactCard from './Components/Cards/Artifact/ArtifactCard/ArtifactCard';
import { IArtifact, ICachedArtifact, ICachedCharacter, ICachedSubStat, ICachedWeapon, ICharacter, IWeapon } from '@genshin-builder/datamodel';

const amber: ICharacter = {
  key: 'Amber',
  level: 10,
  constellation: 0,
  ascension: 0,
  talent: {
    auto: 0,
    skill: 0,
    burst: 0
  },
  infusionAura: 'pyro'
}

const bow: IWeapon = {
  key: 'AmosBow',
  level: 11,
  rarity: 5,
  ascension: 0,
  refinement: 1,
  lock: false,
  location: ''
}

const bowCache: ICachedWeapon = bow as ICachedWeapon
bowCache.id = 'bow_1'

const plume: IArtifact = {
  setKey: 'Adventurer',
  slotKey: 'plume',
  level: 0,
  rarity: 4,
  mainStat: 'atk',
  subStats: [],
  lock: false,
  location: ''
}
const plumeCache: ICachedArtifact = plume as ICachedArtifact
plumeCache.id = 'plume_1'
plumeCache.subStats = [{key: 'critDMG_', value: 0.5} as ICachedSubStat]

const amberCache: ICachedCharacter = amber as ICachedCharacter
amberCache.equippedWeapon = bowCache.id
amberCache.equippedArtifacts = {plume: '', flower: '', goblet: '', circlet: '', sands: ''}
amberCache.equippedArtifacts.plume = plumeCache.id

interface ICharBuild {
  character: ICachedCharacter
  name: string,
  author: string
}

const amberBuild = {
  character: amberCache,
  name: 'Build 001',
  author: 'system'
} as ICharBuild


interface ITeamBuild {
  team: {
    1: ICachedCharacter | undefined,
    2: ICachedCharacter | undefined,
    3: ICachedCharacter | undefined,
    4: ICachedCharacter | undefined,
  }
}


function handleClick() {
  console.log(amberBuild)
  // console.log(allStats.weapon.data[bow.key]);
    
}

export function App() {
  const relics = allStats.art.data
  const weapons = allStats.weapon.data

  return (
    <div>
      <button type="button" onClick={handleClick}>Click me!</button>
      
      {/* {Object.entries(relics).map(([k, v]) => <><ArtifactCard artifactKey={k as ArtifactSetKey} slotKey='circlet' mainStatkey={'hp'} /> <br /></>)} */}
      <ArtifactCard artifactKey={'EmblemOfSeveredFate'} slotKey={'plume'} mainStatkey={'heal_'}></ArtifactCard>
    </div>
  );
}

export default App;
