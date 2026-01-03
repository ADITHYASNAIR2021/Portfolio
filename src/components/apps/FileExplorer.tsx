import { useOSStore } from '../../store/store';
import { DraggableIcon } from '../os/FileSystem/DraggableIcon';
import { Trash2, RotateCcw } from 'lucide-react';

interface FileExplorerProps {
    id: string; // The folder ID or 'trash'
    title: string;
}

export const FileExplorer = ({ id, title }: FileExplorerProps) => {
    const { files, emptyTrash, restoreFile, openWindow } = useOSStore();
    const isTrash = id === 'trash';

    const currentFiles = files.filter(f => f.location === id);

    const handleEmptyTrash = () => {
        emptyTrash();
    };

    const handleRestore = (fileId: string) => {
        restoreFile(fileId);
    };

    const handleIconClick = (file: { id: string, name: string, type: 'file' | 'folder' | 'app' }) => {
        if (file.type === 'folder') {
            openWindow(file.id, file.name, <FileExplorer id={file.id} title={file.name} />);
        }
    };

    return (
        <div className="w-full h-full bg-[#f5f5f7] flex flex-col font-sans text-gray-900">
            {/* Toolbar */}
            <div className="h-12 bg-[#e8e8ed] border-b border-gray-300 flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    {/* Back button logic could be added here if we were tracking history, for now simple title */}
                    <span className="font-semibold text-gray-700">{title}</span>
                </div>
                {isTrash && (
                    <button
                        onClick={handleEmptyTrash}
                        className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                    >
                        <Trash2 size={14} />
                        Empty Trash
                    </button>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4">
                {currentFiles.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <span className="text-4xl mb-2">
                            {isTrash ? <Trash2 size={48} strokeWidth={1} /> : '📂'}
                        </span>
                        <p>{isTrash ? 'Trash is Empty' : 'Folder is Empty'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 auto-rows-min">
                        {currentFiles.map(file => (
                            <div key={file.id} className="relative h-28">
                                <DraggableIcon
                                    {...file}
                                    position={{ x: 0, y: 0 }} // Reset position for grid view relative
                                    onClick={() => handleIconClick(file)}
                                    menuItems={isTrash ? [
                                        {
                                            id: 'restore',
                                            label: 'Put Back',
                                            icon: <RotateCcw size={14} />,
                                            action: () => handleRestore(file.id)
                                        }
                                    ] : []}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#e8e8ed] border-t border-gray-300 flex items-center px-3 text-xs text-gray-500 shrink-0">
                {currentFiles.length} item{currentFiles.length !== 1 && 's'}
            </div>
        </div>
    );
};
