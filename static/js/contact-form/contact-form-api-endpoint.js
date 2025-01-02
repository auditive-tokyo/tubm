const config = {
    apiEndpoint: 'https://jnbmh1xrfb.execute-api.ap-south-1.amazonaws.com/tubm/contact'
};

// 環境変数が設定されていない場合はエラーをスロー
if (!config.apiEndpoint) {
    throw new Error('API_ENDPOINT environment variable is not set');
}

export default config;