
import { ADD_FOLDER, ADD_FILE, UPDATE_FILE, DELETE_FILE } from '../actions/index';

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

    case ADD_FILE:
      state.automate.map(folder => {
        if (folder.folderName === action.payload.folderName) {
          folder.files.unshift(action.payload.file);
        }
      });
      window.localStorage.setItem('automate', JSON.stringify(state));
      state.automate = JSON.parse(window.localStorage.getItem('automate'));
      return state.automate;
    case UPDATE_FILE:
        state.automate.map(folder => {
          if (folder.folderName === action.payload.folderName) {
            folder.files.map(file => {
              if (file._id === action.payload.updatedfile._id) {
                file.fileBody = action.payload.updatedfile.fileBody;
                file.updatedAt = action.payload.updatedfile.updatedAt;
              }
            });
          }
        });
        window.localStorage.setItem('automate', JSON.stringify(state));
        state.automate = JSON.parse(window.localStorage.getItem('automate'));
        return state.automate;
    case DELETE_FILE:
        state.automate.map(folder => {
          if (folder.folderName === action.payload.folderName) {
            folder.files = folder.files.filter(file => file._id !== action.payload.id)
          }
        });
        window.localStorage.setItem('automate', JSON.stringify(state));
        state.automate = JSON.parse(window.localStorage.getItem('automate'));
        return state.automate;
  }
  return state.automate;
};
