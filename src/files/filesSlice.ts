// src/features/files/filesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { File, SortPayload, FilesState } from '../types/datatypes';
import {fileData} from '../data/fileData';


export const initialState: FilesState = {
  files: fileData,
  visibleFiles: []
};

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    ...initialState,
    visibleFiles: initialState.files, // Set visibleFiles to the full list initially
  },
  reducers: {
    toggleFolder: (state, action: PayloadAction<string>) => {
      const folder = state.visibleFiles.find(file => file.name === action.payload && file.type === 'folder');
      if (folder) {
        folder.isOpen = !folder.isOpen;
      }
    },
    sortFilesByName: (state, action: PayloadAction<SortPayload>) => {
        state.visibleFiles.sort((a, b) => {
          const modifier = action.payload.direction === 'ascending' ? 1 : -1;
          return a.name.localeCompare(b.name) * modifier;
        });
      },
      sortFilesByDate: (state, action: PayloadAction<SortPayload>) => {
        state.visibleFiles.sort((a, b) => {
          const dateA = a.added || '';
          const dateB = b.added || '';

          const modifier = action.payload.direction === 'ascending' ? 1 : -1;
          return dateA.localeCompare(dateB) * modifier;
        });
    },
    filterFiles: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.visibleFiles = [...state.files];
      } else {
        state.visibleFiles = state.files.filter(file =>
          file.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    }
  }, 
});

export const { toggleFolder, sortFilesByName, filterFiles, sortFilesByDate } = filesSlice.actions;

export const selectVisibleFiles = (state: RootState) => state.files.visibleFiles;

export default filesSlice.reducer;
