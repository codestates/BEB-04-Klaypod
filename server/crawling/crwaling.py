from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
import time
import pprint
import datetime
from pytz import timezone
from bson.objectid import ObjectId
from pymongo import MongoClient

id = "fdongfdong"
password = "0410"
KST = timezone('Asia/Seoul')
today = datetime.datetime.now()


def apyToApr(APY):
    return (((1+APY/100)**(1/365)-1)*365)*100

def aprToFloat(str):
    if 'K' in str:
        str = str.split('K')
        return float(str[0])*1000
    else:
        return float(str)

def stringToInteger(str):
    temp = str.split(',')
    return int(''.join(temp))


def get_defi_total_tvl(swap):
    kokonutswap_uri = "https://kokonutswap.finance/"
    claimswap_uri = "https://app.claimswap.org/farm"
    klayswap_url = "https://klayswap.com/dashboard"
    driver = set_chrome_driver()

    if swap == "kokonutswap":
        driver.get(kokonutswap_uri)
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#root > div.sc-ddnlvQ.juaBBL > '
                                                                'div.sc-bBHxTw.eeUxaJ > div.sc-giYglK.iLdmPu > '
                                                                'div:nth-child(2) > div.sc-kLwhqv.iPKQFl')))

        total_tvl = driver.find_element(By.CSS_SELECTOR, '#root > div.sc-ddnlvQ.juaBBL > '
                                            'div.sc-bBHxTw.eeUxaJ > div.sc-giYglK.iLdmPu > '
                                            'div:nth-child(2) > div.sc-kLwhqv.iPKQFl').text
        result = total_tvl.replace('$', "")
        result = stringToInteger(result)
        return result
    elif swap == 'klayswap':
        driver.get(klayswap_url)
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#app > main > section > article > '
                                                                'div.dashboard-page__summary__service > '
                                                                'section:nth-child(1) > '
                                                                'div.dashboard-page__summary__service__card__label')))
        total_tvl = driver.execute_script("return document.getElementsByClassName('dashboard-page_"
                                          "_summary__service__card__label')[0].lastChild.textContent")
        result = total_tvl.replace(' $ ', '')
        result = stringToInteger(result)
        return result

    elif swap == 'claimswap':
        driver.get(claimswap_uri)
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#root > div.page-template >'
                                                                ' div > div.farm-list-page > '
                                                                'section:nth-child(1) > div > div > span')))

        total_tvl = driver.find_element(By.CSS_SELECTOR,'#root > div.page-template > div > '
                                            'div.farm-list-page > section:nth-child(1) '
                                            '> div > div > span').text
        result = total_tvl.replace('$ ', '')
        result = stringToInteger(result)
        return result

    else:
        return None


def run_klaySwap_crawl():
    try:
        klayswap_id = klaypod_collection.projects.find_one({"name": "klayswap"}, {"_id": 1})
        project_id = ObjectId(klayswap_id['_id'])
        data_set = []
        driver = set_chrome_driver()
        driver.get('https://klayswap.com/exchange/pool')
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#exchange-page > div > section > '
                                                                'div.pool-main-body > section > '
                                                                'article > div.pool-table__body > '
                                                                'div:nth-child(1) > div.pool-table__'
                                                                'col.pool-table__col--pair > div:nth-child(2) > '
                                                                'p:nth-child(2) > strong')))
        time.sleep(0.5)

        for page in range(1, 100):
            if (page > 1 and page < 11):
                driver.find_element(By.XPATH,
                                    '//*[@id="exchange-page"]/div/section/div[2]/section/section/div[{0}]'
                                    .format(page)).click()
                time.sleep(0.3)
            if page > 10:
                driver.find_element(By.CSS_SELECTOR, '#exchange-page > div > section > div.pool-main-body >'
                                                     ' section > section > '
                                                     'button.common-pager-button.common-pager-button--next').click()


                time.sleep(0.3)
            for line in range(1, 11):
                column = ('#exchange-page > div > section > div.pool-main-body > section > article > '
                          'div.pool-table__body > div:nth-child({0}) > div.pool-table__col.pool-table'.format(line))
                length = driver.execute_script(
                    'return document.getElementsByClassName("pool-table__col pool-table__col--pair")[{0}].getElementsByTagName("img").length'.format(
                        line))
                logo = []
                for i in range(1, length + 1):
                    logo.append(driver.find_element(By.CSS_SELECTOR,
                                                    column + "__col--pair > div:nth-child(1) > div:nth-child({0}) > img".format(
                                                        i)).get_attribute("src"))

                pair = driver.find_element(By.CSS_SELECTOR, column + '__col--pair > div:nth-child(2) > '
                                                                     'p:nth-child(2) > strong').text
                tvl = driver.find_element(By.CSS_SELECTOR, column + '__col--liquidity > p > strong > span').text
                apr = driver.find_element(By.CSS_SELECTOR, column + '__col--estimated > p.pool-table__col.pool-table__'
                                                                    'col--main-rate').text.replace("  %", "")
                print('pair: {0}; tvl: {1}; apr: {2}'.format(pair, tvl, apr))

                data_set.append({
                    "pair": pair,
                    "tvl": stringToInteger(tvl),
                    "apr": aprToFloat(apr),
                    "logo": logo,
                    "project_id": 1,
                    "isActive": True,
                    "createAt": str(today.astimezone(KST)),
                    "project_id": project_id
                })

                time.sleep(0.1)
            try:
                driver.find_element(By.CSS_SELECTOR,
                                    '#exchange-page > div > section > div.pool-main-body >'
                                    ' section > section > button.common-pager-button.common-pager-button--last')
            except NoSuchElementException:
                break

    except NoSuchElementException:
        print('NoSuchElementException')
        print(len(data_set))
    finally:
        print('klayswap pair insert {0}'.format(len(data_set)))
        return data_set
    driver.quit()


def run_claimswap_crawl():
    data_set = []
    try:
        claimswap_id = klaypod_collection.projects.find_one({"name":"claimswap"},{"_id":1})
        project_id = ObjectId(claimswap_id['_id'])
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
        while True:
            driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')

            time.sleep(2)  # 스크롤 후 창이 로딩될 때 까지 2초 기다림
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight-50);")
            # 맨 아래까지 스크롤 후 살짝 올림(맨아래까지 한번에 내리면 데이터를 가져오지 못하는 경우가 있음)
            time.sleep(1)

            new_height = driver.execute_script("return document.body.scrollHeight")
            # 스크롤 후 창의 높이를 새로운 높이로 저장

            if new_height == last_height:
                # 새로운 높이가 이전 높이와 같으면 종료 (더이상 스크롤할게 없다는 의미)
                break

            last_height = new_height
        length = driver.execute_script('return document.body.getElementsByClassName("FarmLp_lp_container__3QOgF").length')
        for i in range(1, length + 1):
            logo = []
            column = '#root > div.page-template > div > div.farm-list-page > ' \
                     'section:nth-child(4) > div > div.farm-list > div > div:nth-child({0}) > ' \
                     'div.MuiGrid-root.FarmLp_lp_box__dQuNv.MuiGrid-container.MuiGrid-align-items-xs-center >'.format(i)
            for j in range(0, 2):
                logo.append(driver.execute_script(
                    "return document.getElementsByClassName('MuiGrid-root FarmLp_lp_box__dQuNv MuiGrid-container MuiGrid-align-items-xs-center')[{0}].childNodes[0].childNodes[0].children[{1}].children[0].getAttribute('src')".format(
                        i - 1, j)))
            pair = driver.find_element(By.CSS_SELECTOR, column + " div.MuiGrid-root.FarmLp_lp_label__"
                                                                 "0rRSN.MuiGrid-item.MuiGrid-grid-sm-5."
                                                                 "MuiGrid-grid-lg-3 > span").text
            tvl = driver.find_element(By.CSS_SELECTOR, column + " div:nth-child(3) > span:nth-child(2)").text
            apy = driver.find_element(By.CSS_SELECTOR, column + " div:nth-child(5) > span:nth-child(2)").text
            data_set.append({
                "pair": pair,
                "tvl": stringToInteger(tvl.replace("$ ", "")),
                "apr": round(apyToApr(float(apy.replace(" %", ""))), 1),
                "logo": logo,
                "isActive": True,
                "createAt": str(today.astimezone(KST)),
                "project_id": project_id

            })
    except NoSuchElementException as e:
        print(e.msg)
    finally:
        driver.quit()
        return data_set

def run_kokonutswap_crawl():
    data_set = []
    kokonutswap_id = klaypod_collection.projects.find_one({"name": "kokonutswap"}, {"_id": 1})
    project_id = ObjectId(kokonutswap_id['_id'])
    driver = set_chrome_driver()
    driver.get('https://kokonutswap.finance/pools')
    wait = WebDriverWait(driver, 10)
    wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                           '#root > div.sc-ddnlvQ.juaBBL > div.sc-jWUzzU.dnVhSJ > div.sc-dUbtfd.lAFdh > div.pc > div > div:nth-child(2) > div:nth-child(1) > div.sc-dkYRCH.eCPwII > a > button')))
    list_length = driver.execute_script('return document.getElementsByClassName("sc-dkYRCH iaECIk").length')
    time.sleep(0.4)
    try:
        for i in range(2, list_length + 2):
            column = '#root > div.sc-ddnlvQ.juaBBL > div.sc-jWUzzU.dnVhSJ > div.sc-dUbtfd.lAFdh >' \
                     ' div.pc > div > div:nth-child({0}) > div:nth-child(1) > '.format(i)
            length = driver.execute_script(
                'return document.getElementsByClassName("sc-dkYRCH iaECIk")[{0}].getElementsByTagName("img").length'.format(
                    i - 2))
            logo = []
            for j in range(0, length):
                img_src = driver.execute_script(
                    'return document.getElementsByClassName("sc-dkYRCH iaECIk")[2].getElementsByTagName("img")[{0}].getAttribute(\'src\')'.format(
                        j))
                logo.append('https:/kokonutswap.finance' + img_src)
            pair = driver.find_element(By.CSS_SELECTOR, column + 'div.sc-dkYRCH.eCPzQu > div.sc-ilfuhL.fVkpWP').text
            tvl = driver.find_element(By.CSS_SELECTOR, column + 'div.sc-dkYRCH.eCPvQm').text
            apr = driver.find_element(By.CSS_SELECTOR, column + 'div.sc-dkYRCH.iaECFY > div').text
            print('pair: {0};tvl: {1};apr: {2}'.format(pair, tvl, apr))

            data_set.append({
                "pair": pair,
                "tvl": stringToInteger(tvl.replace("$", "")),
                "apr": float(apr.replace("%", "")),
                "logo": logo,
                "isActive": True,
                "createAt": str(today.astimezone(KST)),
                "project_id": project_id
            })
    except NoSuchElementException as e:
        print(e.msg)
    finally:
        driver.quit()
        return data_set


def set_chrome_driver():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('headless')
    chrome_options.add_argument("no-sandbox")
    chrome_options.add_argument("window-size=1920x1080")
    chrome_options.add_argument("disable-gpu")
    chrome_options.add_argument("lang=ko_KR")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36")
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)


def get_database():
    CONNECTION_STRING = "mongodb+srv://{0}:{1}@klaypod.owsxw.mongodb.net/?retryWrites=true&w=majority".format(id, password)
    client = MongoClient(CONNECTION_STRING)
    return client


def create_project_collection():
    klaypod_collection.projects.insert_many(
        [
            {"name": "klayswap", "logo": "https://klayswap.com/img/logo/logo.svg",
             "url": "https://klayswap.com/exchange/pool", "isActive": True, "createAt": str(today.astimezone(KST)), "tvl": get_defi_total_tvl('klayswap')},
            {"name": "kokonutswap", "logo": "https://cdn-images-1.medium.com/max/280/1*1Ah4r6CMB8p1UXp_AMmdBQ@2x.jpeg",
             "url": "https://kokonutswap.finance/pools", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_defi_total_tvl('kokonutswap')},
            {"name": "claimswap", "logo": "https://mobile.twitter.com/claimswap/photo",
             "url": "https://app.claimswap.org/farm", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_defi_total_tvl('claimswap')}
        ]
    )


def insert_data_set(data_set):
    print(len(data_set))
    for data in data_set:
        klaypod_collection.pairs.insert_one(data)


if __name__ == '__main__':

    try:
        connect_db = get_database()
        klaypod_collection = connect_db.klaypod
    except Exception:
        print("Unable to connect to the server.")

    try:
        klaypod_collection.pairs.drop()
    except:
        print("자료가 없습니다.")

    try:
        klaypod_collection.projects.drop()

    except:
        print("자료가 없습니다.")
    create_project_collection()
    insert_data_set(run_klaySwap_crawl())
    insert_data_set(run_kokonutswap_crawl())
    insert_data_set(run_claimswap_crawl())

