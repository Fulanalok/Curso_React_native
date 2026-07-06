import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { LinkStorage } from "@/storage/link-storage";
import { colors } from "@/styles/colors";
import { styles } from "@/styles/screens/add";

export default function Add() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = async () => {
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione uma categoria");
      }

      if (!name.trim()) {
        return Alert.alert("Nome", "Informe o nome do item");
      }

      if (!url.trim()) {
        return Alert.alert("URL", "Informe a URL do item");
      }

      await LinkStorage.save({
        id: new Date().getTime().toString(),
        category,
        name: name.trim(),
        url: url.trim(),
      });

      Alert.alert("Sucesso", "Link adicionado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o link");
      console.error(error);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input
          placeholder="Nome"
          onChangeText={setName}
          autoCorrect={false}
          value={name}
        />
        <Input
          placeholder="URL"
          onChangeText={setUrl}
          autoCorrect={false}
          value={url}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
