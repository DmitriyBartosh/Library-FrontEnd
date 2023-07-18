import React, { useState } from 'react'
import { useLocalStorage } from 'react-use';
import { useStateContext } from '../../context/ContextProvider';

import Button from './button';
import Subscribe from './subscribe';
import Allworks from './portfoliomode';
import Linkwork from './linkwork';
import Toggle from './toggle';

import * as styles from './direction.module.scss';
import * as global from '../../styles/base/global.module.scss';


function Direction({ data, copiedLink }) {
  const { links } = useStateContext();

  const [portfolioMode, setPortfolioMode] = useLocalStorage(data.slug + '_visual_mode', false);

  const [selected, setSelected] = useState(data.works[0]);

  const { title, works, slug } = data;

  return (
    <div className={styles.container}>
      <div className={global.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h3>{title}</h3>
          </div>
          <Subscribe status={true} />
        </div>

        <Toggle portfolioMode={portfolioMode} setPortfolioMode={setPortfolioMode} />

        {portfolioMode ?
          <Allworks works={data.works} copiedLink={copiedLink} />
          :
          <div className={styles.progress}>
            <div className={styles.works}>

              <div className={styles.list}>
                {works.map((item, index) => {
                  const isActive = item.title === selected.title;
                  const link = "/" + slug + "/" + item.slug;

                  return <Button isActive={isActive} item={item} setSelected={setSelected} link={link} key={index} />
                })}
              </div>
              <div className={styles.advenced}>
                <h4 className={styles.title}>{selected.title}</h4>
                <div className={styles.description}>
                  <p>{selected.description}</p>
                </div>

                <div className={styles.theme}>
                  {selected?.order.section.map((item, index) => {
                    return <p key={index}>#{item}</p>
                  })}
                </div>
                {links && links[selected.slug]?.length > 0 &&
                  <div className={styles.complete}>
                    <p className={styles.title}>Прикрепленные работы:</p>
                    {links && links[selected.slug]?.map((item, index) => {
                      return <Linkwork data={item} index={index} />
                    })}
                  </div>
                }
              </div>
            </div>
          </div>
        }



      </div>
    </div>
  )
}

export default Direction;