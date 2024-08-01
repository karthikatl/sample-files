import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleFolder, sortFilesByName, filterFiles, selectVisibleFiles, sortFilesByDate } from '../files/filesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen, faFilePdf, faFileWord, faFile } from '@fortawesome/free-regular-svg-icons';  // Use faFile for CSV
import { faArrowUp, faArrowDown ,faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { File } from '../types/datatypes';

const FileExplorer: React.FC = () => {
  const files = useAppSelector(selectVisibleFiles);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' }); 
  const [sortDateConfig, setSortDateConfig] = useState({ key: 'added', direction: 'ascending' });  


  const getIconForType = (file: File) => {
    switch (file.type) {
      case 'pdf':
        return faFilePdf;
      case 'doc':
        return faFileWord;
      case 'csv':
        return faFile;
      case 'folder':
        return file.isOpen ? faFolderOpen : faFolder;
      default:
        return faFileWord; 
    }
  };

  const handleToggle = (name: string) => {
    dispatch(toggleFolder(name));
  };
 
  const getToggleIcon = (file: File) => {
    if (file.type === 'folder') {
      return file.isOpen ? faMinusSquare : faPlusSquare;
    }
    return faMinusSquare;  // No icon for files
  };
 
  const handleSortByName = () => {
    const newDirection = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key: 'name', direction: newDirection });
    dispatch(sortFilesByName({ key: 'name', direction: newDirection }));
  };
  const handleSortByDate = () => {
    const newDirection = sortDateConfig.key === 'added' && sortDateConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortDateConfig({ key: 'added', direction: newDirection });
    dispatch(sortFilesByDate({ key: 'added', direction: newDirection }));
  };
  

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    dispatch(filterFiles(e.target.value));
  };

  return (
    <div className="p-4">
      
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter files by name"
        className="ml-4 p-2 border rounded"
      />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th></th>
            <th className="px-4 py-2 ">Type</th>
            <th className="px-4 py-2 text-left cursor-pointer" onClick={handleSortByName}>Name <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faArrowDown : faArrowUp} className="ml-2" /> </th>
            <th className="px-4 py-2 text-left cursor-pointer" onClick={handleSortByDate}>Date <FontAwesomeIcon icon={sortDateConfig.direction === 'ascending' ? faArrowDown : faArrowUp} className="ml-2" /></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <React.Fragment key={index}>
              <tr className={` ${file.type === 'folder' ? 'font-bold cursor-pointer' : 'text-gray-600'}`} onClick={() => file.type === 'folder' && handleToggle(file.name)}>
                <td> <FontAwesomeIcon icon={getToggleIcon(file)} /></td><td className="px-4 py-2">  <FontAwesomeIcon icon={getIconForType(file)} /></td>
                <td className="px-4 py-2 text-left" data-testid="file-name">{file.name}</td>
                <td className="px-4 py-2 text-left">{file.added}</td>
              </tr>
              {file.isOpen && file.files && file.files.map((subFile, subIndex) => (
                <tr key={subIndex} className={`pl-8 cursor-pointer ${file.type === 'folder' ? 'font-bold' : 'font-normal'}`}>
                  <td></td><td className="px-4 py-2"><FontAwesomeIcon icon={getIconForType(subFile)} /></td>
                  <td className="px-4 py-2 text-left">{subFile.name}</td>
                  <td className="px-4 py-2 text-left">{subFile.added}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileExplorer;
