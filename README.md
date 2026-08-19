# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Environment variables

Copy `.env.example` to `.env` and fill in real values for local development.

`.env` is gitignored and is **not** available on EAS Build servers. Any `EXPO_PUBLIC_*` variable the app needs at build/runtime (e.g. `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`) must also be registered as an EAS environment variable so it gets injected during cloud builds:

```bash
eas env:set --environment development --environment preview \
  --name EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY \
  --value pk_test_xxxxxxxx \
  --type string --visibility plaintext

eas env:set --environment production \
  --name EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY \
  --value pk_live_xxxxxxxx \
  --type string --visibility plaintext
```

Check what's currently set with `eas env:list`.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
