import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("admin@panefacile.com.br");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    router.replace("/dashboard");
  }

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-center px-6"
      >
        <View className="mb-10 items-center">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-brand-700">
            <Ionicons name="restaurant-outline" size={38} color="#F6C65B" />
          </View>
          <Text className="text-[26px] font-bold tracking-[3px] text-brand-900">
            PANE FACILE
          </Text>
          <Text className="mt-1 text-xs font-semibold tracking-[4px] text-gold">
            PADARIA
          </Text>
          <Text className="mt-5 text-center text-sm leading-5 text-neutral-500">
            Gestão simples para uma rotina mais leve.
          </Text>
        </View>

        <View className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <Text className="text-2xl font-bold text-ink">Bem-vindo</Text>
          <Text className="mb-6 mt-1 text-sm text-neutral-500">
            Entre para acessar a operação da padaria.
          </Text>

          <Text className="mb-2 text-sm font-semibold text-neutral-700">E-mail</Text>
          <View className="mb-4 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-50 px-4">
            <Ionicons name="mail-outline" size={19} color="#737373" />
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              className="h-14 flex-1 px-3 text-base text-ink"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="seu@email.com"
              placeholderTextColor="#A3A3A3"
              value={email}
            />
          </View>

          <Text className="mb-2 text-sm font-semibold text-neutral-700">Senha</Text>
          <View className="flex-row items-center rounded-xl border border-neutral-200 bg-neutral-50 px-4">
            <Ionicons name="lock-closed-outline" size={19} color="#737373" />
            <TextInput
              className="h-14 flex-1 px-3 text-base text-ink"
              onChangeText={setPassword}
              placeholder="Sua senha"
              placeholderTextColor="#A3A3A3"
              secureTextEntry={!showPassword}
              value={password}
            />
            <Pressable
              accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
              hitSlop={12}
              onPress={() => setShowPassword((value) => !value)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={21}
                color="#737373"
              />
            </Pressable>
          </View>

          <Pressable
            className="mt-6 h-14 items-center justify-center rounded-xl bg-brand-700 active:bg-brand-900"
            onPress={handleLogin}
          >
            <Text className="text-base font-bold text-white">Entrar</Text>
          </Pressable>

          <Text className="mt-4 text-center text-xs text-neutral-400">
            Acesso demonstrativo — qualquer credencial é aceita
          </Text>
        </View>

        <Text className="mt-8 text-center text-xs text-neutral-400">
          Pane Facile • Gestão comercial e financeira
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
