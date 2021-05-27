import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native', () => require('react-native-mock-render'), {virtual: true})
jest.mock('@react-native', () => require('react-native-mock-render'), {virtual: true})
jest.mock('react-native-system-setting', () => require('react-native-mock-render'), {virtual: true})
jest.mock('react-native-volume-control', () => require('react-native-mock-render'), {virtual: true})

jest.mock('react-native-background-actions', () => require('react-native-mock-render'), {virtual: true})
