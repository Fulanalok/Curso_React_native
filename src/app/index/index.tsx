import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import {
  LinkStorage,
  type LinkStorage as LinkStorageType,
} from "@/storage/link-storage";
import { colors } from "@/styles/colors";
import { styles } from "@/styles/screens/home";
import { categories } from "@/utils/categories";

const EXAMPLE_LINKS: LinkStorageType[] = [
  {
    id: "1",
    name: "YouTube",
    url: "https://youtube.com",
    category: "projetos",
  },
  { id: "2", name: "Google", url: "https://google.com", category: "projetos" },
  {
    id: "3",
    name: "React Native Docs",
    url: "https://reactnative.dev",
    category: "projetos",
  },
  {
    id: "4",
    name: "Expo Documentation",
    url: "https://docs.expo.dev",
    category: "projetos",
  },
  {
    id: "5",
    name: "Todo App",
    url: "https://todoapp.com",
    category: "tarefas",
  },
  {
    id: "6",
    name: "Task Manager",
    url: "https://taskmanager.com",
    category: "tarefas",
  },
  { id: "7", name: "Notion", url: "https://notion.so", category: "tarefas" },
  { id: "8", name: "Trello", url: "https://trello.com", category: "tarefas" },
  {
    id: "9",
    name: "Design Inspiration",
    url: "https://dribbble.com",
    category: "ideias",
  },
  {
    id: "10",
    name: "Color Palette",
    url: "https://coolors.co",
    category: "ideias",
  },
  {
    id: "11",
    name: "UI Components",
    url: "https://ui.dev",
    category: "ideias",
  },
  {
    id: "12",
    name: "Creative Ideas",
    url: "https://pinterest.com",
    category: "ideias",
  },
];

export default function Index() {
  const [selectedLink, setSelectedLink] = useState<LinkStorageType | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [links, setLinks] = useState<LinkStorageType[]>([]);
  const [category, setCategory] = useState(categories[0].name);

  const getLinks = useCallback(async () => {
    try {
      const response = await LinkStorage.get();

      if (response.length === 0) {
        for (const exampleLink of EXAMPLE_LINKS) {
          await LinkStorage.save(exampleLink);
        }

        const filtered = EXAMPLE_LINKS.filter(
          (link) => link.category === category
        );
        setLinks(filtered);
        return;
      }

      const filtered = response.filter((link) => link.category === category);
      setLinks(filtered);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os links");
      console.error(error);

      const filtered = EXAMPLE_LINKS.filter(
        (link) => link.category === category
      );
      setLinks(filtered);
    }
  }, [category]);

  const handleDetails = useCallback((selected: LinkStorageType) => {
    setSelectedLink(selected);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedLink(null);
  }, []);

  const handleRemove = useCallback(async () => {
    if (!selectedLink) {
      return;
    }

    try {
      Alert.alert(
        "Confirmar exclusão",
        `Deseja excluir o link "${selectedLink.name}"?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: async () => {
              try {
                await LinkStorage.remove(selectedLink.id);
                await getLinks();
                handleCloseModal();
                Alert.alert("Sucesso", "Link excluído com sucesso!");
              } catch (error) {
                Alert.alert("Erro", "Não foi possível excluir o link");
                console.error(error);
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o link");
      console.error(error);
    }
  }, [selectedLink, getLinks, handleCloseModal]);

  const handleAddNew = useCallback(() => {
    router.push("/add");
  }, []);

  const handleOpenLink = useCallback(async () => {
    if (!selectedLink?.url) {
      return;
    }

    try {
      const supported = await Linking.canOpenURL(selectedLink.url);

      if (supported) {
        await Linking.openURL(selectedLink.url);
        handleCloseModal();
      } else {
        Alert.alert("Erro", "Não foi possível abrir este link");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir o link");
      console.error(error);
    }
  }, [selectedLink, handleCloseModal]);

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [getLinks])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={handleAddNew} activeOpacity={0.7}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>
                {selectedLink?.category || "Categoria"}
              </Text>
              <TouchableOpacity onPress={handleCloseModal} activeOpacity={0.7}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{selectedLink?.name}</Text>
            <Text style={styles.modalUrl}>{selectedLink?.url}</Text>

            <View style={styles.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              />
              <Option name="Abrir" icon="language" onPress={handleOpenLink} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
