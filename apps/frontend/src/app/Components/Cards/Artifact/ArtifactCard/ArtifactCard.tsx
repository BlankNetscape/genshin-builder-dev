import { ArtifactSetKey, ArtifactSlotKey, MainStatKey } from '@genshin-builder/consts'
import styles from './ArtifactCard.module.css'
import React from 'react'
import { artifactAsset } from '@genshin-builder/assets'
import Collapse from '@mui/material/Collapse'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export interface ArtifactCardProps {
  artifactId?: string
  artifactKey: ArtifactSetKey
  slotKey: ArtifactSlotKey
  mainStatkey: MainStatKey
}

// FISH
export function ArtifactCard({artifactId, artifactKey, slotKey, mainStatkey}: ArtifactCardProps) {
  const [checked, setChecked] = React.useState(false)

  const handleOpen = () => setChecked(true)
  const handleClose = () => setChecked(false)

  function HelpButton() {
    return (
      <svg
        className={styles['help-icon']}
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        style={{ opacity: checked ? '1' : '0' }}
      >
        <path
          d="M10.2352 16C10.577 16 10.8658 15.8792 11.1017 15.6375C11.3377 15.3958 11.4557 15.1 11.4557 14.75C11.4557 14.4 11.3377 14.1042 11.1017 13.8625C10.8658 13.6208 10.577 13.5 10.2352 13.5C9.89353 13.5 9.6047 13.6208 9.36875 13.8625C9.13281 14.1042 9.01483 14.4 9.01483 14.75C9.01483 15.1 9.13281 15.3958 9.36875 15.6375C9.6047 15.8792 9.89353 16 10.2352 16ZM9.35655 12.15H11.1628C11.1628 11.6 11.2238 11.1667 11.3458 10.85C11.4679 10.5333 11.8137 10.1 12.3832 9.55C12.8063 9.11667 13.1398 8.70417 13.3839 8.3125C13.628 7.92083 13.75 7.45 13.75 6.9C13.75 5.96667 13.4165 5.25 12.7493 4.75C12.0821 4.25 11.2929 4 10.3817 4C9.45418 4 8.7016 4.25 8.12393 4.75C7.54627 5.25 7.14353 5.85 6.91572 6.55L8.52667 7.2C8.60803 6.9 8.79109 6.575 9.07586 6.225C9.36062 5.875 9.7959 5.7 10.3817 5.7C10.9024 5.7 11.2929 5.84583 11.5533 6.1375C11.8137 6.42917 11.9438 6.75 11.9438 7.1C11.9438 7.43333 11.8462 7.74583 11.6509 8.0375C11.4557 8.32917 11.2116 8.6 10.9187 8.85C10.2027 9.5 9.76336 9.99167 9.60063 10.325C9.43791 10.6583 9.35655 11.2667 9.35655 12.15ZM10.2841 20C8.93347 20 7.66424 19.7375 6.47637 19.2125C5.2885 18.6875 4.25522 17.975 3.37652 17.075C2.49782 16.175 1.80219 15.1167 1.28961 13.9C0.777039 12.6833 0.520752 11.3833 0.520752 10C0.520752 8.61667 0.777039 7.31667 1.28961 6.1C1.80219 4.88333 2.49782 3.825 3.37652 2.925C4.25522 2.025 5.2885 1.3125 6.47637 0.7875C7.66424 0.2625 8.93347 0 10.2841 0C11.6347 0 12.9039 0.2625 14.0918 0.7875C15.2796 1.3125 16.3129 2.025 17.1916 2.925C18.0703 3.825 18.7659 4.88333 19.2785 6.1C19.7911 7.31667 20.0474 8.61667 20.0474 10C20.0474 11.3833 19.7911 12.6833 19.2785 13.9C18.7659 15.1167 18.0703 16.175 17.1916 17.075C16.3129 17.975 15.2796 18.6875 14.0918 19.2125C12.9039 19.7375 11.6347 20 10.2841 20Z"
          fill="white"
        />
      </svg>
    )
  }

  function MainContent() { 
    return (
      <div className={styles['main-content']}>
        <div className={styles['top-wrapper']}>
          <div className={styles['header-label']}>
            <img
              src="https://github.com/BlankNetscape/temp-assets/blob/main/DefIcon.png?raw=true"
              alt="stat_icon"
              className={styles['header-icon']}
            />
            <p>{mainStatkey}</p>
          </div>
          <p className={styles['header-value']}>100.0%</p>
        </div>
        <div className={styles['bottom-wrapper']}>
          <div className={styles['substats-wrapper']}>
            <img
              src="https://github.com/BlankNetscape/temp-assets/blob/main/HP_White.png?raw=true"
              alt="stat_icon"
              className={styles['stat-icon']}
            />
            <img
              src="https://github.com/BlankNetscape/temp-assets/blob/main/ATK_White.png?raw=true"
              alt="stat_icon"
              className={styles['stat-icon']}
            />
            <img
              src="https://github.com/BlankNetscape/temp-assets/blob/main/ATK_White.png?raw=true"
              alt="stat_icon"
              className={styles['stat-icon']}
            />
            <img
              src="https://github.com/BlankNetscape/temp-assets/blob/main/DEF_White.png?raw=true"
              alt="stat_icon"
              className={styles['stat-icon']}
            />
          </div>
          <div className={styles['lvl-wrapper']}>+16</div>
        </div>
        <img
          className={styles['relic-item']}
          src={artifactAsset(artifactKey, slotKey)}
          alt=""
        />
        <img className={styles['relic-item-blur']} src={'relicImage'} alt="" />
      </div>
    )
  }

  function StatItem({ statLabel, statValue, statIcon }) {
    return (
      <div className={styles['stat']}>
        <div className={styles['stat-label']}>
          <img src={statIcon} alt="stat_icon" className="stat-icon" />
          <p>{statLabel}</p>
        </div>
        <p className={styles['stat-value']}>{statValue}</p>
      </div>
    )
  }

  function SubstatsList() {
    return (
      <div className={styles['stats-list']}>
        <StatItem
          statLabel={'Lorem'}
          statValue={'50.0%'}
          statIcon={
            'https://github.com/BlankNetscape/temp-assets/blob/main/ATK.png?raw=true'
          }
        />
        <StatItem
          statLabel={'Ipsum'}
          statValue={'40.0%'}
          statIcon={
            'https://github.com/BlankNetscape/temp-assets/blob/main/DEF.png?raw=true'
          }
        />
        <StatItem
          statLabel={'Dolor'}
          statValue={'30.0%'}
          statIcon={
            'https://github.com/BlankNetscape/temp-assets/blob/main/ATK.png?raw=true'
          }
        />
        <StatItem
          statLabel={'Enum'}
          statValue={'20.0%'}
          statIcon={
            'https://github.com/BlankNetscape/temp-assets/blob/main/HP.png?raw=true'
          }
        />
      </div>
    )
  }

  return (
    <div
      className={styles['content-container']}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <div className={styles['content-wrapper']}>
        <MainContent />
        <Collapse in={checked}>
          <SubstatsList />
        </Collapse>
        <HelpButton />
      </div>
    </div>
  )
}

export default ArtifactCard
