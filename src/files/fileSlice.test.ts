import filesSlice, { toggleFolder, sortFilesByName, filterFiles, sortFilesByDate } from './filesSlice';
import { File, SortPayload, FilesState } from '../types/datatypes';
import { fileData } from '../data/fileData';

describe('filesSlice', () => {
  let initialState: FilesState;

  beforeEach(() => {
    // Set up a consistent initial state for each test
    initialState = {
      files: fileData,
      visibleFiles: [...fileData]  // Ensuring visibleFiles is populated
    };
  });

  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(filesSlice(undefined, { type: 'unknown' })).toEqual({
        files: fileData,
        visibleFiles: fileData
      });
    });

    it('should handle toggleFolder', () => {
      const actual = filesSlice(initialState, toggleFolder('Expenses'));
      const expectedFolder = actual.visibleFiles.find((file: File) => file.name === 'Expenses');
      expect(expectedFolder?.isOpen).toBeTruthy();
    });

    it('should handle sortFilesByName ascending', () => {
      const action = { type: sortFilesByName.type, payload: { key: 'name', direction: 'ascending' }};
      const state = filesSlice(initialState, action);
      expect(state.visibleFiles).toEqual([...initialState.files].sort((a, b) => a.name.localeCompare(b.name)));
    });

    it('should handle sortFilesByDate descending', () => {
      const action = { type: sortFilesByDate.type, payload: { key: 'added', direction: 'descending' }};
      const state = filesSlice(initialState, action);
      expect(state.visibleFiles).toEqual([...initialState.files].sort((a, b) => (b.added || '').localeCompare(a.added || '')));
    });

    it('should handle filterFiles', () => {
      const actual = filesSlice(initialState, filterFiles('Employee'));
      expect(actual.visibleFiles.length).toBeGreaterThan(0);
      expect(actual.visibleFiles.every((file: File) => file.name.toLowerCase().includes('employee'))).toBe(true);
    });
  });
});
