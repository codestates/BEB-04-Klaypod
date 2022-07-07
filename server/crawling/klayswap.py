from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup


def set_chrome_driver():
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument('headless')
    # chrome_options.add_argument("no-sandbox")
    chrome_options.add_argument("window-size=1920x1080")
    # chrome_options.add_argument("disable-gpu")
    chrome_options.add_argument("lang=ko_KR")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36")
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)


if __name__ == '__main__':
    result = []
    driver = set_chrome_driver()
    driver.get('https://klayswap.com/exchange/pool')
    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#exchange-page > div > section > '
                                                                      'div.pool-main-body > section > '
                                                                      'article > div.pool-table__body > '
                                                                      'div:nth-child(1) > div.pool-table__'
                                                                      'col.pool-table__col--pair > div:nth-child(2) > '
                                                                      'p:nth-child(2) > strong')))
    try:
        for page in range(1, 100):
            print(page)
            if (page > 1 and page < 11) :
                driver.find_element(By.XPATH,
                                    '//*[@id="exchange-page"]/div/section/div[2]/section/section/div[{0}]'
                                    .format(page)).click()
                time.sleep(0.5)
            if page > 10:
                driver.find_element(By.CSS_SELECTOR,'#exchange-page > div > section > div.pool-main-body >'
                                                    ' section > section > '
                                                    'button.common-pager-button.common-pager-button--next').click()
                time.sleep(0.5)

            for j in range(1, 11):
                column = ('#exchange-page > div > section > div.pool-main-body > section > article > '
                          'div.pool-table__body > div:nth-child({0}) > div.pool-table__col.pool-table'.format(j))
                pair = driver.find_element(By.CSS_SELECTOR, column + '__col--pair > div:nth-child(2) > '
                                                                     'p:nth-child(2) > strong').text
                tvl = driver.find_element(By.CSS_SELECTOR, column + '__col--liquidity > p > strong > span').text
                apy = driver.find_element(By.CSS_SELECTOR, column + '__col--estimated > p.pool-table__col.pool-table__'
                                                                    'col--compounded-rate').text
                apr = driver.find_element(By.CSS_SELECTOR, column + '__col--estimated > p.pool-table__col.pool-table__'
                                                                    'col--main-rate').text
                print('pair: {0}; tvl: {1}; apy: {2}; apr: {3}'.format(pair, tvl, apy, apr))

                time.sleep(0.3)
    except NoSuchElementException:
        print(page)
