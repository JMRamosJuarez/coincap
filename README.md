# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

This app uses the [CoinCap Api V2](https://docs.coincap.io/) to display real-time updates for multiple crypto-currencies.

![real_time](https://github.com/JMRamosJuarez/coincap/assets/19629268/d3f7897a-78cb-40c3-987d-e58822cf151f)

Search your favorite cryptocurrency

![search](https://github.com/JMRamosJuarez/coincap/assets/19629268/9ee66fa3-a5c1-4996-b542-cb9f8b32c45c)

It also provides a complete detail of the selected asset:

![english-detail](https://github.com/JMRamosJuarez/coincap/assets/19629268/6a8eda87-3006-4625-8e81-d0bda229715c)

Support for English and Spanish, based on your device language.

![english-detail](https://github.com/JMRamosJuarez/coincap/assets/19629268/6a8eda87-3006-4625-8e81-d0bda229715c) ![spanish-detail](https://github.com/JMRamosJuarez/coincap/assets/19629268/ce820b93-60d6-4f8a-8fb8-5d25bb049639)

Support for iPad/Tablet

![Coincap - iPad](https://github.com/user-attachments/assets/2ddbe02b-d6c9-4034-b958-6efe67456603)

## Step 1: Create the .env files

Create the production .env file

```
COINCAP_BASE_URL=https://api.coincap.io/v2
COINCAP_TOKEN=${your_production_api_token}
```

Create the develop .env.dev file

```
COINCAP_BASE_URL=https://api.coincap.io/v2
COINCAP_TOKEN=${your_develop_api_token}
```

> **Note**: You can generate a coincap token here: https://coincap.io/api-key

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start.

## For Android

```bash
yarn android-{{flavor}}
```

### Android Develop

```bash
yarn android-dev
```

### Android Production

```bash
yarn android-production
```

## For iOS

```bash
yarn ios-{{flavor}}
```

### Android Develop

```bash
yarn ios-dev
```

### Android Production

```bash
yarn ios-production
```

If everything is set up _correctly_, you should see the app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run the app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations! :tada:

You've successfully run the App.
