// ユーザーIDとセッション管理
export class UserSessionManager {
    constructor() {
        this.sessionId = Math.random().toString(36).substring(2);
        this.userId = this.getUserId();
    }

    getUserId() {
        try {
            let userId = localStorage.getItem('user_id');
            if (!userId) {
                userId = Math.random().toString(36).substring(2);
                localStorage.setItem('user_id', userId);
            }
            return userId;
        } catch (e) {
            try {
                let userId = Cookies.get('user_id');
                if (!userId) {
                    userId = Math.random().toString(36).substring(2);
                    Cookies.set('user_id', userId);
                }
                return userId;
            } catch (e) {
                alert('Please enable local storage or cookies in your browser settings.');
                return null;
            }
        }
    }

    initializeIds() {
        if (this.userId) {
            document.getElementById('user_id').value = this.userId;
            document.getElementById('session_id').value = this.sessionId;
            return true;
        } else {
            this.disableForm();
            return false;
        }
    }

    disableForm() {
        $('form').off('submit');
        $('[name="user_message"]').prop('disabled', true);
        $('[name="submit"]').prop('disabled', true);
    }
}

// チャットボットの管理
export class ChatBot {
    constructor() {
        this.appUrl = "https://backend.tubm.tokyo/";
        this.chatButtonText = $('.chat-help-text').text();
        this.welcomeMessageShown = false;
        this.memberId = "tubm";
        this.isComposing = false;
    }

    initialize() {
        this.initializeChatButton();
        this.initializeTextArea();
        this.initializeFormSubmission();
    }

    initializeChatButton() {
        $('.chat-button-wrapper').click(() => {
            if ($('#chat-window').is(':visible')) {
                this.closeChatWindow();
            } else {
                this.openChatWindow();
            }
        });
    }

    closeChatWindow() {
        $('#chat-window').fadeOut(250);
        $('#chat-toggle').html(`<span class="chat-help-text">${this.chatButtonText}</span><img src="${mcc_line_bot_script_vars.MY_PLUGIN_PATH}static/icons8-bot-64.png" alt="bot" />`);
    }

    openChatWindow() {
        $('#chat-window').fadeIn(330);
        $('#chat-toggle').html(`<span class="chat-help-text">${this.chatButtonText}</span><span style="font-size: 25px; color: #FFF;">X</span>`);

        if (!this.welcomeMessageShown) {
            this.showWelcomeMessage();
            this.welcomeMessageShown = true;
        }

        this.sendMemberIdToBackend();
        $('textarea[name="user_message"]').focus();
    }

    sendMemberIdToBackend() {
        $.ajax({
            url: `${this.appUrl}/get_cognito_id`,
            type: 'POST',
            data: { member_id: this.memberId },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log("Failed to send memberId to backend:", textStatus, errorThrown);
            }
        });
    }

    initializeTextArea() {
        $('textarea[name="user_message"]').on(
            'keydown keypress compositionstart compositionend',
            this.handleTextAreaEvents.bind(this)
        );
    }

    initializeFormSubmission() {
        $('#mcc_line_bot-form').on('submit', this.handleFormSubmit.bind(this));
    }

    showTypingIndicator(finalMessage) {
        let typing_indicator = '.';
        const typing_indicator_bubble = $('<div class="ai-message-bubble"></div>');
        typing_indicator_bubble.text(typing_indicator);
        $('#chat-messages').append(typing_indicator_bubble);

        const typing_interval = setInterval(() => {
            typing_indicator = typing_indicator === '...' ? '.' : typing_indicator + '.';
            typing_indicator_bubble.text(typing_indicator);
        }, 500);

        setTimeout(() => {
            clearInterval(typing_interval);
            typing_indicator_bubble.remove();

            const bot_response = $('<div class="ai-message-bubble"></div>');
            bot_response.text(finalMessage);
            $('#chat-messages').append(bot_response);

            $('#chat-messages').animate({
                scrollTop: $('#chat-messages').prop('scrollHeight')
            }, 500);
        }, 2000);
    }

    showWelcomeMessage() {
        const welcomeMessage = mcc_line_bot_script_vars.welcome_message;
        this.showTypingIndicator(welcomeMessage);
    }

    handleTextAreaEvents(event) {
        // IME入力の処理
        if (event.type === 'compositionstart') {
            this.isComposing = true;
        } else if (event.type === 'compositionend') {
            this.isComposing = false;
        }

        // Enterキーの処理
        if (event.type === 'keydown' && event.key === 'Enter' && !event.shiftKey && !this.isComposing) {
            event.preventDefault();
            this.handleFormSubmit(event);
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const messageInput = $('textarea[name="user_message"]');
        const message = messageInput.val().trim();

        if (message) {
            // メッセージの送信処理
            console.log('Sending message:', message);
            // ここにメッセージ送信のロジックを追加

            // 入力フィールドをクリア
            messageInput.val('');
        }
    }

    // 他の必要なメソッドを追加
    // handleTextAreaEvents, handleFormSubmit, showTypingIndicator など
}