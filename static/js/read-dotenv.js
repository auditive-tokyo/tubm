const config = {
    apiEndpoint: process.env.API_ENDPOINT
};

// 環境変数が設定されていない場合はエラーをスロー
if (!config.apiEndpoint) {
    throw new Error('API_ENDPOINT environment variable is not set');
}

export default config;