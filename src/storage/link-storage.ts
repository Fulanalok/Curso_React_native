import AsyncStorage from "@react-native-async-storage/async-storage";

const LINKS_STORAGE_KEY = "@links_storage";

export type LinkStorage = {
  id: string;
  name: string;
  url: string;
  category: string;
};

async function get(): Promise<LinkStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY);

    if (!storage) {
      return [];
    }

    const response = JSON.parse(storage);

    if (!Array.isArray(response)) {
      console.warn("Storage data is not an array, resetting...");
      await AsyncStorage.removeItem(LINKS_STORAGE_KEY);
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error getting links:", error);
    // Se der erro, limpar o storage corrompido
    await AsyncStorage.removeItem(LINKS_STORAGE_KEY);
    return [];
  }
}

async function save(newLink: LinkStorage) {
  try {
    console.log("Saving link:", newLink);

    const storage = await get();
    const updated = [...storage, newLink];

    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));

    console.log("Link saved successfully");
  } catch (error) {
    console.error("Error saving link:", error);
    throw new Error("Erro ao salvar o link");
  }
}

async function remove(linkId: string) {
  try {
    console.log("Removing link:", linkId);

    const storage = await get();
    const updated = storage.filter((link) => link.id !== linkId);

    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));

    console.log("Link removed successfully");
  } catch (error) {
    console.error("Error removing link:", error);
    throw new Error("Erro ao excluir o link");
  }
}

export const LinkStorage = {
  get,
  save,
  remove,
};
