import axiosClient from "../services/axiosClient";

export const getAllUserLinks = async () => {
  try {
    const { data } = await axiosClient
      .get("admin/design/works");
    return data;
  } catch (err) {
    return err;
  }
};

export const getAdminSettings = async () => {
  try {
    const { data } = await axiosClient
      .get("admin/design/settings");
    return data;
  } catch (err) {
    return err;
  }
};

export const editSettingsAdmin = ({ user, price }) => {
  const { name, status, timetowork } = user;
  const { logo, polygraphy, poster, socialmedia } = price;

  console.log(user, price)


  axiosClient.put("admin/design/editsettings", {
    name: name,
    status: status,
    timetowork: timetowork,
    logo: logo,
    polygraphy: polygraphy,
    socialmedia: socialmedia,
    poster: poster
  })
    .then(({ data }) => data.success)
    .catch((err) => console.log(err))
}