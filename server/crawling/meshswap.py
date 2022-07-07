from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.common.exceptions import NoSuchElementException
url = 'https://meshswap.fi/exchange/pool'
if __name__ == '__main__':
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get(url)
    wait = WebDriverWait(driver, 20)
    element = wait.until(EC.element_to_be_clickable(
        (By.CSS_SELECTOR, '#exchange-page > div > section > div.pool-main-body > section > article > div.pool-table__body > div:nth-child(1) > div.pool-table__col.pool-table__col--pair > div:nth-child(2) > p:nth-child(1) > strong')))

    temp = []
    result = driver.find_element(By.CSS_SELECTOR,
                                 '#exchange-page > div > section > div.pool-main-body > section > article > div.pool-table__body > div:nth-child(1) > div.pool-table__col.pool-table__col--pair > div:nth-child(2) > p:nth-child(1) > strong'.format(2)).text
    print(result)
    try:
        for i in range(1, 10):
            if(i>1):
                page = driver.find_element(By.CSS_SELECTOR,
                                           '#exchange-page > div > section > div.pool-main-body > section > section > button.common-pager-button.common-pager-button--next').click()
                time.sleep(1)
            for j in range(1, 11):
                pare = driver.find_element(By.CSS_SELECTOR,'#exchange-page > div > section > div.pool-main-body > section > article > div.pool-table__body > div:nth-child({0}) > div.pool-table__col.pool-table__col--pair > div:nth-child(2) > p:nth-child(1)'.format(j)).text
                apy= driver.find_element(By.CSS_SELECTOR,'#exchange-page > div > section > div.pool-main-body > section > article > div.pool-table__body > div:nth-child({0}) > div.pool-table__col.pool-table__col--estimated > p.pool-table__col.pool-table__col--main-rate'.format(j)).text
                tvl = driver.find_element(By.CSS_SELECTOR,'#exchange-page > div > section > div.pool-main-body > section > article > div.pool-table__body > div:nth-child({0}) > div.pool-table__col.pool-table__col--liquidity > p'.format(j)).text
                temp.append(pare)
                print('{0};{1};{2}'.format(pare, tvl, apy))
                time.sleep(0.3)

    except NoSuchElementException:
        print(len(temp))
