// Gemini New Chat Hotkey Script
// Detects platform-specific hotkeys and clicks new chat button
// macOS: Ctrl+M or Ctrl+N
// Windows: Ctrl+M or Ctrl+Shift+N

(function() {
    'use strict';
    
    console.log('Gemini new chat hotkey script loaded');
    
    // ========================================
    // CONFIGURATION & ENTRY POINT
    // ========================================
    
    // Detect platform
    const isMac = navigator.userAgentData?.platform?.toUpperCase().includes('MACOS') ||
                  navigator.userAgent.toUpperCase().includes('MAC');
    
    console.log(`Platform detected: ${isMac ? 'macOS' : 'Windows/Other'}`);
    
    // Hotkey configuration by platform
    const HOTKEY_CONFIG = {
        mac: [
            { keys: { ctrl: true, key: 'm' }, name: 'Ctrl+M', description: 'Google Slides style' },
            { keys: { ctrl: true, key: 'n' }, name: 'Ctrl+N', description: 'macOS' }
        ],
        windows: [
            { keys: { ctrl: true, key: 'm' }, name: 'Ctrl+M', description: 'Google Slides style' },
            { keys: { ctrl: true, shift: true, key: 'n' }, name: 'Ctrl+Shift+N', description: 'Windows' }
        ]
    };
    
    // Button selectors (primary and fallbacks)
    const BUTTON_SELECTORS = [
        '[data-test-id="new-chat-button"] > button',
        'button[aria-label*="new chat" i]',
        'button[title*="new chat" i]',
        '[data-test-id="new-chat-button"]',
        'button[data-testid*="new-chat" i]',
        'button[data-testid*="new_chat" i]',
        'button[jsname*="new" i]',
        'div[data-test-id="new-chat-button"]'
    ];
    
    // Initialize the script
    function init() {
        // Add event listener for keydown events
        document.addEventListener('keydown', handleKeyDown, true);
        
        // Setup DOM ready handler
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onDOMReady);
        } else {
            onDOMReady();
        }
        
        // Expose debug functions globally
        window.debugGeminiNewChat = debugFindNewChatButton;
        window.showGeminiHotkeys = showHotkeys;
        
        // Log initialization
        const hotkeys = getAvailableHotkeys();
        console.log('Gemini new chat hotkey script initialized.');
        console.log(`Hotkeys: ${hotkeys.map(h => `${h.name} (${h.description})`).join(', ')}`);
        console.log('For debugging, run: debugGeminiNewChat() in console');
        console.log('To see available hotkeys, run: showGeminiHotkeys() in console');
    }
    
    // ========================================
    // MAIN EVENT HANDLERS
    // ========================================
    
    // Main keyboard event handler
    function handleKeyDown(event) {
        const hotkey = getMatchingHotkey(event);
        
        if (hotkey) {
            console.log(`${hotkey.name} detected - attempting to create new chat`);
            
            // Prevent the default browser behavior
            event.preventDefault();
            event.stopPropagation();
            
            // Try to click the new chat button
            const success = clickNewChatButton();
            
            if (!success) {
                console.warn('Failed to find and click new chat button');
                showNotification('New chat button not found');
            } else {
                showNotification(`New chat created (${hotkey.name})`);
            }
        }
    }
    
    // DOM ready handler
    function onDOMReady() {
        console.log('DOM loaded - Gemini hotkey script ready');
    }
    
    // ========================================
    // CORE FUNCTIONALITY
    // ========================================
    
    // Find and click the new chat button
    function clickNewChatButton() {
        for (const selector of BUTTON_SELECTORS) {
            try {
                const button = document.querySelector(selector);
                if (button) {
                    console.log(`New chat button found with selector: ${selector}`);
                    button.click();
                    return true;
                }
            } catch (e) {
                // Skip invalid selectors
                continue;
            }
        }
        
        console.log('New chat button not found with any selector');
        return false;
    }
    
    // Check if event matches any configured hotkey
    function getMatchingHotkey(event) {
        const hotkeys = getAvailableHotkeys();
        
        for (const hotkey of hotkeys) {
            if (matchesHotkey(event, hotkey.keys)) {
                return hotkey;
            }
        }
        
        return null;
    }
    
    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    
    // Get available hotkeys for current platform
    function getAvailableHotkeys() {
        return isMac ? HOTKEY_CONFIG.mac : HOTKEY_CONFIG.windows;
    }
    
    // Check if event matches hotkey configuration
    function matchesHotkey(event, keys) {
        const ctrl = keys.ctrl || false;
        const shift = keys.shift || false;
        const alt = keys.alt || false;
        const key = keys.key.toLowerCase();
        
        return event.ctrlKey === ctrl &&
               event.shiftKey === shift &&
               event.altKey === alt &&
               event.key.toLowerCase() === key;
    }
    
    // Show available hotkeys (debug function)
    function showHotkeys() {
        const hotkeys = getAvailableHotkeys();
        const hotkeyStrings = hotkeys.map(h => `${h.name} (${h.description})`);
        
        console.log(`Available hotkeys for ${isMac ? 'macOS' : 'Windows'}:`, hotkeyStrings);
        return hotkeyStrings;
    }
    
    // Show notification to user
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            opacity: 0.9;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    // Debug function to help find the correct selector
    function debugFindNewChatButton() {
        console.log('=== DEBUG: Looking for new chat button ===');
        
        // Log all buttons on the page
        const allButtons = document.querySelectorAll('button');
        console.log(`Found ${allButtons.length} buttons on page`);
        
        allButtons.forEach((button, index) => {
            const text = button.textContent?.trim();
            const ariaLabel = button.getAttribute('aria-label');
            const title = button.getAttribute('title');
            const testId = button.getAttribute('data-test-id') || button.getAttribute('data-testid');
            const jsname = button.getAttribute('jsname');
            
            if (text?.toLowerCase().includes('new') || 
                text?.toLowerCase().includes('chat') ||
                ariaLabel?.toLowerCase().includes('new') ||
                ariaLabel?.toLowerCase().includes('chat') ||
                title?.toLowerCase().includes('new') ||
                title?.toLowerCase().includes('chat') ||
                testId?.toLowerCase().includes('new') ||
                testId?.toLowerCase().includes('chat') ||
                jsname?.toLowerCase().includes('new')) {
                
                console.log(`Button ${index}:`, {
                    text,
                    ariaLabel,
                    title,
                    testId,
                    jsname,
                    element: button
                });
            }
        });
        
        // Test each selector
        console.log('\n=== Testing selectors ===');
        BUTTON_SELECTORS.forEach((selector, index) => {
            try {
                const result = document.querySelector(selector);
                console.log(`Selector ${index} (${selector}):`, result);
            } catch (e) {
                console.log(`Selector ${index} (${selector}): ERROR -`, e.message);
            }
        });
        
        console.log('=== END DEBUG ===');
    }
    
    // Start the script
    init();
    
})();
