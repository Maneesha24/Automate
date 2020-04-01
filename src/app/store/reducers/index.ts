
import { ADD_FOLDER } from '../actions/index';

let initialState = [];

const defaultState = {
  automate : [{
    folderName: 'Default',
    files: []
  }]
};

if (window.localStorage.getItem('automate')) {
  initialState = JSON.parse(window.localStorage.getItem('automate'));
} else {
  window.localStorage.setItem('automate', JSON.stringify(defaultState));
  initialState = JSON.parse(window.localStorage.getItem('automate'));
}

export const automateState = {
  automate: initialState
};

export const automateReducer = (state = automateState, action) => {
  switch (action.type) {
    case ADD_FOLDER:
      const newFolder = {
        folderName: action.payload.folderName,
        files: []
      };
      state.automate.unshift(newFolder);
      window.localStorage.setItem('automate', JSON.stringify(state));
      state.automate = JSON.parse(window.localStorage.getItem('automate'));
      return state.automate;
  }
  return state.automate;
};
