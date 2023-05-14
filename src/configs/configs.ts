type Permissions = { 
    [role: string]: { 
        read: boolean, 
        write: boolean, 
        edit: boolean | string, 
        delete: boolean | string 
    } 
}

export const PERSMISIONS: Permissions = {
    root: {
        read: true,
        write: true,
        edit: true,
        delete: true
    },
    editor: {
        read: true,
        write: true,
        edit: true,
        delete: true
    },
    author: {
        read: true,
        write: true,
        edit: "own",
        delete: "own"
    },
    reader: {
        read: true,
        write: false,
        edit: false,
        delete: false
    }
};