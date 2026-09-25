import { AppText, Button } from "@/src/components/ui";
import { colors, sizes, spacing } from "@/src/theme";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewDashboard() {
  const router = useRouter();

  const handleBellPress = () => {
    router.replace("/");
  };
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: colors.background.default,
        padding: sizes.screen.horizontalPadding,
      }}
    >
      <View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center" style={{ gap: spacing[1] }}>
            <Image
              source={require("@/assets/images/logo2.png")}
              style={{ width: 50, height: 60, paddingTop: -20 }}
            />
            <View style={{ gap: spacing[1] }}>
              <AppText
                variant="sectionTitle"
                style={{ color: colors.brand.dark }}
              >
                PANEFACILE
              </AppText>
              <AppText
                variant="label"
                className="text-center"
                style={{ color: colors.brand.gold }}
              >
                PADARIA
              </AppText>
            </View>
          </View>
          <View>
            <Button onPress={handleBellPress} size="sm" variant="ghost">
              <Bell />
            </Button>
          </View>
        </View>
        <View>
          <AppText variant="cardTitle" style={{ color: colors.brand.primary }}>
            Olá, Admin! 👨‍🍳
          </AppText>
          <AppText variant="caption" tone="muted">
            Sábado, 8 de Junho de 2027
          </AppText>
        </View>
      </View>
      <View>
        <AppText>FlashCard principal</AppText>
      </View>
      <View>
        <View
          className="flex-row justify-between items-center"
          style={{ gap: spacing[1] }}
        >
          <AppText>Resumo financeiro</AppText>
          <AppText>Ver detalhes</AppText>
        </View>
      </View>
      <View>
        <View
          className="flex-row justify-between items-center"
          style={{ gap: spacing[1] }}
        >
          <AppText>Fechamentos que precisam de atenção</AppText>
          <AppText>Ver detalhes</AppText>
        </View>
      </View>
      <View>
        <View
          className="flex-row justify-between items-center"
          style={{ gap: spacing[1] }}
        >
          <AppText>Pedidos em rota</AppText>
          <AppText>Ver todos</AppText>
        </View>
      </View>
      <View>
        <AppText>Ações rápidas</AppText>
      </View>
    </SafeAreaView>
  );
}
