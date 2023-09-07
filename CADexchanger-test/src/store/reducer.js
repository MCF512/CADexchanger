import { ACTION_TYPES } from "./types"

const initialState = {
  coordinates: [],
  indices: [],
  radius: 1,
  sections: 3,
  height: 1,
  wireframe: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_COORDINATES: {
      return { ...state, ...action.payload }
    }
    case ACTION_TYPES.CHANGE_WIREFRAME_VISIBILYTY: {
      return { ...state, wireframe: !state.wireframe }
    }
    default:
      return state
  }
}