
interface LocalizedString {
    fr_FR: string;
    [key: string]: string;
}

interface ItemQuality {
    name: LocalizedString;
    type: string;
}

interface ItemSearchResult {
    data: {
        id: number;
        name: LocalizedString;
        quality: ItemQuality;
        required_level: number;
        purchase_price: number;
        sell_price: number;
    };
}

export type { LocalizedString, ItemQuality, ItemSearchResult };