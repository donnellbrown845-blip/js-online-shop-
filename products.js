export async function fetchProducts() {
    const url = "./products.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Couldn't load products.");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to load products. Please try again later.");
        return [];
    }
}