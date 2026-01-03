import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FileText, Folder, Presentation } from 'lucide-react';
import { useContextMenuStore } from '../../../store/contextMenuStore';
import type { ContextMenuItem } from '../../../store/contextMenuStore';
import { useState, useRef, useEffect } from 'react';
import { useOSStore } from '../../../store/store';

interface DraggableIconProps {
    id: string;
    name: string;
    type: 'file' | 'folder' | 'app';
    position?: { x: number; y: number };
    onClick?: () => void;
    menuItems?: ContextMenuItem[];
}

export const DraggableIcon = ({ id, name, type, position, onClick, menuItems = [] }: DraggableIconProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        data: { name, type, position }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        left: position?.x || 0,
        top: position?.y || 0,
        position: (position ? 'absolute' : 'relative') as 'absolute' | 'relative',
        zIndex: isDragging ? 100 : 1,
        touchAction: 'none',
    };

    const { openMenu } = useContextMenuStore();
    const { renameFile, moveToTrash } = useOSStore();
    const [isRenaming, setIsRenaming] = useState(false);
    const [tempName, setTempName] = useState(name);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isRenaming && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isRenaming]);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const defaultItems = [
            { id: 'open', label: 'Open', action: onClick },
            {
                id: 'rename',
                label: 'Rename',
                action: () => {
                    setIsRenaming(true);
                    setTempName(name);
                }
            },
            { id: 'get-info', label: 'Get Info', disabled: true },
            {
                id: 'trash',
                label: 'Move to Trash',
                action: () => moveToTrash(id)
            }
        ];

        openMenu(
            { x: e.clientX, y: e.clientY },
            type === 'folder' ? 'folder' : 'file',
            [...menuItems, ...defaultItems],
            id
        );
    };

    const handleRenameSubmit = () => {
        if (tempName.trim()) {
            renameFile(id, tempName.trim());
        } else {
            setTempName(name); // Revert if empty
        }
        setIsRenaming(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleRenameSubmit();
        } else if (e.key === 'Escape') {
            setIsRenaming(false);
            setTempName(name);
        }
    };

    const Icon = name.endsWith('.pdf') ? FileText : name.endsWith('.deck') ? Presentation : Folder;
    const iconColor = name.endsWith('.pdf') ? 'text-blue-400' : name.endsWith('.deck') ? 'text-orange-400' : 'text-blue-400';

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onContextMenu={handleContextMenu}
            onDoubleClick={onClick}
            className={`flex flex-col items-center gap-1 w-24 cursor-pointer group ${isDragging ? 'opacity-50' : ''}`}
        >
            <div className={`w-16 h-20 bg-gray-100/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors shadow-sm ${type === 'folder' ? 'bg-transparent border-0' : ''}`}>
                <Icon size={type === 'folder' ? 64 : 40} className={`drop-shadow-md ${iconColor}`} strokeWidth={1.5} fill={type === 'folder' ? '#60A5FA' : 'none'} />
            </div>
            {isRenaming ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={handleRenameSubmit}
                    onKeyDown={handleKeyDown}
                    className="w-20 text-xs text-center bg-white text-black border border-blue-500 rounded px-1 outline-none"
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()} // Prevent drag start when clicking input
                    aria-label="Rename file"
                />
            ) : (
                <span className="text-white text-xs font-medium drop-shadow text-center bg-black/20 rounded px-1 group-hover:bg-blue-600 transition-colors line-clamp-2 leading-tight break-all max-w-full">
                    {name}
                </span>
            )}
        </div>
    );
};
