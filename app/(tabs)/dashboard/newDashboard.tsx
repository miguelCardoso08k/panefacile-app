import { AppText } from "@/src/components/ui";
import { colors, sizes, spacing } from "@/src/theme";
import { Link } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewDashboard() {
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
            <AppText>IconLogo</AppText>
            <AppText>Logo</AppText>
          </View>
          <View>
            <Link href="../../">
              <AppText>Notificações</AppText>
            </Link>
          </View>
        </View>
        <View>
          <AppText>Olá, Admin</AppText>
          <AppText>Sábado, 8 de Junho de 2027</AppText>
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
