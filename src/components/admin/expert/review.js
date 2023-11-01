import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllWorksOnReviewForAdmin } from "../../../functions/expert";
import { useStateContext } from "../../../context/ContextProvider";
import * as styles from "./review.module.scss";
import Work from "./work";

function Review() {
  const { user } = useStateContext();

  const directionQuery = useQuery({
    queryKey: ["getAllWorksOnReviewForAdmin"],
    queryFn: getAllWorksOnReviewForAdmin,
    enabled: !!user,
  });

  return (
    directionQuery.data &&
    directionQuery.data.length > 0 && (
      <div className={styles.container}>
        <div className={global.container}>
          <h4>Работы на рецензий</h4>
          <div className={styles.works}>
            {directionQuery.data.map((item, index) => {
              return <Work data={item} key={`workonreview_${index}`} />;
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default Review;
