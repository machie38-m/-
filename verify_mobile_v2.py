import asyncio
from playwright.async_api import async_playwright
import os

async def verify_mobile_v2():
    async with async_playwright() as p:
        # Use mobile device emulation
        iphone = p.devices['iPhone 13']
        browser = await p.launch()
        context = await browser.new_context(**iphone)
        page = await context.new_page()

        # Start dev server if not running (handled by assistant usually)
        # Assuming server is at http://localhost:3000
        try:
            await page.goto('http://localhost:3000', wait_until='networkidle')

            # Create verification folder
            os.makedirs('verification', exist_ok=True)

            # Screenshot Home Mobile with BottomNav
            await page.screenshot(path='verification/home_mobile_v2.png')
            print("Captured home_mobile_v2.png")

            # Go to Search page
            await page.click('text=Cari') # Should click the search link in BottomNav
            await page.wait_for_timeout(2000)
            await page.screenshot(path='verification/search_mobile_v2.png')
            print("Captured search_mobile_v2.png")

        except Exception as e:
            print(f"Error: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_mobile_v2())
