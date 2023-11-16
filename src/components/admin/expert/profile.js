import React, { useState, useEffect } from "react";
import * as styles from "./profile.module.scss";
import Status from "./status";

function Profile({ data, slug }) {
  const [price, setPrice] = useState({});
  const [expert, setExpert] = useState({
    status: data.status,
    backtowork: data.backtowork,
  });

  useEffect(() => {
    const priceNumber = data.price;

    Object.keys(priceNumber).forEach((key) => {
      priceNumber[key] = parseInt(priceNumber[key]);
    });

    setPrice(priceNumber);
  }, [data]);

  return (
    <div className={styles.container}>
      <h4>Эксперт | {slug.title}</h4>

      <div className={styles.expert}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img
              src={`${process.env.GATSBY_API_BASE_URL}${data.avatar}`}
              alt="avatar"
            />
          </div>
          <div className={styles.info}>
            <p className={styles.name}>{data.name}</p>
            <p className={styles.about}>{data.about}</p>
          </div>
        </div>

        <div className={styles.settings}>
          <Status olddata={data} setExpert={setExpert} expert={expert} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
