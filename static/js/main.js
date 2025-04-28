import { ChatBot } from './chatbot.js';
import { initializeCustomMenu } from './custom-menu.js';
import { initializeLabelGridTools } from './label-grid-tools/labelgrid-tools-public.js';
import { initializeLazyLoad } from './lazyload.js';
import { initializeMobileMenu } from './mobmenu.js';
import { coolTagCloudToggle } from './tag-cloud.js';
import { initializeVideoLightbox } from './video-lightbox/video-lightbox.js';

// グローバルに公開（HTMLから直接呼び出すため）
window.coolTagCloudToggle = coolTagCloudToggle;

// 初期化
document.addEventListener('DOMContentLoaded', async () => {
    // jQueryが読み込まれているか確認
    if (typeof jQuery !== 'undefined') {
        try {
            initializeCustomMenu(jQuery);
            initializeMobileMenu(jQuery);
            initializeVideoLightbox(jQuery);
            initializeLabelGridTools(jQuery);
        } catch (error) {
            console.error('Failed to initialize menus:', error);
        }
    } else {
        console.warn('jQuery is not loaded. Menu initializations skipped.');
    }

    // Handlebarsがグローバルに存在することを確認
    if (typeof Handlebars === 'undefined') {
        console.error('Handlebars is not loaded');
    }

    // Layyloadの初期化
    initializeLazyLoad();

    // チャットボットの初期化部分を修正 - js-cookieの読み込みを確認
    if (document.querySelector('#chat-window')) {
        // js-cookieの読み込みを待機
        const waitForCookies = () => {
            if (typeof Cookies !== 'undefined') {
                console.log('Cookies library loaded, initializing chatbot');
                const chatBot = new ChatBot();
                chatBot.initialize();
            } else {
                console.log('Waiting for Cookies library...');
                setTimeout(waitForCookies, 100);
            }
        };
        waitForCookies();
    }

    // コンタクトフォームの初期化（URLの条件付き動的インポート）
    if (window.location.pathname === '/contact/' && document.querySelector('#contact-form')) {
        try {
            // パスを明示的に指定
            const contactFormModule = await import('./contact-form/contact-form.js');
            await contactFormModule.initializeContactForm();
        } catch (error) {
            console.error('Contact form module load error:', error); // より詳細なエラー情報
        }
    }
});

// グローバルエラーハンドリング
window.addEventListener('error', function (e) {
    console.error('Global error:', e.error);
});

// スクリプトの読み込み完了ログ
console.log('Main script initialization completed');