import axiosClient from "../services/axiosClient";

export const addWorkToReview = (data) => {
  const { expert_id, works } = data;

  axiosClient.put("review/add",
    {
      expert_id: expert_id,
      works: works
    }
  ).then(({ data }) => {
    console.log(data)
  })
    .catch((err) => console.log(err));
}