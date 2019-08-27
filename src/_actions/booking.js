import axios from "axios";
import { BASE_URL } from "../api/explore";

export const getBooking = (houseId, token) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return {
    type: "GET_BOOKING",
    payload: axios.get(`${BASE_URL}/api/v1/booking/${houseId}`, config)
  };
};

export const changeBookingDate = date => {
  return {
    type: "CHANGE_BOOKING_DATE",
    payload: date
  };
};

export const changeBookingDuration = duration => {
  return {
    type: "CHANGE_BOOKING_DURATION",
    payload: duration
  };
};
