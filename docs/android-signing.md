# Assinatura Android

As novas versões do Pane Facile devem manter simultaneamente:

- o package name `com.panefacile.app`;
- a mesma chave privada de assinatura;
- um `android.versionCode` maior que o da versão instalada.

## Assinatura legada

O APK `builds/panefacile-app-1.0.1.apk` usa o certificado abaixo:

```text
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Alias: androiddebugkey
```

A chave privada correspondente está em
`credentials/android/panefacile-legacy.keystore`. O arquivo é ignorado pelo Git
e deve ser guardado também em um cofre de senhas ou backup seguro. Se essa chave
for perdida, não será possível atualizar instalações assinadas por ela.

O `credentials.json`, também ignorado pelo Git, registra o caminho e os dados
locais usados pelo EAS. Os perfis de build estão em `eas.json` e usam
`credentialsSource: local`.

## Gerar um APK atualizável

Os perfis estão configurados com `autoIncrement: true`. Antes de distribuir o
APK, confirme que o `versionCode` gerado é maior que o da versão instalada e
execute:

```bash
eas build --platform android --profile preview --local
```

Depois da build, confirme o certificado do APK:

```bash
apksigner verify --print-certs caminho/para/app.apk
```

O digest SHA-256 precisa ser igual ao registrado acima.
