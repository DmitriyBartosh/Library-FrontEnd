import React, { useState } from "react";
import Status from "./status";

import * as styles from "./profile.module.scss";

function Profile({ data, slug }) {
  // const [price, setPrice] = useState({});
  const [expert, setExpert] = useState({
    status: data.status,
    backtowork: data.backtowork,
  });

  // useEffect(() => {
  //   const priceNumber = data.price;

  //   Object.keys(priceNumber).forEach((key) => {
  //     priceNumber[key] = parseInt(priceNumber[key]);
  //   });

  //   setPrice(priceNumber);
  // }, [data]);

  return (
    <section className={styles.container}>
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
    </section>
  );
}

export default Profile;
