import { useOSStore } from '../../store/store';
import { DraggableIcon } from './FileSystem/DraggableIcon';
import { Preview } from '../apps/Preview';
import { Safari } from '../apps/Safari';
import { FileExplorer } from '../apps/FileExplorer';

export const DesktopIcons = () => {
    const { files, openWindow } = useOSStore();

    const handleIconClick = (file: { id: string, name: string, type: 'file' | 'folder' | 'app' }) => {
        if (file.name === 'Resume.pdf') {
            openWindow('preview', 'Resume - Preview', <Preview />);
        } else if (file.name === 'Namude_Yatra.deck') {
            openWindow('safari', 'Namude Yatra - GitHub', <Safari initialUrl="https://github.com/ADITHYASNAIR2021/Namude-Yatra" />);
        } else if (file.type === 'folder') {
            openWindow(file.id, file.name, <FileExplorer id={file.id} title={file.name} />);
        }
    };

    return (
        <div className="absolute inset-0 z-0 pointer-events-none [&>*]:pointer-events-auto">
            {files
                .filter(f => f.location === 'desktop')
                .map(file => (
                    <DraggableIcon
                        key={file.id}
                        id={file.id}
                        name={file.name}
                        type={file.type}
                        position={file.position}
                        onClick={() => handleIconClick(file)}
                    />
                ))
            }
        </div>
    );
};
