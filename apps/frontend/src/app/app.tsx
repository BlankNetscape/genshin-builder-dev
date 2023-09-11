// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { allStat } from '@genshin-builder/stats'
import { combinedAssets } from '@genshin-builder/assets'
import { ArtifactSetKey, ArtifactSlotKey, WeaponKey } from '@genshin-builder/consts';
import ArtifactCard from './Components/Cards/Artifact/ArtifactCard/ArtifactCard';



function handleClick() {
  // console.log(allStat.weapon.data)
  console.log(allStat.char.data['Beidou']);
    
}

export function App() {
  const relics = allStat.art.data
  const weapons = allStat.weapon.data

  return (
    <div>
      <button type="button" onClick={handleClick}>Click me!</button>
      
      {/* {Object.entries(weapons).map(([k, v]) => <img src={combinedAssets.weapons[k as WeaponKey].icon} alt={k} />)} */}
      {Object.entries(relics).map(([k, v]) => <><ArtifactCard artifactKey={k as ArtifactSetKey} slotKey='circlet' mainStatkey={'hp'} /> <br /></>)}
    </div>
  );
}

export default App;
