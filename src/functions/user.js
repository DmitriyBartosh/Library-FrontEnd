import axiosClient from "../services/axiosClient";

export const getUser = async () => {
  try {
    const { data } = await axiosClient
      .get("user");
    return data;
  } catch (err) {
    return err;
  }
};

export const getDirections = async () => {
  try {
    const { data } = await axiosClient
      .get("direction/status");
    return data;
  } catch (err) {
    return err;
  }
};

export const getLinksDesign = async () => {
  try {
    const { data } = await axiosClient
      .get("design/links");
    return data;
  } catch (err) {
    return err;
  }
}

export const addLinkDesign = (id, name, link, theme, setIsLoading, closeEdit, updateLinkDesign) => {
  setIsLoading(true);
  axiosClient.put("design/addlink",
    {
      id: id,
      name: name,
      link: link,
      theme: theme
    }
  ).then(({ data }) => {
    closeEdit();
    setIsLoading(false);
    updateLinkDesign(data)
  })
    .catch((err) => console.log(err));
}

export const editLinkDesign = (index, id, name, link, theme, updateLinkDesign, setEdited, setIsLoading) => {
  setIsLoading(true);
  axiosClient.patch("design/editlink", {
    index: index,
    id: id,
    name: name,
    link: link,
    theme: theme
  }).then(({ data }) => {
    setIsLoading(false);
    setEdited(false);
    updateLinkDesign(data)
  })
    .catch((err) => console.log(err));
}

export const deleteLinkDesign = (index, theme, updateLinkDesign, setIsLoading) => {
  setIsLoading(true);
  axiosClient.patch("design/deletelink", {
    index: index,
    theme: theme
  }).then(({ data }) => {
    console.log(data);
    setIsLoading(false);
    updateLinkDesign(data)
  })
    .catch((err) => console.log(err));
}