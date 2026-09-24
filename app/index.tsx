import { AppText, Button } from "@/src/components/ui";
import { Input } from "@/src/components/ui/input";
import { colors, fontSize, sizes, spacing } from "@/src/theme";
import { Link, useRouter } from "expo-router";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin1234");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function handlePress() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/dashboard/newDashboard");
    }, 150);
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: colors.background.cream,
        padding: sizes.screen.horizontalPadding,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        style={{
          gap: spacing[16],
        }}
      >
        <View
          className="flex-row items-center"
          style={{ gap: spacing[1], paddingVertical: spacing[2] }}
        >
          <Image
            source={require("@/assets/images/logo2.png")}
            style={{ width: 90, height: 150, marginLeft: -18 }}
          />
          <View className="flex-1 justify-center" style={{ gap: spacing[1] }}>
            <AppText
              variant="screenTitle"
              style={{
                color: colors.brand.primary,
                fontSize: fontSize.screenTitle,
              }}
            >
              Pane{"\n"}Facile
            </AppText>
            <AppText variant="body" tone="secondary">
              Gestão que {"\n"}alimenta seu negócio
            </AppText>
          </View>
        </View>
        <View>
          <AppText
            variant="pageTitle"
            style={{
              color: colors.brand.primary,
              fontSize: fontSize.pageTitle,
            }}
          >
            Bem-vindo
          </AppText>
          <AppText variant="body" tone="secondary">
            Faça seu login para continuar
          </AppText>
        </View>
        <View
          className="justify-start"
          style={{ gap: spacing[2], paddingHorizontal: spacing[1] }}
        >
          <AppText variant="label" tone="primary">
            Usuário
          </AppText>
          <Input
            value={email}
            leftElement={<UserRound />}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <AppText variant="label" tone="primary">
            Senha
          </AppText>
          <Input
            value={password}
            leftElement={<LockKeyhole />}
            rightElement={
              <Pressable onPress={() => setShowPassword((current) => !current)}>
                {showPassword ? <Eye /> : <EyeOff />}
              </Pressable>
            }
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!showPassword}
          />
          <Link href="/(tabs)/dashboard">
            <AppText
              variant="label"
              tone="primary"
              className="text-right"
              style={{ color: colors.brand.primary }}
            >
              Esqueci minha senha
            </AppText>
          </Link>
        </View>
        <Button onPress={handlePress} isLoading={loading}>
          Entrar
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
