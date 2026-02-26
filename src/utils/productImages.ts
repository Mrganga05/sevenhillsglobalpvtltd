export const PRODUCT_IMAGE_MAP: Record<string, string> = {
    'turmeric': 'https://images.unsplash.com/photo-1615486171448-4cbafcc28b24?auto=format&fit=crop&q=80',
    'cashew': 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80',
    'onion': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80',
    'millet': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    'jaggery': 'https://images.unsplash.com/photo-1621509424729-19c23de2287c?auto=format&fit=crop&q=80',
    'honey': 'https://images.unsplash.com/photo-1587049352847-8d4c0b8b104c?auto=format&fit=crop&q=80',
    'moringa': 'https://plus.unsplash.com/premium_photo-1675806655182-35dbcb504245?auto=format&fit=crop&q=80', // Replace with a more specific leaf powder if needed
    'banana': 'https://images.unsplash.com/photo-1571501715424-6fd43b9ee4a4?auto=format&fit=crop&q=80',
    'groundnut': 'https://images.unsplash.com/photo-1634567228224-bd7c1cf0d7db?auto=format&fit=crop&q=80',
    'peanut': 'https://images.unsplash.com/photo-1634567228224-bd7c1cf0d7db?auto=format&fit=crop&q=80',
    'pepper': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80',
    'chilli': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80', // same as pepper for dry red
    'spice': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80',
    'herbal': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80',
    'vegetable powder': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80',
    'vegetable': 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80',
    'mango': 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80',
    'fruit': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80',
    'tea': 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80',
    'coffee': 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80',
    'marine': 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80',
    'fish': 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80',
    'gem': 'https://images.unsplash.com/photo-1615114814213-a245ffc79e9a?auto=format&fit=crop&q=80',
    'jewellery': 'https://images.unsplash.com/photo-1599643478524-fb402aa30aeb?auto=format&fit=crop&q=80',
    'ceramic': 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80',
    'glassware': 'https://images.unsplash.com/photo-1603517208933-21c60b296f8c?auto=format&fit=crop&q=80',
    'cereal': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80',
    'textile': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80',
    'garment': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80',
    'foot wear': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80',
    'dry fruit': 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80',
    'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    'basmati': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    'coconut': 'https://images.unsplash.com/photo-1522031122941-2a13b63c9071?auto=format&fit=crop&q=80',
    'amla': 'https://images.unsplash.com/photo-1595859702846-590059c2b4c1?auto=format&fit=crop&q=80', // Replace with Indian gooseberry if needed
    'tamarind': 'https://images.unsplash.com/photo-1621509424729-19c23de2287c?auto=format&fit=crop&q=80', // Similar vibe to jaggery
    'cocopeat': 'https://images.unsplash.com/photo-1605333535266-419b7ce968ae?auto=format&fit=crop&q=80'
};

export function getFallbackImage(productName: string): string | null {
    if (!productName) return null;

    const lowerName = productName.toLowerCase();

    // Iterate through our map and check if the product name includes any of our keywords
    for (const [keyword, imageUrl] of Object.entries(PRODUCT_IMAGE_MAP)) {
        if (lowerName.includes(keyword)) {
            // Guarantee low-bandwidth optimization on the fallbacks
            return `${imageUrl}&w=800`;
        }
    }

    return null;
}
