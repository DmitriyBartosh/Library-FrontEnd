import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import * as button from '../../styles/base/button.module.scss'

function Worksnav({ pathname }) {
  const [visible, setVisible] = useState(false)

  const data = useStaticQuery(graphql`
  query {
    allDirectionsJson {
      edges {
        node {
          slug
          works {
            slug
          }
        }
      }
    }
  }
`)

  const pathData = data.allDirectionsJson.edges;

  useEffect(() => {
    pathData.forEach(element => {
      const { slug, works } = element.node;

      works.forEach(element => {
        const pathdirections = "/" + slug + "/" + element.slug + "/";

        if (pathdirections === pathname) {
          setVisible(true);
          return;
        } else setVisible(false);

      });
    });
  }, [pathname, pathData])


  return visible && <button className={button.nav}>
    <p>Текст</p>
  </button>

}

export default Worksnav