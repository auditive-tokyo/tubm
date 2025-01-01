import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

export default defineConfig({
    // 環境変数をクライアントに公開
    define: {
        'process.env': process.env
    }
}); 