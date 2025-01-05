import config from './contact-form-api-endpoint.js';

// ローディング表示の制御関数
function toggleLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
}

// フォームの送信処理
async function handleSubmit(form) {
    console.log('Handling form submission');

    // 各フォームフィールドの取得
    const nameField = document.getElementById('g360-name');
    const emailField = document.getElementById('g360-email');
    const messageField = document.getElementById('contact-form-comment-g360-message');

    // フォームデータの取得
    const formData = {
        name: nameField?.value || '',
        email: emailField?.value || '',
        message: messageField?.value || ''
    };

    // バリデーション
    if (!emailField?.value) {
        console.error('Email is required');
        alert('Email is required');
        return;
    }

    if (!messageField?.value) {
        console.error('Message is required');
        alert('Message is required');
        return;
    }

    try {
        // ローディング表示を開始
        toggleLoading(true);
        console.log('Preparing to send request to API...');

        // API URLの確認
        const apiUrl = config.apiEndpoint;
        console.log('API URL:', apiUrl);

        // リクエストの準備
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };

        // APIリクエストの送信
        console.log('Sending request to API...');
        const response = await fetch(apiUrl, requestOptions);
        console.log('Raw API Response:', response);

        // レスポンスの処理
        if (response.ok) {
            console.log('Request successful');
            const responseData = await response.json();
            console.log('Response data:', responseData);

            // ローディング表示を終了
            toggleLoading(false);
            alert('Message sent successfully!');
            form.reset();
            console.log('Form reset completed');
        } else {
            const errorText = await response.text();
            console.error('Response not OK:', {
                status: response.status,
                statusText: response.statusText,
                errorText: errorText
            });
            throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack
        });
        // エラー時もローディング表示を終了
        toggleLoading(false);
        alert('Failed to send message. Please try again later.');
    }
}

// メイン初期化関数
export async function initializeContactForm() {
    console.log('Initializing contact form...');

    // フォーム要素の取得
    const form = document.querySelector('#contact-form');
    if (!form) {
        console.error('Contact form not found');
        return;
    }

    // サブミットボタンの取得
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) {
        console.error('Submit button not found');
        return;
    }

    // フォームのサブミットイベントを設定
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        handleSubmit(form);
    });

    // サブミットボタンのクリックイベントも設定
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        handleSubmit(form);
    });

    console.log('Contact form initialized successfully');
}