# Getting Started
>  **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

This app uses the [CoinCap Api V2](https://docs.coincap.io/) to display real-time updates for multiple crypto-currencies.

![real_time](https://github.com/JMRamosJuarez/coincap/assets/19629268/d3f7897a-78cb-40c3-987d-e58822cf151f)

Search your favorite cryptocurrency

![search](https://github.com/JMRamosJuarez/coincap/assets/19629268/9ee66fa3-a5c1-4996-b542-cb9f8b32c45c)

It also provides a complete detail of the selected asset:

![english-detail](https://github.com/JMRamosJuarez/coincap/assets/19629268/6a8eda87-3006-4625-8e81-d0bda229715c)

Support for English and Spanish, based on your device language.

![english-detail](https://github.com/JMRamosJuarez/coincap/assets/19629268/6a8eda87-3006-4625-8e81-d0bda229715c) ![spanish-detail](https://github.com/JMRamosJuarez/coincap/assets/19629268/ce820b93-60d6-4f8a-8fb8-5d25bb049639)

## Step 1: Create a .env.dev file
First, you will need to create a ".env.dev" file and add this 2 variables:
```
COINCAP_BASE_URL=https://api.coincap.io/v2
COINCAP_TOKEN=${your_api_token}
```
> **Note**:  You can generate a coincap token here: https://coincap.io/api-key

## Step 2: Start your Application

  Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start.

### For Android
```bash
yarn android-dev
```
If everything is set up _correctly_, you should see the app running in your _Android Emulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio

## Congratulations! :tada:
You've successfully run the App.

### TODO
- iOS configuration.
