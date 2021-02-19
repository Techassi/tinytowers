import { CoreConfig } from '@/types/core-config';

export async function loadFromURL(url: string): Promise<CoreConfig> {
    try {
        const res = await fetch(url);
        const data = await res.text();

        const config: CoreConfig = JSON.parse(data);
        console.log(config);

        return config;
    } catch (error) {
        throw new Error(error);
    }
}
