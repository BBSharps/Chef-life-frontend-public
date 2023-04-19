import axios from "axios";
import useSWR from "swr";

const fetcher = (url) =>
  axios.get(url).then((res) => {
    return res.data;
  });

export function getMenuItems(loadCondition) {
  const { data, error, isLoading } = useSWR(
    loadCondition ? "https://cl-api.onrender.com/api/menuItems" : null,
    fetcher
  );

  return { dataMenuItems: data, error, loadingMenuItems: isLoading };
}

export function getMenuIngredientsById(loadCondition, item_id) {
  const { data, error, isLoading } = useSWR(
    loadCondition
      ? `https://cl-api.onrender.com/api/menuItems/${item_id}/ingredients`
      : null,
    fetcher
  );

  return {
    dataMenuIngredientsById: data,
    error,
    loadingMenuIngredientsById: isLoading,
  };
}

export function getMenuIngredients(loadCondition) {
  const { data, error, isLoading } = useSWR(
    loadCondition ? `https://cl-api.onrender.com/api/menuIngredients` : null,
    fetcher
  );

  return {
    dataMenuIngredients: data,
    error,
    loadingMenuIngredients: isLoading,
  };
}

export function getSalesDates(loadCondition, item_date) {
  const { data, error, isLoading } = useSWR(
    loadCondition
      ? `https://cl-api.onrender.com/api/salesDates?item_date=${item_date}`
      : null,
    fetcher
  );

  return { dataSalesDates: data, error, loadingSalesDates: isLoading };
}

export function postMenuItems(
  item_name,
  item_type,
  item_price,
  item_description
) {
  return axios
    .post(`https://cl-api.onrender.com/api/menuItems`, {
      item_name: item_name,
      item_type: item_type,
      item_price: item_price,
      item_description: item_description,
    })
    .then((res) => {
      return res.data;
    });
}

export function postMenuIngredients(
  ingredient_name,
  ingredient_price,
  ingredient_quantity
) {
  return axios
    .post(`https://cl-api.onrender.com/api/menuIngredients`, {
      ingredient_name: ingredient_name,
      ingredient_price: ingredient_price,
      ingredient_quantity: ingredient_quantity,
    })
    .then((res) => {
      return res.data;
    });
}

export function patchMenuItems(
  item_id,
  item_name,
  item_price,
  item_description
) {
  const sendData = { p: "Xqo1!1gTT05" };
  item_name ? (sendData.item_name = item_name) : null;
  item_price ? (sendData.item_price = item_price) : null;
  item_description ? (sendData.item_description = item_description) : null;
  return axios
    .patch(`https://cl-api.onrender.com/api/menuItems/${item_id}`, sendData)
    .then((res) => {
      return res.data;
    });
}

export function patchMenuIngredients(
  ingredient_id,
  ingredient_price,
  ingredient_quantity
) {
  const sendData = { p: "Xqo1!1gTT05" };
  ingredient_quantity
    ? (sendData.ingredient_quantity = ingredient_quantity)
    : null;
  ingredient_price ? (sendData.ingredient_price = ingredient_price) : null;
  ingredient_id ? (sendData.ingredient_id = ingredient_id) : null;
  return axios
    .patch(`https://cl-api.onrender.com/api/menuIngredients`, sendData)
    .then((res) => {
      return res.data;
    });
}

export function postItemsIngredients(item_id, ingredient_id) {
  return axios
    .post(`https://cl-api.onrender.com/api/itemsIngredients`, {
      item_id: item_id,
      ingredient_id: ingredient_id,
    })
    .then((res) => {
      return res.data;
    });
}

export function postSalesDates(
  item_date,
  item_name,
  item_quantity,
  item_wastage
) {
  return axios
    .post(`https://cl-api.onrender.com/api/salesDates`, {
      item_date: item_date,
      item_name: item_name,
      item_quantity: item_quantity,
      item_wastage: item_wastage,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
