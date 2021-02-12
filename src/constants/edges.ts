const edges = new Array<string>('NORTH', 'EAST', 'SOUTH', 'WEST');

export const EDGES = new Proxy(edges, {
    get(target: string[], prop) {
        if (prop == 'length') {
            return target.length;
        }

        let parsed = parseInt(prop as string, 10);
        if (!isNaN(parsed)) {
            if (parsed < 0) {
                parsed += target.length;
            }
        }
        return target[parsed];
    },
});
