try {
    console.log('Resolving plugin...');
    const path = require.resolve('react-native-reanimated/plugin');
    console.log('Success:', path);
} catch (e) {
    console.error('Failed:', e.message);
}
