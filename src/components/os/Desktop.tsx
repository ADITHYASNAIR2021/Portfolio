import { useMobile } from '../../hooks/useMobile';
import './Desktop.css';
import { useOSStore } from '../../store/store';
import { ControlCenter } from '../widgets/ControlCenter';
import { DesktopIcons } from './DesktopIcons';
import { Spotlight } from './Spotlight';
import { AnimatePresence } from 'framer-motion';
import * as Widgets from '../widgets/Widgets';
import { ContextMenu } from './ContextMenu';
import { useContextMenuStore } from '../../store/contextMenuStore';
import { FolderPlus, Image as ImageIcon, LayoutGrid, Clipboard, LayoutTemplate } from 'lucide-react';
import { DndContext, useDroppable, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { MobileHome } from '../mobile/iOSHome';
import { NotificationCenter } from './NotificationCenter';
import { LockScreen } from './LockScreen';
import { useSound } from '../../hooks/useSound';

import { useDraggable } from '@dnd-kit/core';
import type { WidgetItem } from '../../store/store';

// Draggable Widget Wrapper
const DraggableWidget = ({ widget }: { widget: WidgetItem }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: widget.id,
        data: { type: 'widget', position: widget.position }
    });

    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        position: 'absolute',
        top: widget.position.y,
        left: widget.position.x,
        zIndex: isDragging ? 50 : 0,
        opacity: isDragging ? 0.8 : 1,
    };

    const renderWidget = () => {
        switch (widget.type) {
            case 'clock': return <Widgets.ClockWidget />;
            case 'weather': return <Widgets.WeatherWidget />;
            case 'system': return <Widgets.SystemWidget />;
            case 'quote': return <Widgets.QuoteWidget />;
            case 'calculator': return <Widgets.CalculatorWidget />;
            default: return null;
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-move">
            {renderWidget()}
        </div>
    );
};

export const Desktop = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useMobile();
    const {
        controlCenterOpen,
        moveFile,
        addFile,
        moveToTrash,
        notificationCenterOpen,
        toggleNotificationCenter,
        wallpaper,
        setWallpaper,
        brightness,
        isSleeping,
        setSleeping,
        isLocked,
        widgets,
        addWidget,
        updateWidgetPosition
    } = useOSStore();

    const { openMenu } = useContextMenuStore();

    // Dnd Kit Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    // Make desktop droppable
    const { setNodeRef } = useDroppable({
        id: 'desktop-droppable',
    });

    const { playClickSound, playSwooshSound } = useSound();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta, over } = event;
        const activeData = active.data.current as { type?: string; position: { x: number, y: number } } | undefined;

        if (over && over.id === 'trash-bin') {
            if (activeData?.type === 'widget') {
                return;
            }
            moveToTrash(active.id as string);
            playSwooshSound();
            return;
        }

        if (activeData && activeData.position) {
            const newX = activeData.position.x + delta.x;
            const newY = activeData.position.y + delta.y;

            if (activeData.type === 'widget') {
                updateWidgetPosition(active.id as string, { x: newX, y: newY });
            } else {
                moveFile(active.id as string, 'desktop', { x: newX, y: newY });
            }
            playSwooshSound();
        }
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        // Only trigger if clicking directly on the desktop background
        if ((e.target as HTMLElement).id === 'desktop-bg') {
            openMenu(
                { x: e.clientX, y: e.clientY },
                'desktop',
                [
                    {
                        id: 'new-folder',
                        label: 'New Folder',
                        icon: <FolderPlus size={14} />,
                        action: () => {
                            addFile({
                                id: `folder-${Date.now()}`,
                                name: 'New Folder',
                                type: 'folder',
                                location: 'desktop',
                                position: { x: e.clientX, y: e.clientY }
                            });
                            playClickSound();
                        }
                    },
                    {
                        id: 'change-wallpaper',
                        label: 'Change Wallpaper',
                        icon: <ImageIcon size={14} />,
                        // We will use a submenu for wallpapers
                        submenu: [
                            {
                                id: 'wp-1',
                                label: 'Mountain Peak',
                                action: () => {
                                    setWallpaper('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1920');
                                    playClickSound();
                                }
                            },
                            {
                                id: 'wp-2',
                                label: 'Abstract Art',
                                action: () => {
                                    setWallpaper('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1920');
                                    playClickSound();
                                }
                            },
                            {
                                id: 'wp-3',
                                label: 'Cyberpunk City',
                                action: () => {
                                    setWallpaper('https://images.unsplash.com/photo-1545193544-312906819eb3?auto=format&fit=crop&q=80&w=1920');
                                    playClickSound();
                                }
                            },
                            {
                                id: 'wp-4',
                                label: 'Deep Space',
                                action: () => {
                                    setWallpaper('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1920');
                                    playClickSound();
                                }
                            },
                            {
                                id: 'wp-5',
                                label: 'Minimalist Geometry',
                                action: () => {
                                    setWallpaper('https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1920');
                                    playClickSound();
                                }
                            },
                            {
                                id: 'wp-6',
                                label: 'Nature Forest',
                                action: () => {
                                    setWallpaper('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1920');
                                    playClickSound();
                                }
                            },
                        ]
                    },
                    {
                        id: 'add-widget',
                        label: 'Add Widget',
                        icon: <LayoutTemplate size={14} />,
                        submenu: [
                            { id: 'w-clock', label: 'Clock', action: () => addWidget({ id: `clock-${Date.now()}`, type: 'clock', position: { x: e.clientX, y: e.clientY } }) },
                            { id: 'w-weather', label: 'Weather', action: () => addWidget({ id: `weather-${Date.now()}`, type: 'weather', position: { x: e.clientX, y: e.clientY } }) },
                            { id: 'w-system', label: 'System Stats', action: () => addWidget({ id: `system-${Date.now()}`, type: 'system', position: { x: e.clientX, y: e.clientY } }) },
                            { id: 'w-quote', label: 'Quote', action: () => addWidget({ id: `quote-${Date.now()}`, type: 'quote', position: { x: e.clientX, y: e.clientY } }) },
                            { id: 'w-calc', label: 'Calculator', action: () => addWidget({ id: `calc-${Date.now()}`, type: 'calculator', position: { x: e.clientX, y: e.clientY } }) },
                        ]
                    },
                    {
                        id: 'clean-up',
                        label: 'Clean Up By Name',
                        icon: <LayoutGrid size={14} />,
                        divider: true,
                        action: () => console.log('Clean Up')
                    },
                    {
                        id: 'paste',
                        label: 'Paste Item',
                        icon: <Clipboard size={14} />,
                        disabled: true
                    }
                ]
            );
        }
    };

    if (isMobile) {
        return (
            <div className="fixed inset-0 overflow-hidden bg-black">
                <MobileHome />
                <div className="relative z-50">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div
                ref={setNodeRef}
                id="desktop-bg"
                onContextMenu={handleContextMenu}
                className={`fixed inset-0 bg-cover bg-center transition-all duration-1000 overflow-hidden select-none`}
                style={{ backgroundImage: `url(${wallpaper})` }}
            >
                {/* Overlay to darken background slightly for better contrast */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />

                {/* Desktop Icons */}
                <DesktopIcons />

                {/* Widgets */}
                {widgets.map(widget => (
                    <DraggableWidget key={widget.id} widget={widget} />
                ))}

                {/* Context Menu */}
                <ContextMenu />

                {/* Control Center Overlay */}
                <AnimatePresence>
                    {controlCenterOpen && <ControlCenter />}
                </AnimatePresence>

                {/* Notification Center */}
                <AnimatePresence>
                    {notificationCenterOpen && <NotificationCenter onClose={toggleNotificationCenter} />}
                </AnimatePresence>

                {/* Spotlight Search Overlay */}
                <Spotlight />

                {/* Lock Screen */}
                <AnimatePresence>
                    {isLocked && <LockScreen />}
                </AnimatePresence>

                <div className="relative z-10 w-full h-full p-4 pointer-events-none [&>*]:pointer-events-auto">
                    {children}
                </div>

                {/* Brightness Overlay */}
                <div
                    className="fixed inset-0 pointer-events-none z-[9990] bg-black transition-opacity duration-300"
                    style={{ opacity: (100 - brightness) / 100 }}
                />

                {/* Sleep Overlay */}
                {isSleeping && (
                    <div
                        className="fixed inset-0 z-[100000] bg-black cursor-none"
                        onClick={() => setSleeping(false)}
                    />
                )}
            </div>
        </DndContext>
    );
};
