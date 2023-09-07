import { ACTION_TYPES } from "../store"

const setCoordinates = (payload) => {
  return {
    type: ACTION_TYPES.GET_COORDINATES,
    payload
  }
}

export const getCoordinates = (infoObj) => {

  return async (dispatch) => {
    const res = await fetch('http://localhost:3010/math', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoObj)
    })
    const data = await res.json()
    dispatch(setCoordinates(data))
    console.log(data)
  }
}