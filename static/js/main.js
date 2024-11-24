import { ChatBot, UserSessionManager } from './chatbot.js';
import { initializeContactForm } from './contact-form.js';
import { initializeLazyLoad } from './lazyload.js';
import { coolTagCloudToggle } from './tag-cloud.js';

// グローバルに公開（HTMLから直接呼び出すため）
window.coolTagCloudToggle = coolTagCloudToggle;

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // Layyloadの初期化
    initializeLazyLoad();

    // チャットボットの初期化
    if (document.querySelector('#chat-window')) {
        const userSession = new UserSessionManager();
        if (userSession.initializeIds()) {
            const chatBot = new ChatBot();
            chatBot.initialize();
        }
    }

    // コンタクトフォームの初期化
    if (document.querySelector('#contact-form')) {
        initializeContactForm();
    }
});

// グローバルエラーハンドリング
window.addEventListener('error', function (e) {
    console.error('Global error:', e.error);
});

// スクリプトの読み込み完了ログ
console.log('Main script initialization completed');