import { create } from 'zustand';

export type ContextMenuType = 'desktop' | 'dock' | 'file' | 'folder' | null;

interface ContextMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    action?: () => void;
    disabled?: boolean;
    divider?: boolean;
    submenu?: ContextMenuItem[];
}

interface ContextMenuState {
    isOpen: boolean;
    position: { x: number; y: number };
    menuType: ContextMenuType;
    targetId: string | null;
    items: ContextMenuItem[];

    openMenu: (
        position: { x: number; y: number },
        menuType: ContextMenuType,
        items: ContextMenuItem[],
        targetId?: string
    ) => void;
    closeMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
    isOpen: false,
    position: { x: 0, y: 0 },
    menuType: null,
    targetId: null,
    items: [],

    openMenu: (position, menuType, items, targetId) => set({
        isOpen: true,
        position,
        menuType,
        items,
        targetId: targetId || null,
    }),

    closeMenu: () => set({
        isOpen: false,
        menuType: null,
        targetId: null,
        items: [],
    }),
}));

export type { ContextMenuItem };
