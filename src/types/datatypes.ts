
export type File = {
    type: string;
    name: string;
    added?: string;
    files?: File[];
    isOpen?: boolean;
  }
  export type SortPayload = {
      key: string;
      direction: 'ascending' | 'descending';
    }
  export type FilesState = {
    files: File[];      
    visibleFiles: File[]; 
  }
  

  