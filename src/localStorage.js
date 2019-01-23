export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('adoor');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        return undefined;
    }
}

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('adoor', serializedState);
    } catch (err) {
        console.log(err);
    }
}