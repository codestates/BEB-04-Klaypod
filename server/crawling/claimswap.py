from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time


def set_chrome_driver():
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument('headless')
    # chrome_options.add_argument("no-sandbox")
    chrome_options.add_argument("window-size=1920x1080")
    # chrome_options.add_argument("disable-gpu")
    chrome_options.add_argument("lang=ko_KR")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36")
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)


if __name__ == '__main__':
    result = []
    driver = set_chrome_driver()
    driver.get('https://app.claimswap.org/farm')
    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                                     '#root > div.page-template > div > div.farm-list-page > '
                                                     'section:nth-child(4) > div > div.farm-list > div > '
                                                     'div:nth-child(1) > div.MuiGrid-root.FarmLp_lp_box__'
                                                     'dQuNv.MuiGrid-container.MuiGrid-align-items-xs-center > '
                                                     'div.MuiGrid-root.FarmLp_lp_label_'
                                                     '_0rRSN.MuiGrid-item.MuiGrid-grid-sm-5.MuiGrid-grid-lg-3 > span')))

    last_height = driver.execute_script("return document.body.scrollHeight;")
    print(last_height)  # 창 높이

    while True:
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')

        time.sleep(2)   # 스크롤 후 창이 로딩될 때 까지 2초 기다림
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight-50);")
        # 맨 아래까지 스크롤 후 살짝 올림(맨아래까지 한번에 내리면 데이터를 가져오지 못하는 경우가 있음)
        time.sleep(2)

        new_height = driver.execute_script("return document.body.scrollHeight")
        # 스크롤 후 창의 높이를 새로운 높이로 저장

        if new_height == last_height:
            # 새로운 높이가 이전 높이와 같으면 종료 (더이상 스크롤할게 없다는 의미)
            break

        last_height = new_height

    length = driver.execute_script('return document.body.getElementsByClassName("FarmLp_lp_container__3QOgF").length')
    print(length)
    for i in range(1, length+1):
        column = '#root > div.page-template > div > div.farm-list-page > ' \
                 'section:nth-child(4) > div > div.farm-list > div > div:nth-child({0}) > ' \
                 'div.MuiGrid-root.FarmLp_lp_box__dQuNv.MuiGrid-container.MuiGrid-align-items-xs-center >'.format(i)

        pair = driver.find_element(By.CSS_SELECTOR, column+" div.MuiGrid-root.FarmLp_lp_label__"
                                                           "0rRSN.MuiGrid-item.MuiGrid-grid-sm-5."
                                                           "MuiGrid-grid-lg-3 > span").text
        tvl = driver.find_element(By.CSS_SELECTOR, column+" div:nth-child(3) > span:nth-child(2)").text
        apy = driver.find_element(By.CSS_SELECTOR, column+" div:nth-child(5) > span:nth-child(2)").text
        print('pair: {0};tvl: {1};apy: {2}'.format(pair, tvl, apy))
