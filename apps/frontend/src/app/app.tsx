// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { allStat } from '@genshin-builder/stats'
import { combinedAssets } from '@genshin-builder/assets'

function handleClick() {
  // console.log(allStat.weapon.data)
  console.log(allStat.char.data['Beidou']);
    
}

export function App() {
  const weapons = allStat.weapon.data
  return (
    <div>
      <button type="button" onClick={handleClick}>Click me!</button>
      <img src={combinedAssets.chars.Beidou.icon} alt="" />
      {JSON.stringify(allStat.char.data['Beidou'])}
      {Object.entries(weapons).map(([k, v]) => <p>  <br/> {k} {v.rarity}</p>)}
    </div>
  );
}

export default App;
