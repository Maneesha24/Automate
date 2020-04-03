  /**
   * Function to return files of active folder
   */
export const getFiles = (automate, activeFolder) => {
  return automate.map(folder => {
    if (folder.folderName === activeFolder) {
      return folder.files;
    }
  });
};
