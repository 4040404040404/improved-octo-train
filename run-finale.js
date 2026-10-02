/**
 * Playwright Script to Execute the `finale()` Automation Workflow on Any Website
 * + Out-of-context `#accept-btn` clicker
 * + Stops the whole script fully (closes browser & exits process) if the website is `colorful-tv-258268.puter.site`
 *
 * Setup:
 *   npm init -y
 *   npm install playwright
 *   npx playwright install chromium
 *
 * Run:
 *   node run-finale.js https://zealous-river-220556.puter.site
 */

const { chromium } = require('playwright');

// Starting URL (pass any URL via CLI argument or TARGET_URL env var)
const TARGET_URL =
  process.argv[2] ||
  process.env.TARGET_URL ||
  'https://zealous-river-220556.puter.site';

const BROWSER_SCRIPT = () => {
  // ============================================================================
  // 1. OUT OF CONTEXT OF finale():
  //    - Stop the whole script fully if website is colorful-tv-258268.puter.site
  //    - Click document.querySelector("#accept-btn") independently
  // ============================================================================
  function stopAllTimersAndExecution() {
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i <= highestId; i++) {
      window.clearTimeout(i);
      window.clearInterval(i);
    }
    window.stop();
  }

  if (
    window.location.hostname === 'colorful-tv-258268.puter.site' ||
    window.location.href.includes('colorful-tv-258268.puter.site')
  ) {
    stopAllTimersAndExecution();
    return;
  }

  // Click #accept-btn out of context (immediately + periodic check)
  if (document.querySelector('#accept-btn')) {
    document.querySelector('#accept-btn').click();
  }

  setInterval(() => {
    if (
      window.location.hostname === 'colorful-tv-258268.puter.site' ||
      window.location.href.includes('colorful-tv-258268.puter.site')
    ) {
      stopAllTimersAndExecution();
      return;
    }

    if (document.querySelector('#accept-btn')) {
      document.querySelector('#accept-btn').click();
    }
  }, 2000);

  // ============================================================================
  // 2. ORIGINAL finale() SCRIPT (UNMODIFIED LOGIC)
  // ============================================================================
  function finale() {
    // Click using coordinates with mouse simulation + console logs
    (function () {
      // Create console log display overlay
      const logContainer = document.createElement('div');
      logContainer.id = 'console-log-overlay';
      logContainer.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 450px;
        height: 350px;
        background: rgba(20, 20, 20, 0.95);
        border: 2px solid #00ff00;
        border-radius: 8px;
        padding: 12px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        color: #00ff00;
        overflow-y: auto;
        z-index: 99999;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
      `;

      const header = document.createElement('div');
      header.style.cssText = `
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 1px solid #00ff00;
        padding-bottom: 5px;
        color: #00ff00;
      `;
      header.textContent = '📡 Console Logs & Coordinate Click';
      logContainer.appendChild(header);

      const logsDiv = document.createElement('div');
      logsDiv.id = 'console-logs-content';
      logsDiv.style.cssText = `
        max-height: 300px;
        overflow-y: auto;
      `;
      logContainer.appendChild(logsDiv);

      document.body.appendChild(logContainer);

      // Intercept console methods
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      const originalInfo = console.info;

      function addLogToDisplay(message, type = 'log') {
        const logEntry = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
          log: '#00ff00',
          error: '#ff0000',
          warn: '#ffaa00',
          info: '#00aaff',
        };

        logEntry.style.cssText = `
          color: ${colors[type]};
          margin-bottom: 4px;
          word-wrap: break-word;
          white-space: pre-wrap;
          padding: 2px 0;
          border-left: 2px solid ${colors[type]};
          padding-left: 6px;
        `;
        logEntry.textContent = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
        logsDiv.appendChild(logEntry);

        // Auto-scroll to bottom
        logsDiv.scrollTop = logsDiv.scrollHeight;
      }

      // Override console methods
      console.log = function (...args) {
        originalLog.apply(console, args);
        addLogToDisplay(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' '),
          'log'
        );
      };

      console.error = function (...args) {
        originalError.apply(console, args);
        addLogToDisplay(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' '),
          'error'
        );
      };

      console.warn = function (...args) {
        originalWarn.apply(console, args);
        addLogToDisplay(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' '),
          'warn'
        );
      };

      console.info = function (...args) {
        originalInfo.apply(console, args);
        addLogToDisplay(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' '),
          'info'
        );
      };

      // Multiple selector strategies
      const selectors = [
        'button[aria-label="CONFIRM"]',
        'button.css-1nnj36',
        '[aria-label="CONFIRM"]',
      ];

      function clickByCoordinates(attempt = 1) {
        console.log(`🔄 Click attempt #${attempt} (coordinate-based)`);

        let element = null;
        let foundBy = '';

        // Try each selector
        for (let selector of selectors) {
          element = document.querySelector(selector);
          if (element) {
            foundBy = selector;
            break;
          }
        }

        if (!element) {
          console.error(`❌ Element not found with any selector`);
          return false;
        }

        console.log(`✓ Element found using: "${foundBy}"`);

        // Get element's bounding rectangle
        const rect = element.getBoundingClientRect();
        console.log(`  Position: top=${Math.round(rect.top)}, left=${Math.round(rect.left)}`);
        console.log(`  Size: width=${Math.round(rect.width)}, height=${Math.round(rect.height)}`);

        // Calculate center coordinates
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        console.log(`  🎯 Click coordinates: X=${Math.round(x)}, Y=${Math.round(y)}`);

        // Verify element is visible
        if (rect.width === 0 || rect.height === 0) {
          console.error('❌ Element has no dimensions - might be hidden');
          return false;
        }

        if (
          rect.top < 0 ||
          rect.left < 0 ||
          rect.bottom > window.innerHeight ||
          rect.right > window.innerWidth
        ) {
          console.warn('⚠️  Element may be partially off-screen');
        }

        // Simulate real mouse movements and click
        try {
          // Move to element
          element.dispatchEvent(
            new MouseEvent('mouseover', { bubbles: true, clientX: x, clientY: y })
          );
          element.dispatchEvent(
            new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY: y })
          );

          // Mouse down
          element.dispatchEvent(
            new MouseEvent('mousedown', {
              bubbles: true,
              cancelable: true,
              clientX: x,
              clientY: y,
              buttons: 1,
            })
          );

          // Click
          element.dispatchEvent(
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              clientX: x,
              clientY: y,
            })
          );

          // Mouse up
          element.dispatchEvent(
            new MouseEvent('mouseup', {
              bubbles: true,
              clientX: x,
              clientY: y,
            })
          );

          console.log('✅ Coordinate-based mouse events dispatched successfully');
        } catch (e) {
          console.error('❌ Error dispatching events: ' + e.message);
          return false;
        }

        // Verify what element is at those coordinates
        const elementAtPoint = document.elementFromPoint(x, y);
        if (elementAtPoint) {
          console.log(
            `  Verified: element at coordinates is: ${elementAtPoint.tagName}.${elementAtPoint.className}`
          );
        }

        return true;
      }

      console.log('🚀 Script started - coordinate-based click handler initialized');
      console.log('🎯 Target: button with aria-label="CONFIRM"');
      console.log('📍 Will calculate button center and simulate mouse click');

      // Try immediately
      clickByCoordinates(1);

      // Retry at 2 seconds
      setTimeout(() => {
        clickByCoordinates(2);
      }, 2000);

      // Retry at 4 seconds
      setTimeout(() => {
        clickByCoordinates(3);
      }, 4000);

      // Final check at 6 seconds
      setTimeout(() => {
        console.log('⏱️ 6 second mark reached - final attempt');
        clickByCoordinates(4);
      }, 6000);
    })();

    function next() {
      /**
       * Linkvertise Link Conversion Script
       * Converts external links to monetized Linkvertise URLs
       */

      function initLinkvertise(LINKVERTISE_ID) {
        try {
          const script = document.createElement('script');
          script.src = 'https://publisher.linkvertise.com/cdn/linkvertise.js';
          script.async = true;
          script.onerror = () => console.error('Failed to load Linkvertise script');

          script.onload = () => {
            console.log('Linkvertise loaded successfully');

            try {
              // eslint-disable-next-line no-undef
              linkvertise(LINKVERTISE_ID, { whitelist: [], blacklist: [] });
            } catch (e) {
              console.error('Linkvertise initialization failed:', e);
              return;
            }

            // Auto-convert all external <a> links
            convertExternalLinks(LINKVERTISE_ID);
          };

          document.head.appendChild(script);
        } catch (e) {
          console.error('Failed to initialize Linkvertise:', e);
        }
      }

      function convertExternalLinks(LINKVERTISE_ID) {
        try {
          const links = document.querySelectorAll('a[href]');
          const myDomain = window.location.hostname;
          let convertedCount = 0;

          links.forEach((link) => {
            try {
              const href = link.href;

              // Only convert external links
              const isExternal = href.startsWith('http') && !href.includes(myDomain);
              const notSpecial =
                !href.includes('mailto:') &&
                !href.includes('tel:') &&
                !href.startsWith('#');
              const notAlreadyConverted = !link.classList.contains('linkvertise');

              if (isExternal && notSpecial && notAlreadyConverted) {
                const encoded = btoa(encodeURI(href));
                link.href = `https://link-to.net/${LINKVERTISE_ID}/${Math.random() * 1000}/dynamic/?r=${encoded}`;
                link.target = '_self';
                link.classList.add('linkvertise');
                convertedCount++;
              }
            } catch (e) {
              console.warn('Failed to convert link:', link, e);
            }
          });

          console.log(`Converted ${convertedCount} external links`);
        } catch (e) {
          console.error('Link conversion failed:', e);
        }
      }

      // Map domains to their Linkvertise IDs
      const DOMAIN_CONFIG = {
        'zealous-river-220556.puter.site': '9578664',
        'witty-snake-472744.puter.site': '9578688',
        'kind-street-188208.puter.site': '9578706',
        'honest-bee-81788.puter.site': '9578728',
        'victorious-square-662213.puter.site': '9578742',
        'relaxed-crab-648834.puter.site': '9578760',
        'smart-mountain-937000.puter.site': '9578779',
        'avid-mountain-909877.puter.site': '9578787',
        'jolly-road-702644.puter.site': '9578798',
        'colorful-tv-258268.puter.site': '9578806',
      };

      // Get the appropriate Linkvertise ID for this domain
      function getLinkvertiseId() {
        const hostname = window.location.hostname;
        return DOMAIN_CONFIG[hostname] || null;
      }

      // Run when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          const linkvertiseId = getLinkvertiseId();
          if (linkvertiseId) {
            initLinkvertise(linkvertiseId);
          }
        });
      } else {
        const linkvertiseId = getLinkvertiseId();
        if (linkvertiseId) {
          initLinkvertise(linkvertiseId);
        }
      }
    }

    function link() {
      if (document.querySelector('body > a')) {
        document.querySelector('body > a').click();
      }
    }

    setTimeout(() => {
      next();
    }, 2000);

    setTimeout(() => {
      link();
    }, 4000);

    /////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////

    setTimeout(() => {
      if (
        document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-link-detail-page > lv-main-content-layout > div > div.content > div > lv-link-content > div > div:nth-child(2) > lv-fullsize-result-component > lv-lib-card > div > div > div > div.lv-card__footer > div.--button-container > div.button-desktop > a > lv-lib-button > button'
        )
      ) {
        document
          .querySelector(
            'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-link-detail-page > lv-main-content-layout > div > div.content > div > lv-link-content > div > div:nth-child(2) > lv-fullsize-result-component > lv-lib-card > div > div > div > div.lv-card__footer > div.--button-container > div.button-desktop > a > lv-lib-button > button'
          )
          .click();
      }
    }, 20000);

    setTimeout(() => {
      if (
        document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-wait > lv-membership-selection-card > lv-lib-card > div > div > div > div.membership-plan-selection__plans > lv-membership-plan-option:nth-child(5) > div > div'
        )
      ) {
        document
          .querySelector(
            'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-wait > lv-membership-selection-card > lv-lib-card > div > div > div > div.membership-plan-selection__plans > lv-membership-plan-option:nth-child(5) > div > div'
          )
          .click();
      }
    }, 30000);

    setTimeout(() => {
      if (
        document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-wait > lv-membership-selection-card > lv-lib-card > div > div > div > div.membership-plan-selection__button.membership-plan-selection__button--access.ng-star-inserted > lv-lib-button > button'
        )
      ) {
        document
          .querySelector(
            'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-wait > lv-membership-selection-card > lv-lib-card > div > div > div > div.membership-plan-selection__button.membership-plan-selection__button--access.ng-star-inserted > lv-lib-button > button'
          )
          .click();
      }
    }, 40000);

    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////

    function skip() {
      if (
        document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-ad-experiment > lv-task-ad-stepper-line > lv-ad-step-nonskip > lv-fullsize-result-component > lv-lib-card > div > div > div > div.lv-card__body > lv-lib-carousel > div > div.skip-button.ng-star-inserted > lv-lib-chip > div'
        )
      )
        document
          .querySelector(
            'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-ad-experiment > lv-task-ad-stepper-line > lv-ad-step-nonskip > lv-fullsize-result-component > lv-lib-card > div > div > div > div.lv-card__body > lv-lib-carousel > div > div.skip-button.ng-star-inserted > lv-lib-chip > div'
          )
          .click();
    }
    //learn
    setTimeout(() => {
      skip();
    }, 70000);

    setTimeout(() => {
      skip();
    }, 100000);

    setTimeout(() => {
      skip();
    }, 130000);

    setTimeout(() => {
      (function () {
        // Patch 1: intercept window.open
        const originalOpen = window.open;
        window.open = function (url, target, features) {
          if (url) {
            window.location.href = url;
            return null;
          }
          return originalOpen.apply(window, arguments);
        };

        // Patch 2: intercept anchor clicks that target a new tab
        const originalAnchorClick = HTMLAnchorElement.prototype.click;
        HTMLAnchorElement.prototype.click = function () {
          if (this.target === '_blank' && this.href) {
            window.location.href = this.href;
            return;
          }
          return originalAnchorClick.call(this);
        };

        // Now find and click the actual button
        const btn = document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-success-page > lv-main-content-layout > div > div.content > div > lv-success-variant-a > div > lv-lib-card:nth-child(2) > div > div > div > div > lv-lib-button > button'
        );

        if (!btn) {
          console.log('Button not found — check the selector.');
          return;
        }

        btn.click();

        // Restore originals shortly after
        setTimeout(() => {
          window.open = originalOpen;
          HTMLAnchorElement.prototype.click = originalAnchorClick;
        }, 1500);
      })();
    }, 150000);
  }

  setTimeout(() => {
    finale();
    setInterval(() => {
      finale();
    }, 200000);
  }, 20000);
};

// Helper to attach Playwright listeners to every tab/page in the browser context
function attachPageHandlers(targetPage, browser) {
  const checkUrlAndAccept = async () => {
    if (targetPage.isClosed()) return;

    const currentUrl = targetPage.url();

    // 1. Out of context: If the website is colorful-tv-258268.puter.site -> STOP THE WHOLE SCRIPT FULLY
    if (currentUrl.includes('colorful-tv-258268.puter.site')) {
      console.log(
        `[Playwright] Reached colorful-tv-258268.puter.site (${currentUrl}) -> Stopping the whole script fully!`
      );
      await browser.close().catch(() => {});
      process.exit(0);
    }

    // 2. Out of context: Click document.querySelector("#accept-btn") if it exists
    await targetPage
      .evaluate(() => {
        if (document.querySelector('#accept-btn')) {
          document.querySelector('#accept-btn').click();
        }
      })
      .catch(() => {});
  };

  targetPage.on('framenavigated', async (frame) => {
    if (frame === targetPage.mainFrame()) {
      await checkUrlAndAccept();
    }
  });

  targetPage.on('domcontentloaded', checkUrlAndAccept);
  targetPage.on('load', checkUrlAndAccept);

  targetPage.on('console', (msg) => {
    console.log(`[Browser ${msg.type().toUpperCase()}] ${msg.text()}`);
  });
}

(async () => {
  try {
    const browser = await chromium.launch({
      headless: false,
      args: ['--disable-Popup-Blocking', '--no-sandbox', '--disable-setuid-sandbox'],
    });

    browser.on('disconnected', () => {
      console.log('[Playwright] Browser disconnected. Exiting script.');
      process.exit(0);
    });

    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
    });

    // Inject the script into every page/website loaded in this browser context
    await context.addInitScript(BROWSER_SCRIPT);

    // Ensure any newly opened tab also gets the handlers
    context.on('page', (newPage) => {
      attachPageHandlers(newPage, browser);
    });

    const page = await context.newPage();
    attachPageHandlers(page, browser);

    console.log(`[Playwright] Navigating to: ${TARGET_URL}`);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (err) {
    console.error('[Playwright] Fatal error:', err);
    process.exit(1);
  }
})();
